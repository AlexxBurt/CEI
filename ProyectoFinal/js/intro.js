'use strict'

const page = document.documentElement
const intro = document.querySelector(`.Wrapper`)
const sentence = document.querySelectorAll(`.Wrapper-text`)
const word = document.querySelectorAll(`.Wrapper-word`)

const SENTENCE_DELAY = 500
const WORD_DELAY = 300
const FINAL_FADE_TIME = 2000

window.addEventListener(`DOMContentLoaded`, () => {
    word.forEach(( span ) => {
        span.classList.remove(`isActive`)
    })

    let lastStartDelay = 0

    sentence.forEach(( sentenceBlock, i ) => {
        const words = sentenceBlock.querySelectorAll(`.Wrapper-word`)

        words.forEach(( span, idx ) => {
            const startDelay = ( i * SENTENCE_DELAY ) + ( ( idx + 1 ) * WORD_DELAY )
            if( startDelay > lastStartDelay ) lastStartDelay = startDelay

            setTimeout(() => {
                span.classList.add(`isActive`)
            }, startDelay)
        })
    })

    setTimeout(() => {
        intro.style.opacity = `1`
    })

    setTimeout(() => {
        page.style.transition = `opacity ${ FINAL_FADE_TIME }ms cubic-bezier(0.22, 1, 0.36, 1)`
        page.style.opacity = `0`

        setTimeout(() => {
            window.location.href = `destinos.html`
        }, FINAL_FADE_TIME)
    }, lastStartDelay + 3000)
})