import "./index.html"
import "./index.scss"

const customSelect = document.querySelector('.custom-select')
const customSelectList = customSelect.querySelector('.custom-select__list')


customSelect.addEventListener('click', () => {
  customSelectList.classList.toggle('custom-select__list_opened')
})


const playBtn = document.querySelector(".about-us__play");
const popup = document.querySelector(".popup-video");

playBtn.addEventListener('click', showPopup)

function showPopup() {
  popup.style.display = "flex"
}

let year = 2012
let condition = year == 2015;

console.log(condition)