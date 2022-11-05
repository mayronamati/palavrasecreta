import styles from './GameOver.module.css'

const GameOver = ({retry, score}) => {
  return (
    <div className={styles.stilos}>
        <h1>Fim de Jogo</h1>
        <h2>Você fez <span>{score}</span> pontos!</h2>
        <button onClick={retry}>Jogar Novamente</button>
    </div>
  )
}

export default GameOver