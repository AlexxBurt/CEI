'use strict'


// Animación del texto de intro y redirección final a la página principal

const page = document.documentElement
const wrapper = document.querySelector(`.Wrapper`)
const sentences = [...document.querySelectorAll(`.Wrapper-text`)]
const words = [...document.querySelectorAll(`.Wrapper-word`)]
let sentencesDelay = 500
let wordsDelay = 300
let transitionFade = 2000

window.addEventListener(`DOMContentLoaded`, () => {
    words.forEach(words => words.classList.remove(`isActive`))

    let lastDelay = 0
    sentences.forEach((sentence, i) => {
        [...sentence.querySelectorAll(`.Wrapper-word`)].forEach((word, j) => {
            const delay = i * sentencesDelay + (j + 1) * wordsDelay
            lastDelay = Math.max(lastDelay, delay)
            setTimeout(() => word.classList.add(`isActive`), delay)
        })
    })

    wrapper.style.opacity = `1`
    setTimeout(() => {
        page.style.transition = `opacity ${transitionFade}ms cubic-bezier(0.22, 1, 0.36, 1)`
        page.style.opacity = `0`
        setTimeout(() => (window.location.href = `index.html`), transitionFade)
    }, lastDelay + 3000)
})