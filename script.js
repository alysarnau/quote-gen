
const button = document.querySelector("#get-quotes")
const randomButton = document.querySelector("#get-random-quote")
button.addEventListener('click', getQuotes)
randomButton.addEventListener('click', getRandomQuote)
const apiURL = 'https://type.fit/api/quotes'

function getQuotes(e) {
    e.preventDefault();
    const number = document.querySelector("#number").value
    if (number && number > 0) {
        fetch(apiURL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data = shuffle((data))
                let output = `<hr>`;
                for (let i = 0; i < data.length; i++) {
                    if (i == number) {break;}
                    console.log('quote: ', data[i])
                    output += `
                        <li>"${data[i].text}" -<em>${data[i].author}</em> </li>
                        <hr />
                        ` 
                }
                document.querySelector(".quotes").innerHTML = output;
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        return alert('Please enter a number.')
    }
}

function getRandomQuote(e) {
    e.preventDefault();
    fetch(apiURL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data = shuffle((data))
                let output = `
                        <li>"${data[0].text}" -<em>${data[0].author}</em> </li>
                        <hr />
                        ` 
                document.querySelector(".quotes").innerHTML = output;
                })
            .catch((error) => {
                console.log(error)
            })
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