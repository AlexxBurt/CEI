'use strict'

/*
Cargar el header dentro del selector con clase "Header"
Cargar el footer dentro del selector con clase "Footer"
*/
const showMenu = async () => {
  const header = document.querySelector(`.Header`)

  const res = await fetch(`header.html`)
  header.innerHTML = await res.text()
  window.loadHeader?.() // ChatGPT-5.3-Codex
}
showMenu()

const showFooter = async () => {
  const footer = document.querySelector(`.Footer`)

  const res = await fetch(`footer.html`)
  footer.innerHTML = await res.text()
  window.loadFooter?.() // ChatGPT-5.3-Codex
}
showFooter()