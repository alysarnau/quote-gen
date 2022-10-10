
const button = document.querySelector("#get-quotes")

button.addEventListener('click', getQuotes)

function getQuotes(e) {
    e.preventDefault();
    const number = document.querySelector("#number").value
    const https = new XMLHttpRequest();
    https.open("GET", "https://type.fit/api/quotes", true);
    https.onload = function() {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText)
            console.log(data)
            let output = "";
            data.forEach((quote) => {
                output += `
                <li>"${quote.text}" - ${quote.author} </li>
                <hr />
                `
            })
            document.querySelector(".quotes").innerHTML = output;
        }
    }
    https.send();
}