const APIKEY = "M6hHpAXkVXIDuyaf1nQ0kDHjddl9z1CkRfzSziCb10rZfMS19U8AdLOz";
const input = document.querySelector(".input")
const formBtn = document.querySelector(".search-btn")

let searchText = "";
let search = false;

// default photos //

async function defaultPhotos() {
    const data = await fetch(`https://api.pexels.com/v1/curated`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: APIKEY,
        }
    })
    const response = await data.json()
    console.log(response);
    displayImges(response)
}



function displayImges(response) {
    response.photos.forEach((e) => {
        const photo = document.createElement("div");
        photo.innerHTML = `
        <a href=${e.src.large} target="_blank">
        <img class"image" src=${e.src.large} alt=${e.url}>
        </a>
        <figcaption class="caption" >${e.photographer}</figcaption>
        `
        document.querySelector(".display-imges").appendChild(photo)
    })
}




async function searchPhotos(query) {
     const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
         method: "GET",
         headers: {
             Accept: "application/json",
             Authorization: APIKEY,
         }
     })
     const response = await data.json()
     console.log(response);
     displayImges(response)
}

input.addEventListener("input", (e) => {
    e.preventDefault();
    searchText=e.target.value
})


formBtn.addEventListener('click', () => {
    if (input.value === "") {
        document.querySelector('.alert').innerHTML = "Empty search! Plz enter value..."
    } else {
        document.querySelector('.alert').innerHTML = "";
        clear();
        search = true;
        searchPhotos(searchText)
    }
})

function clear() {
    document.querySelector(".display-imges").innerHTML= " "
}
defaultPhotos()