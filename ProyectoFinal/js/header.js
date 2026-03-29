'use strict'

/*
Cargar el header dentro del selector con clase "Header"
Cargar el footer dentro del selector con clase "Footer"
*/
const showMenu = async () => {
  const header = document.querySelector('.Header')
  const res = await fetch('header.html')
  header.innerHTML = await res.text()
  window.loadHeader?.() // ChatGPT-5.3-Codex
}
showMenu()

const showFooter = async () => {
  const footer = document.querySelector('.Footer')
  const res = await fetch('footer.html')
  footer.innerHTML = await res.text()
  window.loadFooter?.() // ChatGPT-5.3-Codex
}
showFooter()



/*
Funcionalidad del Slider + añadir / quitar clase "isActive" a los dots
*/
document.addEventListener(`DOMContentLoaded`, () => { // <-- ChatGPT-5.3-Codex
  const slide = document.querySelectorAll(`.Slider-frame`)
  const dot = document.querySelectorAll(`.Selector-dot`)

  /*
  Fix scroll tours.html:
  - Si esta página no tiene slider, no registramos navegación por rueda.
  - Si el cursor está sobre un contenedor con scroll, no bloqueamos su rueda.
  */
  
  // if (!slide.length || !dot.length) return
  
  let currentIndex = 0
  let slideHeight = window.innerHeight
  let isAnimating = false // ChatGPT-5.3-Codex
  const ANIMATION_LOCK_MS = 850

  const updateSlider = () => {
    slide.forEach(slide => slide.style.transform = `translateY(-${currentIndex * slideHeight}px)`)
    dot.forEach(dot => dot.classList.remove(`isActive`))
    dot[currentIndex].classList.add(`isActive`)
  }


  /*
  Navegación suave hacia arriba y abajo
  ChatGPT-5.3-Codex
  */
  const prevSlide = () => {
    if (isAnimating) return
    isAnimating = true
    currentIndex <= 0 ? currentIndex = slide.length - 1 : currentIndex--
    updateSlider()
    setTimeout(() => {
      isAnimating = false
    }, ANIMATION_LOCK_MS)
  }

  const nextSlide = () => {
    if (isAnimating) return
    isAnimating = true
    currentIndex >= slide.length - 1 ? currentIndex = 0 : currentIndex++
    updateSlider()
    setTimeout(() => {
      isAnimating = false
    }, ANIMATION_LOCK_MS)
  }


  /*
  Hacer click en un dot te lleva a su slide
  */
  const handleNavigateSlide = (index) => {
    currentIndex = index
    updateSlider()
  }

  dot.forEach((dot, index) => {
    dot.addEventListener(`click`, () => handleNavigateSlide(index))
  })

  /*
  Navegación arriba y abajo usando el teclado
  */
  const handleKeydown = (e) => {
    if (e.key === `ArrowDown`) {
      nextSlide()
    } else if (e.key === `ArrowUp`) {
      prevSlide()
    }
  }


  /*
  Navegación entre slides usando el scroll
  ChatGPT-5.3-Codex
  */
  const handleWheel = (e) => {
   /* const isInsideScrollable = (node) => {
      let current = node

      while (current && current !== document.body) {
        const styles = window.getComputedStyle(current)
        const overflowY = styles.overflowY
        const canScroll = current.scrollHeight > current.clientHeight

        if ((overflowY === `auto` || overflowY === `scroll`) && canScroll) {
          return true
        }

        current = current.parentElement
      }

      return false
    }

    if (isInsideScrollable(e.target)) return */

    e.preventDefault()

    if (isAnimating) return
    if (currentIndex === 0 && e.deltaY < 0) {
      return
    }
    if (currentIndex === slide.length - 1 && e.deltaY > 0) {
      return
    }
    if (e.deltaY > 0) {
      nextSlide()
    } else if (e.deltaY < 0) {
      prevSlide()
    }
  }

  window.addEventListener(`keydown`, handleKeydown)
  window.addEventListener(`wheel`, handleWheel, { passive: false })
})

// Existe un problema en este JS que bloquea el scroll en el texto de 'tours.html'