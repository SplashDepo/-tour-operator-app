import "./index.html"
import "./index.scss"


const SPACEBAR_CODE = "Space";
const ENTER_CODE = "Enter";
const ESCAPE_CODE = "Escape";
const DOWN_ARROW_CODE = "ArrowDown";
const UP_ARROW_CODE = "ArrowUp";

const selectedNode = document.querySelector('.dropdown__selected')
const dropdownList = document.querySelector('.dropdown__list')
const dropdownListContainer = document.querySelector('.dropdown__list-container')
const dropdownListItems = dropdownList.querySelectorAll('.dropdown__list-item')

let activeIndex = 0;

function toggleDropdownVisibility(e) {
  let pressOpenedKey = e.code === SPACEBAR_CODE || e.code === ENTER_CODE

  if (e.type === 'click' || pressOpenedKey) {
    e.preventDefault()
    dropdownList.classList.toggle('open')
    dropdownListContainer.setAttribute('aria-expended', dropdownList.classList.contains('open'))
  }

  if (e.code === ESCAPE_CODE) {
    dropdownClose()
  }

  if (e.code === DOWN_ARROW_CODE) {
    focusNextItem(e)
  }

  if (e.code === UP_ARROW_CODE) {
    focusPrevItem(e)
  }
}

function dropdownClose() {
  dropdownList.classList.remove('open')
  dropdownListContainer.setAttribute('aria-expended', false)
}

function setSelectedItem(e) {
  selectedNode.value = e.target.textContent
}


dropdownListItems.forEach(item => {
  item.addEventListener('click', (e) => {
    setSelectedItem(e)
    dropdownClose()
  })

  item.addEventListener('keydown', function (e) {
    switch (e.code) {
      case ENTER_CODE:
        setSelectedItem(e)
        dropdownClose()
        break;
      case ESCAPE_CODE:
        dropdownClose()
        break;
      case DOWN_ARROW_CODE:
        focusNextItem(e)
        break;
      case UP_ARROW_CODE:
        focusPrevItem(e)
        break;
      default:
        break;
    }
  })
})

function focusNextItem(e) {
  e.preventDefault()
  if (activeIndex > dropdownListItems.length - 1) return
  dropdownListItems[activeIndex].focus()
  activeIndex++

}

function focusPrevItem(e) {
  e.preventDefault()
  if (activeIndex <= 0) return
  activeIndex--
  dropdownListItems[activeIndex].focus()

}

selectedNode.addEventListener('keydown', e => {
  toggleDropdownVisibility(e)
})

selectedNode.addEventListener('click', e => {
  toggleDropdownVisibility(e)
})

document.addEventListener('click', function (e) {
  if (!dropdownList.classList.contains('open')) return

  if (e.target.closest('.custom-select')) return

  dropdownClose()
})