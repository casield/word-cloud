import { Box, Button, Flex } from "@chakra-ui/react";

import React, { LegacyRef, MutableRefObject, ReactInstance, useEffect, useRef, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import Word from "./Word";
import { IWord, WordTableProps } from "./WordTable";
import WordCloud from "wordcloud";
import { reduce } from "lodash";
import { Resizable } from "re-resizable";
import { AppProps } from "../App";



export default function WordsDisplay(props: AppProps) {
    const [words, setWords] = useState<IWord[]>([])
    const ref = useRef<HTMLDivElement>(null)
    let containerSize = "65vh"
    useEffect(()=>{
        props.componentRef.setComponentRef(ref);
    },[ref])
    useEffect(() => {
        let sorted = props.words.words
        setWords(sorted)
        Word(sorted);
    }, [props.words.words, props.colors.colors,props.font.font,props.fontSize.fontSize,props.shape.shape])
    const Word = (words: IWord[]) => {
        if (ref.current != null) {
            let biggest = 0;
            let sorted = [...words].sort((a, b) => {
                if (a.times < b.times) {
                    return 1;
                }
                if (a.times > b.times) {
                    return -1
                }
                return 0;
            })
            let arr = sorted.map((w) => {
                if (w.times > biggest) {
                    biggest = w.times;
                }
                return [w.text, w.times]
            })
            let width = ref.current.offsetWidth;
            let maxSize = props.fontSize.fontSize;
            WordCloud(ref.current,
                {
                    list: arr,
                    gridSize: Math.round(16 * width / 1024),

                    weightFactor: function (size) {
                        let porcentage = (size / biggest)
                        let porcOfMaxSize = maxSize * porcentage;



                        return porcOfMaxSize;
                    },
                    color: (word, weight, fontSize, distance, theta) => {
                        let index = words.findIndex(e => e.text == word);
                        return props.colors.colors[index]
                    },
                    shape:props.shape.shape,
                    shuffle:true,
                    fontFamily:props.font.font,

                    rotateRatio: 0,

                })
            console.log("Word Cloud", ref.current.offsetWidth)
        }
    }
    return (<Flex alignItems="center" justifyContent="center" maxH={containerSize} padding={1}>
        <Resizable maxHeight={"100%"} maxWidth={"100%"} onResizeStop={() => { Word(props.words.words) }}
            defaultSize={{
                width: 500,
                height: 400,
            }}
        >

            <Box border="1px" position="relative" overflow="hidden" borderColor="blackAlpha.500"
              backgroundColor="white" h="full" w="full" borderRadius="md">
                 <Box h="full" w="full" background="transparent" ref={ref}></Box>
             </Box>

        </Resizable>
    </Flex>)
}