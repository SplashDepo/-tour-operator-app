import "./index.html"
import "./index.scss"

import { CustomAccessibleSelect } from "./scripts/custom-select"

import { keyCodes } from "./utils/constants"
import { selectors } from "./utils/constants"

const selectsContainer = document.querySelectorAll('.custom-select')

selectsContainer.forEach(select => {
  const selectElement = new CustomAccessibleSelect(select, keyCodes, selectors)
  selectElement.renderItems()
  selectElement.initEvents()
})