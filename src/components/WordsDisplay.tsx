import { Box, Button, Flex } from "@chakra-ui/react";

import React, { LegacyRef, MutableRefObject, ReactInstance, useEffect, useRef, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import Word from "./Word";
import { IWord, WordTableProps } from "./WordTable";
import WordCloud from "wordcloud";
import { reduce } from "lodash";

export interface WordsDisplayProps {
    words: IWord[]
}
interface WordsDisplayToolsProps {
}
export default function WordsDisplay(props: WordsDisplayProps) {
    const [words, setWords] = useState<IWord[]>([])
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
         setWords(props.words) }, [props.words])
    if (ref.current != null) {
        let biggest = 0;
        let arr = words.map((w) => {
            if(w.times>biggest){
                biggest=w.times;
            }
            return [w.text, w.times]
        })
        let width = ref.current.offsetWidth;
        let maxSize = width/20;

        console.log("...........",maxSize)
        
        let wordC = WordCloud(ref.current,
            {
                list: arr,
                gridSize: Math.round(16 * width/ 1024),
                
                weightFactor:function (size){
                    let porcentage = (size/biggest)
                    let porcOfMaxSize = maxSize*porcentage;
        
                    console.log("Size: "+size,porcOfMaxSize)
                    
                    return porcOfMaxSize;
                },
                shape:"star",
                rotateRatio:.2
                

            })
        console.log("Word Cloud", ref.current.offsetWidth)
    }
    return (<Box padding={1}>
        <WordDisplayTools></WordDisplayTools>

        <Box border="1px" position="relative" borderColor="blackAlpha.500" ref={ref} backgroundColor="white" h="full" w="full" borderRadius="md">

        </Box>
    </Box>)
}

export function WordDisplayTools(props: WordsDisplayToolsProps) {


    return (<Flex position="absolute" border="1px" bottom={0} borderRadius="md" padding={3}>
        <Button onClick={() => {


        }}>Exportar</Button>
    </Flex>)
}