const icon_1 = document.querySelector('.icon_1')
const icon_2 = document.querySelector('.icon_2')
const button = document.querySelector('.button')

button.addEventListener('click', () => {
    icon_1.classList.toggle('icon_1_off')
    icon_2.classList.toggle('icon_2_off')
})