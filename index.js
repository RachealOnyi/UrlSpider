
let url;
let siteData;

const _d = (u) => {
    return document.querySelector(u);
}
const _dAll = (u) => {
    return document.querySelectorAll(u);
}
const _dTg = (u) => {
    return document.getElementsByTagName(u);
}

function getUrlData(){
    url = _d('.url').value;
    var xhr = new XMLHttpRequest();
    
    
    xhr.open("GET", url, true);
    xhr.responseType = "document"; //csv, json

    xhr.onload = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            let response = xhr.responseXML;
            siteData = response;
            getAllUrls(response);
            // goToFilteredSearch("https://cors-anywhere.herokuapp.com/"+ url);
        }
    }

    xhr.onerror = function(){
        console.error({
            status: xhr.status,
            statusText: xhr.statusText
        })
    }

    xhr.send();

}

function getAllUrls(doc){
    let urls = $(doc).find('a');
    let urlArr = [];

    for (let i = 0; i < urls.length; i++) {                                                             
        if(urls[i].getAttribute('href')) {
            if(urls[i].getAttribute('href').includes('?i=')){
                urlArr.push( urls[i].getAttribute('href') );
            }
        }
    }
    for(let i = 0; i < urlArr.length; i++){
        goToFilteredSearch('http://amazon.com'+urlArr[i], urlArr.length -1 )
    }
}
