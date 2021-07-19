import { Box } from "@chakra-ui/react";
import { IWord } from "./WordTable";

export interface WordProps{
    word:IWord;
    position:{x:number,y:number};
    size:number;
}
export default function Word(props:WordProps){
    return <Box position="absolute" left={props.position.x+"%"} top={props.position.y+"%"}>{props.word.text}</Box>
}