import logo from './logo.svg';
import './App.css';
import { Box, Container, Flex, Grid } from '@chakra-ui/react';
import WordTable, { IWord } from './components/WordTable';
import WordsDisplay from './components/WordsDisplay';
import { useState } from 'react';

function App() {
  const [words,setWords] = useState<IWord[]>([])
  return (
    <Grid backgroundColor={"gray.100"} w="100vw" h="100vh" gridTemplateRows="2fr 1fr">
      <WordsDisplay words={words}></WordsDisplay>
      <WordTable onChange={(w) => {setWords(w) }}></WordTable>
    </Grid>
  );
}

export default App;
