import { Box, Button, Flex } from "@chakra-ui/react";

import React, { MutableRefObject, ReactInstance, useEffect, useRef, useState } from "react";
import { exportComponentAsPNG } from "react-component-export-image";
import Word from "./Word";
import { IWord, WordTableProps } from "./WordTable";

export interface WordsDisplayProps{
    words:IWord[]
}
interface WordsDisplayToolsProps{
    mref:React.MutableRefObject<any>
}
function randomInt(min:number, max:number) {
    return Math.random() * (max - min) + min;
  }
export default function WordsDisplay(props:WordsDisplayProps){
    const [words,setWords] = useState<IWord[]>([])
    const ref = useRef(null)
    useEffect(()=>{setWords(props.words)},[props.words])
    return (<Box padding={1}>
        <WordDisplayTools mref={ref}></WordDisplayTools>
       
        <Box border="1px" position="relative" borderColor="blackAlpha.500" ref={ref} backgroundColor="white" h="full" w="full" borderRadius="md">
            {words.map((w)=>{
                let rX = randomInt(0,100);
                let rY = randomInt(0,100);
                return <Word word={w} position={{x:rX,y:rY}} size={10}></Word>
            })}
        </Box>
    </Box>)
}

export function WordDisplayTools(props:WordsDisplayToolsProps){
    return (<Flex position="absolute" border="1px" bottom={0} borderRadius="md" padding={3}>
         <Button onClick={()=>{
            if(props.mref){
                exportComponentAsPNG(props.mref)
            }
            
            }}>Exportar</Button>
    </Flex>)
}