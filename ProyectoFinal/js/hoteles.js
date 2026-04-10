'use strict'

// Acordeón: abre un hotel y cierra el resto.
const initAccordion = () => {
  const options = Array.from(document.querySelectorAll(`.Accordion-option`)).filter(option => option.style.display !== `none`)
  const titles = options.map(option => option.querySelector(`.Accordion-h2`))
  const texts = options.map(option => option.querySelector(`.Accordion-p`))
  const buttons = options.map(option => option.querySelector(`.Accordion-button`))

  const setActive = activeIndex => {
    options.forEach((option, index) => option.classList.toggle(`isActive`, index === activeIndex))
    titles.forEach((title, index) => title && title.classList.toggle(`isActive`, index === activeIndex))
    texts.forEach((text, index) => text && text.classList.toggle(`isVisible`, index === activeIndex))
    buttons.forEach((button, index) => button && button.classList.toggle(`isVisible`, index === activeIndex))
  }

  titles.forEach((title, index) => {
    if (title) title.addEventListener(`click`, () => setActive(index))
  })

  options[0] && setActive(0)
}


// Carga la información de hoteles del JSON, pinta contenido y conecta selección de alojamiento

window.addEventListener(`DOMContentLoaded`, async () => {
  const app = window.AppData
  const slug = app.getCountrySlugFromUrl()
  const entry = await app.getCountryEntryBySlug(slug)
  const hotels = await app.getHotelsByCountry(slug)
  if (!entry) return

  app.setCountry(slug)
  const options = [...document.querySelectorAll(`.Accordion-option`)]
  
  
// Actualiza el texto de los botones según hotel seleccionado

  const repaintButtons = () => options.forEach((op, i) => {
    const b = op.querySelector(`.Accordion-button`)
    const h = hotels[i]

    if (h && b) {
      b.textContent = app.isHotelSelected(h) ? `Eliminar alojamiento` : `Seleccionar alojamiento · ${h.roomRate}`
    }
  })


// Inyecta nombre/descripcion de cada hotel visible

  options.forEach((op, i) => {
    const h = hotels[i]

    if (!h) {
      op.style.display = `none`
      return
    }

    op.style.display = ``
    op.querySelector(`.Accordion-h2`).textContent = h.name
    op.querySelector(`.Accordion-p`).textContent = h.description
    op.querySelector(`.Accordion-button`).onclick = () => {
      app.setHotel(h)
      repaintButtons()
    }
  })


// Aplica fondo del país y enlaza al paso de reserva.

  const [, country] = entry
  const bg = app.toAssetPath(country.backgroundImage)
  document.querySelector(`.Wrapper`).style.background = `linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.2)), url('${bg}') center / cover no-repeat`
  document.querySelector(`.Wrapper-next`).href = `reserva.html?pais=${encodeURIComponent(slug)}`

  repaintButtons()
  initAccordion(options.filter(op => op.style.display !== `none`))
})