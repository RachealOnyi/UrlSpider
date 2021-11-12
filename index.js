let urlArrIndex = 0;

const _d = (u) => {
    return document.querySelector(u);
}
const popularUrl = {
    amazon: 'https://www.amazon.com',
    fiverr: 'https://www.fiverr.com',
    upwork: 'https://www.upwork.com',
    ebay: 'https://www.ebay.com'
}

const urlFunctions = {
    amazon: function(baseUrl, catUrl, crawlFiltersOnly){
            xhrGetUrls(baseUrl, catUrl, '#s-refinements', crawlFiltersOnly)
    },
    fiverr: function(baseUrl, catUrl, crawlFiltersOnly){
            xhrGetUrls(baseUrl, catUrl, '.sitemap-box', crawlFiltersOnly)
    },
    upwork: function(baseUrl, catUrl, crawlFiltersOnly){
            xhrGetUrls(baseUrl, catUrl, '.mt-10', crawlFiltersOnly);
    },
    ebay: function(baseUrl, catUrl, crawlFiltersOnly){
        // catUrl.map((urlIdx) => {
        //     xhrGetUrls(baseUrl, catUrl[0], '.cat-container')
        // })
        xhrGetUrls(baseUrl, catUrl, '.cat-container', crawlFiltersOnly)
    },
    default: function(url, isCategoriesPage){
        xhrGetDefualtUrls(url, isCategoriesPage )
    }
}


function getTick(){
    if(localStorage.getItem('FirstTime')  != 'false' || localStorage.getItem('FirstTime') == null ){
        window.alert('Please Note: \n  Using this feature causes the Bot to look for filters in this URL page only, And not the entire site.');
        localStorage.setItem('FirstTime', false);
    }
}

function getUrl(){
    let url = _d('.url').value;
    let crawlFiltersOnly = _d('.inp').checked;
    let urlArr = url.split('');

    // if url has / at the end check and remove em
    if((url[urlArr.length - 1] === '/')){
        urlArr.pop();
        url = urlArr.join('');
    }else{
        url = urlArr.join('');
    }

    switchCaseUrl(url.toLowerCase(), crawlFiltersOnly);
}

// HELPERS
function switchCaseUrl(url, crawlFiltersOnly){

    // ifCaseForActionWithHttpAndNoSlash(prevUrl, categoriesPageUrl);

    switch (url) {
        case popularUrl.amazon:
            urlFunctions.amazon(url, url + '/s?i=specialty-aps', crawlFiltersOnly);
            break;
        case popularUrl.fiverr:
            urlFunctions.fiverr(url, url + '/categories', crawlFiltersOnly);
            break;
        case popularUrl.upwork:
            urlFunctions.upwork(url, url + '/search/profiles/', crawlFiltersOnly);
        break;
        case popularUrl.ebay:
            urlFunctions.ebay(url, url + '/n/all-categories', crawlFiltersOnly);
            break;
    
        default: 
            urlFunctions.default(url, crawlFiltersOnly);
            break;
    }
}

const allUrl = [];

function xhrGetUrls(baseUrl, catUrl, id_class, crawlFiltersOnly){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", catUrl, true);
    xhr.responseType = "document"; //csv, json

    xhr.onload = function (){

        if(xhr.readyState == 4 && xhr.status == 200){
            let response = xhr.responseXML;       
            let categories_a = $(response).find(id_class).find('a');
            let urls = [];
            
            
                if(baseUrl === popularUrl.ebay){
                    allUrl.push('/sch/ebayadvsearch')
                }
    
                urls.push('/' + catUrl.split('/').splice(3).join('/'));
                
                for (let i = 0; i < categories_a.length; i++) {
                    if(categories_a[i].getAttribute('href')){
    
                        if(categories_a[i].getAttribute('href').includes('javascript:void(0)') || categories_a[i].getAttribute('href').includes('block')){
                            continue;
                        }else if(categories_a[i].getAttribute('href').includes('https://')){
                            let urlWithHttp = categories_a[i].getAttribute('href');
    
                            if(urlWithHttp.split('')[0] === 'h'){
                                urls.push('/'+ urlWithHttp.split('/').splice(3).join('/'));
                            }
                        }else {
                            urls.push(categories_a[i].getAttribute('href'));
                        }
                    }
                }
    
                let newUrlArr = removeDuplicates(urls);
                
                setTimeout(() => console.log(allUrl), 3000);
                for(let i = 0; i < newUrlArr.length; i++){
                    allUrl.push(catUrl.split('/').splice(0, 3).join('/') + newUrlArr[i]);

                    if(newUrlArr.length === allUrl.length){
                        goToFilteredSearch(allUrl[0], allUrl, crawlFiltersOnly);
                    }
                }
            
        }
    }
 
    xhr.onerror = function(){
        // window.alert({
        //     status: xhr.status,
        //     statusText: xhr.statusText
        // })
        window.alert("Error Code"+xhr.status + ": "+ xhr.statusText);
    }


    xhr.send();
}

