
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
                shuffle(data)
                let output = "";
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

// Fisher-Yates Shuffle
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }