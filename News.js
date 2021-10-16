let acc = document.getElementById('acc-header');
let key = "1778275ed5df408ca819502d185125d8";
let sources = "";
let country = "us";
let keyword = "Tesla";
show();
function show() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://newsapi.org/v2/everything?q=${keyword}&sortBy=popularity&apiKey=${key}`, true);
    xhr.onprogress = function()
    {
        let spin = document.getElementById('spin');
        spin.innerHTML = `<div class="spinner-border text-primary center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`;
    }
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            console.log(articles);
            let str = "";
            let newshtml = "";
            articles.forEach(function (element) {
                let dt = new Date(element["publishedAt"]);
                str = `<div class="accs" >
                            <div class="header">
                                <div class="img-container">
                                    <img src=${element.urlToImage} >
                                    <div id="headline">
                                        <p class="description">${element["title"]}</p>
                                        <p class="description_dt">${dt.toLocaleDateString('en-UK')} - ${element.source.name}</p>
                                    </div>
                                    </img>
                                </div>
                            </div>
                            <p class="content">${element["content"]}</p>
                            <br><p class="fst-italic sm text-start mx-2">Author: ${element["author"]}</p>
                        </div>`;
                newshtml = newshtml + str;
            });
            acc.innerHTML = newshtml;
            let spin = document.getElementById('spin');
            spin.innerHTML = "";
        }
    }
    xhr.send();
}
let srch = document.getElementById('srch');
srch.addEventListener('input', function () {
    keyword = srch.value.toLowerCase();
    show();
    let srchResult = document.getElementById('srch-result');
    srchResult.innerText = `Showing results for "${keyword}"`;
});