import styles from './StartScreen.module.css'
import logoGame from '../assets/secreteLogo.png'

const StartScreen = ({startGame}) => {
  return (
    <div className={styles.start}>
       <img src={logoGame} alt="Logo Palavra Secreta" />
       <h1>Palavra<br/><em>Secreta</em></h1>
       <p>Clique no botão abaixo para começar a jogar!</p>
       <button onClick={startGame}>Começar o Jogo</button> 
    </div>
  )
}

export default StartScreen