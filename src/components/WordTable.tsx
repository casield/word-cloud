import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, Editable, EditableInput, EditablePreview, Flex, Grid, HStack, Input, Popover, PopoverContent, PopoverTrigger, useDisclosure, useEditableControls, useOutsideClick, VStack, Wrap } from "@chakra-ui/react";
import { useEffect, useRef,  useState } from "react";
import UIPanel from "./UIPanel";
import {CgAddR} from "react-icons/cg"
import {AiOutlineDelete, AiOutlineMenu} from "react-icons/ai"

export interface WordTableProps {
    words?: IWord[];
    onChange: (words: IWord[]) => void
}
export interface TWordProps {
    word: IWord;
    onChange?: (word: IWord) => void,
    onDelete?: () => void
}
export interface IWord {
    text: string,
    times: number;
}
function randomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

export default function WordTable(props: WordTableProps) {
    const [words, setWords] = useState<IWord[]>([])

    useEffect(() => {
        props.onChange(words);
    }, [words])


    return (<UIPanel overflow="hidden" flexDirection="column" maxH="30vh">
        <MenuWordTable words={{ words, setWords }}></MenuWordTable>

        <Wrap padding={1} marginTop={2} w="full" flexDirection="row" flexWrap="wrap" overflow="auto">
            {words.map((w, index) => <TWord key={index} word={w} onChange={(newW) => {
                let mwords = [...words]
                mwords[index] = newW;
                setWords(mwords);
            }}
                onDelete={() => {
                    let mwords = [...words]
                    mwords.splice(index, 1);
                    setWords(mwords);
                }}
            ></TWord>)}
        </Wrap>



    </UIPanel>)
}
interface MenuWordTable {
    words: { words: IWord[], setWords: React.Dispatch<React.SetStateAction<IWord[]>> }
}
function MenuWordTable(props: MenuWordTable) {
    let max = 10000;
    let min = 1;
    return <HStack backgroundColor="blackAlpha.200" borderRadius="md" padding={2}>
        <Box padding={2}><AiOutlineMenu ></AiOutlineMenu></Box>
        <Button margin={1} colorScheme="green" leftIcon={ <CgAddR></CgAddR>} onClick={() => { props.words.setWords([...props.words.words, { text: "Palabra " + (props.words.words.length + 1), times: randomInt(min, max) }]) }}>
          {"Agregar palabra"}
        </Button>
       <MenuDeleteAll {...props}></MenuDeleteAll>
    </HStack>
}
function MenuDeleteAll(props:MenuWordTable){
    const cancelRef = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (<><Button margin={1} colorScheme="red" leftIcon={ <AiOutlineDelete></AiOutlineDelete>} onClick={() => { onOpen()}}>
    {"Eliminar todas las palabras"}
  </Button>
  <AlertDialog leastDestructiveRef={cancelRef}
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>¿Realmente deseas eliminar todas las palabras?</AlertDialogHeader>
          <AlertDialogCloseButton />
        
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" onClick={()=>{props.words.setWords([]); onClose()}} ml={3}>
              Si
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  </>)
}
export function TWord(props: TWordProps) {
    const [text, setText] = useState(props.word.text);
    const [times, setTimes] = useState(props.word.times);
    

    useEffect(() => {
        setTimes(props.word.times)
        setText(props.word.text)
    }, [props.word])


    return (
        <Grid backgroundColor="green.50" maxW={"300px"} onContextMenu={(e) => {
            e.preventDefault()
            if (props.onDelete) {
                props.onDelete();
            }
        }} borderRadius="md" border="1px solid" borderColor="blackAlpha.500" padding={1} gridTemplateColumns="1fr .5fr" marginY={1}>
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