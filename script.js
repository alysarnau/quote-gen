
const button = document.querySelector("#get-quotes")
const randomButton = document.querySelector("#get-random-quote")

button.addEventListener('click', getQuotes)
randomButton.addEventListener('click', getRandomQuote)

function getQuotes(e) {
    e.preventDefault();
    const number = document.querySelector("#number").value
    if (number && number > 0) {
        const https = new XMLHttpRequest();
        https.open("GET", "https://type.fit/api/quotes", true);
        https.onload = function() {
            if (this.status === 200) {
                let data = JSON.parse(this.responseText)
                let output = "";
                // data.forEach((quote) => {
                //     output += `
                //     <li>"${quote.text}" - ${quote.author} </li>
                //     <hr />
                //     `
                // })
                for (let i = 0; i < data.length; i++) {
                    if (i == number) {break;}
                    output += `
                        <li>"${data[i].text}" - ${data[i].author} </li>
                        <hr />
                        ` 
                }
                document.querySelector(".quotes").innerHTML = output;
            }
        }
        https.send();
    } else {
        return alert('Please enter a number.')
    }
}

function getRandomQuote(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * 1643)
    const https = new XMLHttpRequest();
    https.open("GET", "https://type.fit/api/quotes", true);
    https.onload = function() {
        if (this.status === 200) {
            let data = JSON.parse(this.responseText)
            let quote = data[randomNumber]
            let output = `
                <li>"${quote.text}" - ${quote.author} </li>
                <hr />
            `;

            document.querySelector(".quotes").innerHTML = output;
        }
    }
    https.send();
}