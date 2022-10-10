
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
                shuffle(data)
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

// Fisher-Yates Shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }