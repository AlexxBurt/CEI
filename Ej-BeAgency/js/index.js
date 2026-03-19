'use strict'

// When CLICK in .Header-svg --> .Menu enter
// When CLICK in .Menu-svg --> .Menu exit
// If *screen* > 960px --> .Menu exit

const menuButton = document.querySelector(`.Header-svg`)
const menuClose = document.querySelector(`.Menu-svg`)
const menuSidebar = document.querySelector(`.Menu`)

console.log( menuSidebar )

    menuButton.addEventListener(`click` , ()=>{
        menuSidebar.classList.add(`isVisible`)
        
        console.log(`Haciendo CLICK en el ABRIR`)
    })

    menuClose.addEventListener(`click` , ()=>{
        menuSidebar.classList.remove(`isVisible`)

        console.log(`Haciendo CLICK en el CERRAR`)
    })

    window.addEventListener(`resize` , ()=>{
        const screenWidth = window.innerWidth
        console.log( screenWidth )

        if( screenWidth >= 960 ){
            menuSidebar.classList.remove(`isVisible`)
        }
    })