import "./index.html"
import "./index.scss"

import { CustomAccessibleSelect } from "./scripts/custom-select"

import { keyCodes } from "./utils/constants"
import { selectors } from "./utils/constants"

const selectsContainer = document.querySelectorAll('.custom-select')

const burgerMenu = document.querySelector('.menu')
const burgerButton = document.querySelector('.burger-button')
const burgerButtonLine = document.querySelector('.burger-button__line')

function toggleBurgerVisible() {
  burgerButton.classList.toggle('burger-button_active')
  burgerButtonLine.classList.toggle('burger-button__line_active')
  burgerMenu.classList.toggle('menu_active')
}


selectsContainer.forEach(select => {
  const selectElement = new CustomAccessibleSelect(select, keyCodes, selectors)
  selectElement.renderItems()
  selectElement.initEvents()
})

burgerButton.addEventListener('click', toggleBurgerVisible)