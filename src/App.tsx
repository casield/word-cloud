import logo from './logo.svg';
import './App.css';
import { Box, Container, Flex, Grid } from '@chakra-ui/react';
import WordTable, { IWord } from './components/WordTable';
import WordsDisplay from './components/WordsDisplay';
import React, { useState } from 'react';
import RightConfiguration from './components/RightConfiguration';
export interface AppProps {
  words: { words: IWord[], setWords: React.Dispatch<React.SetStateAction<IWord[]>> }
  colors:{colors:string[],setColors:React.Dispatch<React.SetStateAction<string[]>>}
  font:{font:string,setFont:React.Dispatch<React.SetStateAction<string>>}
 
  fontSize:{fontSize:number,setFontSize:React.Dispatch<React.SetStateAction<number>>}
  shape:{shape:string,setShape:React.Dispatch<React.SetStateAction<string>>}
  componentRef:{componentRef:React.RefObject<HTMLElement>,setComponentRef:React.Dispatch<React.SetStateAction<React.RefObject<HTMLElement>|undefined>>}
}
function App() {
  const [words, setWords] = useState<IWord[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [font,setFont] = useState<string>("Calibri");
  const [shape,setShape] = useState<string>("circle");
  const [fontSize,setFontSize] = useState<number>(50);
  const [componentRef,setComponentRef] = useState<React.RefObject<HTMLElement >|undefined>()
  
  let props: AppProps = { words: { words, setWords },
  colors:{colors,setColors},
  font:{font,setFont},
  fontSize:{fontSize,setFontSize},
  shape:{shape,setShape} ,
  componentRef:{componentRef:componentRef as React.RefObject<HTMLElement>,setComponentRef}
}
  return (
    <Grid templateColumns="1fr .2fr" minH="100vh"  backgroundColor={"gray.100"} maxW="100vw" maxH="100vh">
      <Left {...props}></Left>
      <RightConfiguration {...props}></RightConfiguration>
    </Grid>
  );
}
function Left(props: AppProps) {
  return <Grid w="full" h="full" maxH="100vh" gridTemplateRows="2fr 1fr">
    <WordsDisplay {...props}></WordsDisplay>
    <WordTable onChange={(w) => { props.words.setWords(w) }}></WordTable>
  </Grid>
}

export default App;
