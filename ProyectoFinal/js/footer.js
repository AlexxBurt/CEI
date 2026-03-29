'use strict'

/*
Hacer click en el icono inferior, añade / quita la clase "isVisible" al footer
*/
function loadFooter() {
    const footer = document.querySelector(`.Footer`)
    const svg = document.querySelector(`.Footer-svg`)

    if (!footer || !svg) return
    if (svg.dataset.listenerAdded === `true`) return

    svg.dataset.listenerAdded = `true`
    svg.addEventListener(`click`, () => {
        footer.classList.toggle(`isVisible`)
    })
}

window.loadFooter = loadFooter
loadFooter()