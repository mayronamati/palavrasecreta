import styles from './Game.module.css'

import {useState, useRef} from 'react'

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetter, guesses, wrongLetters, score}) => {

  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")

    letterInputRef.current.focus()
  }


  return (
    <div className={styles.game}>
      <p className={styles.points}>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a Palavra</h1>
      <h3 className={styles.tip}>
        Dica Sobre a Palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Voce ainda possui {guesses} Tentativas</p>
      <div className={styles.wordContainer}>
        {letters.map((letter, i) => (
          guessedLetter.includes(letter) ? (
            <span key={i} className={styles.letter}>{letter}</span>
          ):(
            <span key={i} className={styles.blankSquare}></span>
          )
        ))}
      </div>
      <div className={styles.letterContainer}>
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength="1" 
            required 
            onChange={(e) => setLetter(e.target.value)} 
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className={styles.wrongLettersContainer}>
        <p>Letras já utilizadas: </p>
        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter},</span>
        ))}
      </div>
    </div>
  )
}

export default Game