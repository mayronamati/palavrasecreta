//CSS
import './App.css'

//REACT
import {useCallback, useEffect, useState} from 'react'

//DATA
import {wordslist} from './data/words'

//COMPONENTS
import StartScreen from './components/StartScreen'
import GameOver from './components/GameOver'
import Game from './components/Game'

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

const guessedQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordslist)

  const [pickedWord, setPickedWorkd] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetter, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessedQty)
  const [score, setScore] = useState(0)


  const pickWordAndCategory = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  },[words])

  // Start The Palavra Secreta
  const startGame = useCallback(() => {
    //pick word and pick category
    const {word, category} = pickWordAndCategory()

    //create an array of letters
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //fill states
    setPickedWorkd(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  },[pickWordAndCategory])

  // Process the letter input
  const verifYLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase()

    // Check if letter has already utilized
    if(guessedLetter.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return 
    }

    // Push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //Check if guesses ended
  useEffect(() => {
    if(guesses <= 0){
      //Reset all states
      clearLetterStates()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  //Check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    // win condition
    if(guessedLetter.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => actualScore += 100)

      //restart game
      startGame()
    }

  },[guessedLetter, letters, startGame])

  // Restarts the Game
  const retry = () => {
    setScore(0)
    setGuesses(guessedQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && 
        <Game 
          verifyLetter={verifYLetter} 
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetter={guessedLetter}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
      />}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
