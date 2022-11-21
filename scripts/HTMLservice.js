class htmlService {
    constructor(data = []) {
        this.data = gameService.data
    }

    renderLevel() {
        gameService.levelCompleted = false;

        const CARD = document.querySelector('.card')
        CARD.innerHTML = 'Прослушайте аудио и выберите вариант ответа'

        const LEVEL_BTN = document.querySelector('.btn--level')
        LEVEL_BTN.classList.remove('btn--active')

        LEVEL_BTN.innerText = (gameService.currentLevel == this.data.length - 1) ?
            'Показать результаты' :
            'Следующий уровень'

        // LEVEL_BTN.dataset.controls = (gameService.currentLevel == this.data.length - 1) ?
        //     'showResults' :
        //     'nextLevel'

        this.renderOptions()
        this.setCurrentLevelTab()
        this.renderQuestion()
        this.renderScore()
    }



    renderOptions() {
        const OPTIONS_LIST = document.querySelector('.options__list')
        const CURRENT_LEVEL = gameService.currentLevel

        OPTIONS_LIST.innerHTML = ''
        for (let i = 0; i < this.data[CURRENT_LEVEL].length; i++) {
            let li = document.createElement('li')
            li.className = 'options__list-item'
            li.innerText = this.data[CURRENT_LEVEL][i].name
            li.dataset.option = i
            OPTIONS_LIST.append(li)
        }

    }

    renderQuestion() {
        const CURRENT_LEVEL = gameService.currentLevel
        const QUESTION_CONTAINER = document.querySelector('.quiz-question')
        const CORRECT_ANSWER = gameService.answers[CURRENT_LEVEL]


        QUESTION_CONTAINER.innerHTML = `
        <img class="quiz-question__image" src="./media/unknown.jpg" alt="bird">
        <div class="quiz-question__info">
            <h3 class="quiz-title">*****</h3>

            <div class="quiz-question__audio">
        <div class="playback-controls">
        <div class="playback-button" data-player="question">
        <svg class="playback-play" viewBox="-200 0 1200 1000"><path fill="#00bc8c" d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path></svg>
        <svg class="playback-pause" viewBox="0 0 47.607 47.607"><path fill="#00bc8c" d="M17.991 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345zM42.877 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345z"></path></svg>
        </div>

        <div class="playback-volume" id="question-volume"> 
        <input 
        class="range-slider slider-progress"
        data-player="question"
        type="range" 
        min="0" max="10" 
        value="10">
          </div>
        </div>
           

            <div class="playback-time" >
            <div id="question-playback-current-time">00:00</div>
            <div class="playback-progress-container" data-progress="question">
            <div id="question-playback-progress" class="playback-progress"></div>
            </div>
            <div id="question-playback-duration"></div>
            </div>
            
            <audio id="question-audio" loop>
            <source class="card__media" src='${this.data[CURRENT_LEVEL][CORRECT_ANSWER].audio}' type="audio/mpeg"></source>
          </audio>
            </div>
        </div>
        `
        this.renderAudioControls('question')


    }

    renderCard(option) {
        const CURRENT_LEVEL = gameService.currentLevel
        const CARD = document.querySelector('.card')
        CARD.innerHTML = `
        <div class="card__top">
        <img class="card__image" src="${this.data[CURRENT_LEVEL][option].image}" alt="">

        <div class="card__top-right">
        <div class="quiz-title" id="question-title">${this.data[CURRENT_LEVEL][option].name}</div>
        <div class="card__title-latin">${this.data[CURRENT_LEVEL][option].species}
        </div>

        <div class="quiz-question__audio">
        <div class="playback-controls">
        <div class="playback-button" data-player="card">
        <svg class="playback-play" viewBox="-200 0 1200 1000"><path fill="#00bc8c" d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path></svg>
        <svg class="playback-pause" viewBox="0 0 47.607 47.607"><path fill="#00bc8c" d="M17.991 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345zM42.877 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345z"></path></svg>
        </div>

        <div class="playback-volume" id="question-volume"> 
        <input 
        class="range-slider slider-progress"
        data-player="card"
        type="range" 
        min="0" max="10" 
        value="10">
          </div>
        </div>

        <div class="playback-time" >
        <div id="card-playback-current-time">00:00</div>
        <div class="playback-progress-container" data-progress="card">
        <div class="playback-progress" id="card-playback-progress"></div>
        </div>
        <div id="card-playback-duration"></div>
        </div>            

        <audio id="card-audio" >
            <source class="card__media" src='${this.data[CURRENT_LEVEL][option].audio}' type="audio/mpeg"></source>
          </audio>
          </div>
        </div>
        </div>
        <div class="card__info">${this.data[CURRENT_LEVEL][option].description}</div>
           
        `
        this.renderAudioControls('card')
    }

    renderAudioControls(container) {
        let AUDIO
        let PROGRESS_BAR
        let DURATION_CONTAINER
        let CURRENT_TIME_CONTAINER
        if (container == 'question') {
            AUDIO = document.querySelector('#question-audio')
            PROGRESS_BAR = document.querySelector('#question-playback-progress')
            DURATION_CONTAINER = document.querySelector('#question-playback-duration')
            CURRENT_TIME_CONTAINER = document.querySelector('#question-playback-current-time')
        } else if (container == 'card') {
            AUDIO = document.querySelector('#card-audio')
            PROGRESS_BAR = document.querySelector('#card-playback-progress')
            DURATION_CONTAINER = document.querySelector('#card-playback-duration')
            CURRENT_TIME_CONTAINER = document.querySelector('#card-playback-current-time')

        }

        AUDIO.onloadedmetadata = () => {

            let DURATION_TIME = Math.floor(AUDIO.duration)
            let totalMinutes = String(Math.floor(DURATION_TIME / 60)).padStart(2, '0')
            let totalSeconds = String(DURATION_TIME - (totalMinutes * 60)).padStart(2, '0')
            DURATION_CONTAINER.innerText = `${totalMinutes}:${totalSeconds}`

            setInterval(function () {
                let CURRENT_TIME = Math.floor(AUDIO.currentTime)
                let CURRENT_PERCENT = (AUDIO.currentTime / AUDIO.duration) * 100
                PROGRESS_BAR.style.width = `${CURRENT_PERCENT}%`
                let currentMinutes = String(Math.floor(CURRENT_TIME / 60)).padStart(2, '0')
                let currentSeconds = String(CURRENT_TIME - (currentMinutes * 60)).padStart(2, '0')
                CURRENT_TIME_CONTAINER.innerText = `${currentMinutes}:${currentSeconds}`
            }, 1000)
        }




    }

    handleChangeVolume(slider) {
        let AUDIO
        if (slider.dataset.player == 'question') {
            AUDIO = document.querySelector('#question-audio')
            AUDIO.volume = slider.value / 10

        } else if (slider.dataset.player == 'card') {
            AUDIO = document.querySelector('#card-audio')
            AUDIO.volume = slider.value / 10
        }

    }

    setCurrentLevelTab() {
        const LEVEL_ITEMS = document.querySelectorAll('.progress__item')
        const CURRENT_LEVEL = gameService.currentLevel
        for (let i = 0; i < LEVEL_ITEMS.length; i++) {
            if (i == CURRENT_LEVEL) LEVEL_ITEMS[i].classList.add('progress__item--active')
            else LEVEL_ITEMS[i].classList.remove('progress__item--active')
        }
    }

    // handleSelectOption(option) {
    //     this.renderCard(option)
    //     if (!gameService.levelCompleted) this.checkAnswer(option)
    // }

    // checkAnswer(option) {
    //     const OPTIONS = document.querySelectorAll('.options__list-item')
    //     const CORRECT_ANSWER = gameService.answers[gameService.currentLevel]
    //     if (+option === CORRECT_ANSWER) {
    //         const LEVEL_BTN = document.querySelector('.btn--level')
    //         LEVEL_BTN.classList.add('btn--active')
    //         OPTIONS[option].classList.add('options__list-item--correct')
    //         gameService.levelCompleted = true;
    //         this.revealCorrectAnswer()
    //         gameService.handleCorrectAnswer()
    //     } else {
    //         gameService.handleWrongAnswer()
    //         OPTIONS[option].classList.add('options__list-item--error')
    //     }
    //     this.renderScore()
    // }



    revealCorrectAnswer() {
        const CURRENT_LEVEL = gameService.currentLevel
        const CORRECT_ANSWER = gameService.answers[gameService.currentLevel]
        const TITLE = document.querySelector('.quiz-title')
        const IMAGE = document.querySelector('.quiz-question__image')
        TITLE.innerText = this.data[CURRENT_LEVEL][CORRECT_ANSWER].name
        IMAGE.src = this.data[CURRENT_LEVEL][CORRECT_ANSWER].image
    }

    renderScore() {
        let SCORE = document.querySelector('#score')
        SCORE.innerText = gameService.score
    }

    navigateResults() {

    }

    toggleAudioPlayPause(button) {

        const PLAYER = button.dataset.player
        let AUDIO = null
        // console.log('PLAYER :', PLAYER);
        if (PLAYER == 'question') {
            AUDIO = document.querySelector('#question-audio')
        } else if (PLAYER == 'card') {
            AUDIO = document.querySelector('#card-audio')
        }

        if (button.classList.contains('playback-button--playing')) {
            AUDIO.pause()
        } else {
            AUDIO.play()
        }
        button.classList.toggle('playback-button--playing')
    }

    seekTrack(player, percent) {
        console.log('player :', player);
        let AUDIO
        if (player == 'question') {
            AUDIO = document.querySelector('#question-audio')
        } else if (player == 'card') {
            AUDIO = document.querySelector('#card-audio')
        }
        AUDIO.currentTime = AUDIO.duration * percent
    }

    handleStartGame() {
        const screens = document.querySelectorAll('.container')
        screens[0].classList.add('hidden')
        screens[1].classList.remove('hidden')

    }
    handleShowResults() {
        const screens = document.querySelectorAll('.container')
        const results = document.querySelector('#results')
        screens[1].classList.add('hidden')
        screens[2].classList.remove('hidden')
        results.innerText = `
        Ваш результат: ${gameService.score}/30 баллов \n 
        Неправильных ответов: ${gameService.incorrectAnswers}
        `

    }
    handleNewGame() {
        const screens = document.querySelectorAll('.container')
        screens[1].classList.add('hidden')
        screens[2].classList.add('hidden')
        screens[0].classList.remove('hidden')


    }
}