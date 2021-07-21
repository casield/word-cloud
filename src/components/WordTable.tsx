import { Box, Button, Center, Editable, EditableInput, EditablePreview, Flex, Grid, HStack, Input, Popover, PopoverContent, PopoverTrigger, useEditableControls, useOutsideClick, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export interface WordTableProps {
    words?: IWord[];
    onChange: (words: IWord[]) => void
}
export interface TWordProps {
    word: IWord;
    onChange?: (word: IWord) => void,
    onDelete?:()=>void
}
export interface IWord {
    text: string,
    times: number;
}
function randomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

export default function WordTable(props: WordTableProps) {
    let max= 1000;
    let min =1;
    const [words, setWords] = useState<IWord[]>([])

    useEffect(() => {
        props.onChange(words);
    }, [words])

    return (<Center padding={2}>
        <VStack w={"full"} padding={2} borderRadius="md" backgroundColor="white" boxShadow="md">
            <Box fontWeight="bold">Palabras agregadas</Box>
            <Flex w="full" flexDirection="row" flexWrap="wrap" maxH="30vh" overflow="auto" alignContent="center" alignItems="center" justifyContent="center">
                {words.map((w, index) => <TWord word={w} onChange={(newW) => {
                    let mwords = [...words]
                    mwords[index] = newW;
                    setWords(mwords);
                }}
                onDelete={()=>{
                    let mwords = [...words]
                    mwords.splice(index,1);
                    setWords(mwords);
                }}
                ></TWord>)}
            </Flex>
            <HStack><Button colorScheme="blue" onClick={() => { setWords([...words, { text: "Palabra " + (words.length + 1), times: randomInt(min,max) }]) }}>Agregar palabra</Button></HStack>
        </VStack>
    </Center>)
}
export function TWord(props: TWordProps) {
    const [text, setText] = useState(props.word.text);
    const [times, setTimes] = useState(props.word.times);

    useEffect(()=>{
        setTimes(props.word.times)
        setText(props.word.text)
    },[props.word])


    return (
            <Grid backgroundColor="yellow.50" maxW={"300px"} onContextMenu={(e) => {
                e.preventDefault()
                if(props.onDelete){
                    props.onDelete();
                }
            }} borderRadius="md" border="1px solid" borderColor="blackAlpha.200" padding={1} gridTemplateColumns="1fr .5fr" marginY={1}>
                <Input value={text} backgroundColor="white" onChange={(v) => {
                    if (props.onChange) {
                        setText(v.target.value);
                        props.onChange({ text: v.target.value, times })
                    }
                }}>

                </Input>
                <Box paddingLeft={1}>
                    <Input textAlign="center" backgroundColor="white" fontWeight="semibold" value={times} onChange={(v) => {
                        let num = Number.parseInt(v.target.value)
                        if (!isNaN(num)) {
                            setTimes(num);
                            if (props.onChange) {
                                props.onChange({ text: text, times: num })
                            }

                        } else {
                            setTimes(0)
                        }



                    }}>
                    </Input>
                </Box>
            </Grid>
      )
}