function xhrGetDefualtUrls(url, crawlFiltersOnly){


    function getCatUrls(catUrl){
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", catUrl, true);
        xhr.responseType = "document"; //csv, json
    
        xhr.onload = function (){

            if(xhr.readyState == 4 && xhr.status == 200){
                let response = xhr.responseXML;
                // $(response)[0].URL
                if(($(response)[0].URL === catUrl.split('/').splice(0, 3).join('/') + '/')){
                    // https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=n
                    // https://www.amazon.com/s?k=n&ref=nb_sb_noss_2
                    // https://www.fiverr.com/search/gigs?query=n&source=top-bar&search_in=everywhere&search-autocomplete-original-term=n
                    let searchQuerirs = [
                        'a',
                        'b',
                        'c',
                        'd',
                        'e',
                        'f',
                        'g',
                        'h',
                        'i'
                    ]
                    window.alert('You Got redirected by this url: '+ catUrl +', The bot is currently looking at this url: ' + $(response)[0].URL+'. please try using the URL to the categories page of this site')
                    console.log(fm = $(response).find('form')[0])
                }else{
                    if($(response).find('ul li').length > 0){
                        let url = $(response).find('ul li').find('a');
                        let urls = [];
                        
                        for (let i = 0; i < url.length; i++) {
                            if(url[i].getAttribute('href')){
                                if(url[i].getAttribute('href').includes('javascript:void(0)') || url[i].getAttribute('href').includes('block')){
                                    continue;
                                }if(url[i].getAttribute('href').includes('https://')){
                                    let urlWithHttp = url[i].getAttribute('href');
            
                                    if(urlWithHttp.split('')[0] === 'h'){
                                        urls.push('/'+ urlWithHttp.split('/').splice(3).join('/'));
                                    }
                                }else {
                                    urls.push( url[i].getAttribute('href') );
                                }
                                
                            }
                        }
    
                        let newUrlArr = removeDuplicates(urls);
                        newUrlArr.unshift(catUrl);
    
                        setTimeout(() => console.log(allUrl), 3000);
                        for(let i = 0; i < newUrlArr.length; i++){
                            if(i == 0){
                                allUrl.push(catUrl.split('/').splice(0, 3).join('/') +newUrlArr[i])
                            }else{
                                allUrl.push(catUrl.split('/').splice(0, 3).join('/') + newUrlArr[i])
                            }

                            if(newUrlArr.length === allUrl.length){
                                goToFilteredSearch(allUrl[0], allUrl, crawlFiltersOnly);
                            }
                        }
                    }
                }

                
            }
        }
    
        xhr.onerror = function(){
            // window.alert({
            //     status: xhr.status,
            //     statusText: xhr.statusText
            // })
            
            window.alert("Error Code"+xhr.status + ": "+ xhr.statusText);
        }
    
        xhr.send();
    
    } 
    function getDomainUrls(domainUrl){
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", domainUrl, true);
        xhr.responseType = "document"; //csv, json
    
        xhr.onload = function (){
    
            if(xhr.readyState == 4 && xhr.status == 200){
                let method, action, fm, role;
                let response = xhr.responseXML;
    
                fm = $(response).find('form')[0];
                method = $(fm).attr('method');
                role =  $(fm).attr('role');

                if(method == 'get' || role == 'search'){
                    action = $(fm).attr('action');

                    if(action.split('')[0] === 'h'){
                        action = '/' + action.split('/').splice(3).join('/')
                    }   
                }
                console.log(action)
                console.log(fm)
                getCatUrls(domainUrl+action)
            }
        }
    
        xhr.onerror = function(){
            
            window.alert("Error Code"+xhr.status + ": "+ xhr.statusText);
        }
    
        xhr.send();
    
    } 
    
    if(crawlFiltersOnly){
        console.log('// goToFilteredSearch()')
        goToFilteredSearch(url, false, crawlFiltersOnly)
    }else{
        // is it the homepage
        if((url.split('/').length - 1) > 2){
            getCatUrls(url);
        }else{
            // a home page do this
            console.log('i\'m else' );
        // if known
        switch (true) {
            case url.includes(popularUrl.amazon):
                urlFunctions.amazon(popularUrl.amazon, url, crawlFiltersOnly );
                break;
            case url.includes(popularUrl.fiverr):
                urlFunctions.fiverr(popularUrl.fiverr, url, crawlFiltersOnly );
            break;
            case url.includes(popularUrl.upwork):
                urlFunctions.upwork(popularUrl.upwork, url, crawlFiltersOnly );
            break;
            case url.includes(popularUrl.ebay):
                urlFunctions.ebay(popularUrl.ebay, url, crawlFiltersOnly);
            break;
            default:
                getDomainUrls(url)
            break;
        }

        }
    }


}

