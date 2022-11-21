class gameService {
    constructor(data = []) {
        this.data = data
        this.answers = this.generateAnswers()
    }

    currentLevel = 0;
    score = 0;
    incorrectAnswers = 0;
    levelCompleted = false;

    snd_correct = new Audio('./media/correct.mp3'); // buffers automatically when created
    snd_wrong = new Audio('./media/wrong.mp3'); // buffers automatically when created


    generateAnswers() {
        let answersObj = {}
        for (let i = 0; i < this.data.length; i++) {
            answersObj[i] = Math.round(Math.random() * (this.data.length - 1))
        }
        return answersObj;
    }

    handleCorrectAnswer() {
        this.score += 5
        const PLAY_BTN = document.querySelector('.playback-button')
        PLAY_BTN.classList.remove('playback-button--playing')
        document.querySelector('#question-audio').pause()
        this.snd_correct.play();
    }

    handleWrongAnswer() {
        this.score--
        this.incorrectAnswers++
        this.snd_wrong.play();
    }

    handleSelectOption(option) {
        htmlService.renderCard(option)
        if (!this.levelCompleted) this.checkAnswer(option)
    }

    checkAnswer(option) {
        const OPTIONS = document.querySelectorAll('.options__list-item')
        const CORRECT_ANSWER = this.answers[this.currentLevel]
        if (+option === CORRECT_ANSWER) {
            this.levelCompleted = true;
            const LEVEL_BTN = document.querySelector('.btn--level')
            LEVEL_BTN.classList.add('btn--active')
            OPTIONS[option].classList.add('options__list-item--correct')
            this.handleCorrectAnswer()
            htmlService.revealCorrectAnswer()
            htmlService.renderScore()
        } else {
            this.handleWrongAnswer()
            OPTIONS[option].classList.add('options__list-item--error')
        }
    }

    handleNextLevel() {
        if (this.levelCompleted) {
            if (this.currentLevel !== this.data.length - 1) {
                this.currentLevel++
                htmlService.renderLevel()
            } else htmlService.handleShowResults()
        }
    }

    restartGame() {
        this.currentLevel = 0;
        this.score = 0;
        this.incorrectAnswers = 0;

        htmlService.renderLevel();
        htmlService.handleNewGame();
    }
}