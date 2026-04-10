'use strict'

document.addEventListener(`DOMContentLoaded`, async () => {
  const app = window.AppData
  const slides = [...document.querySelectorAll(`.Slider-frame`)]
  const dots = [...document.querySelectorAll(`.Selector-dot`)]
  const slider = document.querySelector(`.Slider`)
  if (!slides.length) return
  let i = 0
  let lock = false


// Mueve el slider y marca el dot activo

  const paint = () => {
    slides.forEach(s => (s.style.transform = `translateY(-${i * window.innerHeight}px)`))
    dots.forEach((d, idx) => d.classList.toggle(`isActive`, idx === i))
  }


// Trae los titular del slide con el campo `titular` de countries.json

  try {
    const data = await app.loadData()
    const countries = Object.entries(data.countries || {})
    slides.forEach(slide => {
      const a = slide.querySelector(`.Slider-button`)
      const h2 = slide.querySelector(`.Slider-text`)
      if (!a || !h2) return
      const slug = app.canonicalCountry(app.normalizeCountry(new URL(a.href, location.href).searchParams.get(`pais`)))
      const entry = countries.find(([name]) => app.canonicalCountry(app.normalizeCountry(name)) === slug)
      if (!entry) return
      const [, info] = entry
      if (info?.titular) h2.textContent = info.titular
      const bg = app.toAssetPath(info?.backgroundImage)
      if (bg) slide.style.backgroundImage = `url('${bg}')`
    })
  } catch {}


// Limita a una slide por scroll

  const move = dir => {
    if (lock) return
    lock = true
    i = (i + dir + slides.length) % slides.length
    paint()
    setTimeout(() => (lock = false), 850)
  }


// Navegación al clickar dots, usando el teclado y/o la haciendo scroll

  dots.forEach((d, idx) => d.addEventListener(`click`, () => ((i = idx), paint())))
  window.addEventListener(`keydown`, e => e.key === `ArrowDown` ? move(1) : e.key === `ArrowUp` ? move(-1) : null)
  window.addEventListener(`wheel`, e => {
    e.preventDefault()
    if (lock || (i === 0 && e.deltaY < 0) || (i === slides.length - 1 && e.deltaY > 0)) return
    move(e.deltaY > 0 ? 1 : -1)
  }, { passive: false })

  document.addEventListener(`focusin`, e => {
    const frame = e.target.closest(`.Slider-frame`)
    if (!frame) return
    const next = slides.indexOf(frame)
    if (next < 0 || next === i) return
    i = next
    paint()
  })

  slider?.addEventListener(`scroll`, () => {
    const next = Math.round(slider.scrollTop / window.innerHeight)
    if (next < 0 || next >= slides.length || next === i) return
    i = next
    dots.forEach((d, idx) => d.classList.toggle(`isActive`, idx === i))
  })

  paint()


// Guarda qué país se ha elegido al pulsar el botón

  document.addEventListener(`click`, e => {
    const a = e.target.closest(`.Slider-button`)
    if (!a) return
    const slug = app.canonicalCountry(app.normalizeCountry(new URL(a.href, location.href).searchParams.get(`pais`)))
    if (slug) app.setCountry(slug)
  })
})