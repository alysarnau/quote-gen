
const button = document.querySelector("#get-quotes")

button.addEventListener('click', getQuotes)

function getQuotes(e) {
    e.preventDefault();
    const number = document.querySelector("#number").value
    console.log('click: ', number)
}