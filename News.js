let country = "in"
let category = null

document.getElementById("in").checked = true
let acc = document.getElementById('acc-header');

function show() {
    const xhr = new XMLHttpRequest();
    console.log(category + " "+country)
    if(category == null)
    {   xhr.open('GET', `https://saurav.tech/NewsAPI/everything/cnn.json`, true);   }
    else
    {   xhr.open('GET', `https://saurav.tech/NewsAPI/top-headlines/category/${category}/${country}.json`, true);   }
    
    xhr.onprogress = function () {
        let spin = document.getElementById('spin');
        spin.innerHTML = `<div class="spinner-border text-primary center" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>`;
    }
    xhr.onload = function () {
        if (this.status === 200) {
            let json = JSON.parse(this.responseText);
            let articles = json.articles;
            // console.log(articles);
            let str = "";
            let newshtml = "";
            articles.forEach(function (element) {
                let dt = new Date(element["publishedAt"]);
                str = `<div class="card inline-block m-2" style="width: 16rem;">
                            <img src="${element.urlToImage}" class="object-fit-cover border rounded">
                                ${element.title}
                            </img>
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

show(null, null)

// Get all radio buttons for category
const categoryRadioButtons = document.querySelectorAll('input[name="category"]');
function checkCategory(ct)
{
    console.log(categoryRadioButtons)
    categoryRadioButtons.forEach((rb) => {  rb.checked = false; })
    ct.checked = true
    category = ct.id
    show()
}

// Get all radio buttons for country
const countryRadioButtons = document.querySelectorAll('input[name="country"]');
console.log(countryRadioButtons)
function checkCountry(cty)
{
    countryRadioButtons.forEach((rb) => {   rb.checked = false; })
    cty.checked = true
    console.log(cty.id)
    country = cty.id
    show()
}