const API_KEY = "a9b54e47035e46879306e156468f88c1";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews('India'));

function reload(){
    window.location.reload()
}

async function fetchNews(query){
      const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
      const data = await res.json();
      console.log(data)
      bindData(data.articles)
}

function bindData(data){
    const cardContainer = document.getElementById('card-container');
    const templateCard = document.getElementById('template')

    cardContainer.innerHTML ="";

    data.forEach(article => {
        if(!article.urlToImage)
            return;

        const cloneCard = templateCard.content.cloneNode(true)
        fillInTheCard(cloneCard,article)
        cardContainer.appendChild(cloneCard);
    });
}


function fillInTheCard(card,article){
    const image = card.querySelector('#img');
    const heading = card.querySelector('#news-heading');
    const source = card.querySelector('#news-source');
    const description = card.querySelector('#news-description');

    image.src = article.urlToImage
    heading.innerHTML = article.title
    description.innerHTML = article.description

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone:"Asia/Jakarta"
    })

    source.innerHTML = `${article.source.name} • ${date}`

    card.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank")
        console.log('clicked')
    })
}

let currentSelectedNavItem = null;

function onClickNavItems(id) {
    fetchNews(id);

    const navItem = document.getElementById(id);
    currentSelectedNavItem?.classList.remove('active');
    currentSelectedNavItem = navItem
    currentSelectedNavItem.classList.add('active');

    searchText.value=""
}


const searchButton = document.getElementById('search')
const searchText = document.getElementById('input')

searchButton.addEventListener('click',()=>{
    const query = searchText.value
    if(!query) return;
    fetchNews(query);

    currentSelectedNavItem?.classList.remove('active')
    currentSelectedNavItem = null
})