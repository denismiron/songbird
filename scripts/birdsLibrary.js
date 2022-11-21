const CONTAINER = document.querySelector('.library')

renderLibraryItem(birdsData)

function renderLibraryItem(el) {

    if (Array.isArray(el)) {
        for (let i = 0; i < el.length; i++) {
            renderLibraryItem(el[i])
        }
    } else {
        let card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
    <img class="card__image" src="${el.image}" alt="">
    <div class="quiz-title" id="question-title">${el.name}</div>
    <div class="card__title-latin">${el.species}</div>
    <audio id="card-audio" controls >
        <source class="card__media" src='${el.audio}' type="audio/mpeg"></source>
      </audio>
    <div class="card__info">${el.description}</div>
    `
        CONTAINER.appendChild(card)
    }

}