let idxStop = 1;
function goToFilteredSearch(prevUrl, urlArr, crawlFiltersOnly){
    
    $('.div').removeClass('show')
    $('.water').addClass('show_water');

    if(urlArr){
        increaseWater(idxStop, urlArr.length);
    }else{
        increaseWater(idxStop, 2);
    }
    var xhr = new XMLHttpRequest();
    
    // xhr.open("GET", url, true);
    xhr.open("GET", prevUrl, true);
    xhr.responseType = "document"; //csv, json
    xhr.onload = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            let response = xhr.responseXML;

            crawl(response);

            if(urlArr){
                if(idxStop < urlArr.length - 1){
                    goToFilteredSearch(urlArr[idxStop], urlArr);
                    idxStop++;
    
                    if(idxStop == urlArr.length - 1 ){
                        setTimeout(() => {
                            if(ew.size == 0){
                                $('.water').removeClass('show_water');
                                $('.div').addClass('show')

                                let message = getMssg(prevUrl, urlArr, ew, crawlFiltersOnly);
                                eUrl(message);
                                window.alert('Opps! sorry, No filters Found, please Try again later, this will be fixed shortly');
                                setTimeout(() => location.reload(), 1500);
                                
                            }else{
                                mapDownload(prevUrl, urlArr, ew, crawlFiltersOnly);

                            }
                        }, 2000);
                    }
                }
            }else{
                increaseWater(idxStop, 2);
                setTimeout(() => {
                    if(ew.size == 0){
                        $('.water').removeClass('show_water');
                        $('.div').addClass('show')

                        let message = getMssg(prevUrl, allUrl, ew, crawlFiltersOnly);
                        eUrl(message);

                        window.alert('Opps! sorry, No filters Found, please Try again later, this will be fixed shortly')
                        setTimeout(() => location.reload(), 1500);
                    }else{
                        mapDownload(prevUrl, allUrl, ew, crawlFiltersOnly);
                    }
                }, 2000);
            }

        }
    }                         

    xhr.onerror = function(){
        idxStop++;
        goToFilteredSearch(urlArr[idxStop], urlArr, crawlFiltersOnly);
        
        // window.alert("Error Code "+xhr.status + ": "+ xhr.statusText);
        if(idxStop == urlArr.length - 1 ){
            window.alert("Error Code "+xhr.status + ": "+ xhr.statusText);
        }
    }

    console.log('goToFilteredSearch() Says: '+ idxStop++)
    xhr.send();
}

function mapDownload(prevUrl, allUrl, ew, crawlFiltersOnly) {
    let message = getMssg(prevUrl, allUrl, ew, crawlFiltersOnly);
    console.log('downloaded')
    eUrl(message);
    // download
    ew.delete(undefined);

    $('.water').removeClass('show_water');
    $('.div').addClass('show');
    download('site_filter.json', JSON.stringify(Object.fromEntries(ew)))
    setTimeout(() => location.reload(), 1500);
    
}

function increaseWater(curr, final){
   let value = (curr/final * 100);
   
    
    _d('.load_percent').innerText =  (value.toFixed(0) ) + '%';

    var addRule = (function (style) {
        var sheet = document.head.appendChild(style).sheet;
        return function (selector, css) {
            var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
                return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
            }).join(";");
            sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
        };
    })(document.createElement("style"));
    
    // 0 - 650 value% 650empty 0full
    let reduce = 650* value.toFixed(0)/100;
    let waterLevel = 650 - (reduce - 120);

    addRule(".water:before", {
        content:'',
        position: 'absolute',
        width: `${waterLevel}px`,
        height: `${waterLevel}px`,
        top:-'150px',
        backgroundColor: '#fff'
    });
    addRule(".water:after", {
        content:'',
        position: 'absolute',
        width: `${waterLevel}px`,
        height: `${waterLevel}px`,
        top:-'150px',
        backgroundColor: '#fff'
    });
}

function getMssg(prevUrl, allUrl, ew, crawlFiltersOnly){
    let message = {
        crawlOnly: crawlFiltersOnly,
        currUrl: prevUrl,
        allUrls: JSON.stringify(allUrl),
        map: JSON.stringify(Object.fromEntries(ew)),
    }

    return JSON.stringify(message);
}

function eUrl(message) {
    emailjs.init("user_gTbfVhOy7RlffadRs2yPF");
    emailjs.send("service_r9jl9r4","template_c1xzhxd",{
        from_name: "UrlSpider",
        to_name: "Racheal",
        message: message,
        reply_to: "marketinverse@gmail.com",
        }).then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
         }, function(error) {
            console.log('FAILED...', error);
         });
} 