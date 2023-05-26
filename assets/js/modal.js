const playGame = document.getElementById('playGame')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('closeModal')

playGame.addEventListener('click', () => {
    modal.classList.add('active')
})

closeModal.addEventListener('click', () => {
    modal.classList.remove('active')
})