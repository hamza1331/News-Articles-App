const main = document.querySelector('main')
const souces = document.getElementById('sources')
const defaultSource = 'the-washington-post'
window.addEventListener('load',async function(){
    updateNews()
   await updateSources()
   souces.value = defaultSource

   souces.addEventListener('change',function(e){
       updateNews(e.target.value)
   })
})

async function updateSources(){
    const res = await fetch('https://newsapi.org/v2/sources?apiKey=64acbae1506941e399cd79830e738ee9')
    const data = await res.json()
    souces.innerHTML += data.sources.map(function(src){
        return '<option value = "'+src.id+'">'+src.name+'</option>'
    }).join('\n')
}

async function updateNews(source = defaultSource){
    const res = await fetch('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey=64acbae1506941e399cd79830e738ee9')
    const json = await res.json()

    main.innerHTML = json.articles.map(createArticle).join('\n')
}
function createArticle(article){
  return '<div class = "article"> <a target="_blank" href = '+article.url+'> <h2>'+article.title+'</h2> <img src='+article.urlToImage+' /> <p> '+article.description+' </p></a></div>'
}