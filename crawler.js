
// MORE LOGIC TO IMPLEMENT

// USE THE SITE JSON API FIRST: if the site allows it, and query the filters.


/**
 remove https://www. or after url.contains(dedicatedURLS)
 */


// ul with li > a and heading div for title. go up 5X from a(option) to look for Heading. 
// div with input as its child. from input, go up 5x to find header.
// div with ul > li > a, go up 5x from a and stop
// div with select. check select aria-label for headeing, then go up 5x up the DOM
//
// make queries for top sites style for making filters.
// Amazon 2ways === https://www.amazon.com/s?i=specialty-aps
    // with ul > input ~> Done
    // with div ul > a ~> Done
    // magazine & subs 3 actually
// Fiver ~> Done === https://www.fiverr.com/categories
// Upwork ~> Done: not yet dynamic === https://www.upwork.com/search/profiles/
// Ebay  === https://www.ebay.com/sch/ebayadvsearch && https://www.ebay.com/n/all-categories
    // 2 filters
    // 1 ~> Done
    // 2: filter is on search page ~> s
// Aliexpress === https://www.aliexpress.com/all-wholesale-products.html
// alibaba.com === https://www.alibaba.com/Products
//  target.com 
// Walmart
// https://www.costco.com/
// craigslist.org 
// Elementor Plugin Way for Filter : on Wordpress sites
// WIX Way : for Wix sites
// Gutenberg plugin Way: on wordpress sites
// React way ~> based on the developer, the above should work
// rakuten.co.jp 
// ebay.de 
// etsy.com 
// taobao.com 
// avito.ru 
// mercadolivre.com.br 
// ladybilloniers.com
// pinduoduo.com 
//  trendyol.com 
// allegro.pl 
// wildberries.ru 
//  flipkart.com 
//  amazon.fr 
// jd.com 
// amazon.ca 
//  mercadolibre.com.ar 
// amazon.es 
//  ebay-kleinanzeigen.de 
// mercadolibre.com.mx 
// tokopedia.com 
//  leboncoin.fr 
// market.yandex.ru 
// sahibinden.com
// shopee.co.id
//  mercari.com
// ozon.ru
// hepsiburada.com
// olx.com.br
// kakaku.com
// olx.pl
// tmall.com
// wayfair.com


// Global object filter
// 
// (window.AmazonUIPageJS ? AmazonUIPageJS : P).load.js('https://images-na.ssl-images-amazon.com/images/I/51HQX4OO9KL.js?AUIClients/A2SCommonAssets');
let _state = {
    elements: [],
    elementsTags: [],
    mapElements: new Map(),
    elem: [],
    elemTags: []
}


// 
// FIND ELEMENT WITH FILTER IN PAGE
// 
function crawl(dom){
    // worst > better
    div_ul_li(dom);
    ul_input(dom)
    fiverr(dom); 
    upwork(dom);
    ebay(dom)
    Aliexpress(dom)
}
// Function Max Dept = 5
function ul_input(dom) {

    if(!($(dom).find("ul input")[0])){
        console.log('Could\'nt find a UL element with INPUT as it\'s children  ~> returned: ' + $(dom).find("ul input")[0]);
        //  callNextChecker(dom) on those urls.
    }
    
    $($(dom).find("ul input")).each((item) => {
        const _FILTERS_OBJ = {
            filter_name: 'topic', 
            filter_options: [], 
            details: {type: ''}, 
            selected: 'no selection'
        }
        
        inp = $(dom).find("ul input");
        inp_type = $(inp[item]).attr('type');
        inp_par = $(inp[item]).parent();
        inp_par_par = $(inp_par).parent();
        inp_par_par_par = $(inp_par_par).parent();
        inp_par_par_par_par = $(inp_par_par_par).parent();
        inp_par_par_par_par_par = $(inp_par_par_par_par).parent();
        inp_par_par_par_par_par_par = $(inp_par_par_par_par_par).parent();
        inp_par_par_par_par_par_par_par = $(inp_par_par_par_par_par_par).parent();
        inp_par_par_par_par_par_par_par_par = $(inp_par_par_par_par_par_par_par).parent();

        checkEleIf_UL( inp, [
            inp_par,
            inp_par_par,
            inp_par_par_par,
            inp_par_par_par_par,
            inp_par_par_par_par_par,
            inp_par_par_par_par_par_par,
            inp_par_par_par_par_par_par_par,
            inp_par_par_par_par_par_par_par_par
        ]);

        // by aria-label

        // by class of label //by parent.span //by parent.label //by parent

        filter_name_options(_state.elem, _state.elemTags, _state.elements, _state.elementsTags, inp[item], inp_type, _FILTERS_OBJ)
        
    });
    
    setTimeout(() => {  

        // check to see if moving this code to download setTimeout if it will cause bug;
        // find a better way to clear application state
        // _state = {
        //     elements: [],
        //     elementsTags: [],
        //     mapElements: new Map(),
        //     elem: [],
        //     elemTags: []
        // }
    }, 2000);
    
    
}
function fiverr(dom) {
    if(!($(dom).find("._2g7EPin input")[0])){
        console.log('Could\'nt find a ._2g7EPin class with INPUT as it\'s children  ~> returned: ' + $(dom).find("ul input")[0]);
        //  callNextChecker(dom) on those urls. 
    }

    $($(dom).find("._2g7EPin input")).each((item) => {

        
        inp = $(dom).find("._2g7EPin input");
        inp_type = $(inp[item]).attr('type');
        inp_par = $(inp[item]).parent();
        inp_par_par = $(inp_par).parent();
        inp_par_par_par = $(inp_par_par).parent();
        inp_par_par_par_par = $(inp_par_par_par).parent();
        inp_par_par_par_par_par = $(inp_par_par_par_par).parent();
        inp_par_par_par_par_par_par = $(inp_par_par_par_par_par).parent();
        inp_par_par_par_par_par_par_par = $(inp_par_par_par_par_par_par).parent();
        inp_par_par_par_par_par_par_par_par = $(inp_par_par_par_par_par_par_par).parent();
        // console.log(inp) //.checkbox-list

        // $( "#foo" ).on( "click", function() {
        //     alert( $( this ).text() );
        //   });
        //   $( "#foo" ).trigger( "click" );

        let div = [
            inp,
            inp_type,
            inp_par,
            inp_par_par,
            inp_par_par_par,
            inp_par_par_par_par,
            inp_par_par_par_par_par,
            inp_par_par_par_par_par_par,
            inp_par_par_par_par_par_par_par,
            inp_par_par_par_par_par_par_par_par,
        ];

        div.forEach((items) => {

            if($(items).text() != '' && !($(items).text().length > 30) ){
                let str = filterStrSpace($(items).text().trim().replace(/\n/g, '').replace(/\t/g, '')).join('');
                ew.set(str, {'options': str, 'type': $($(items).find('input')).attr('type'), 'selected': $(items).find('input')[0].checked})
            }else if($(items).find('.menu-title')){
                $(items).find('.menu-title').each((itm) => {
                    let str = $($(items).find('.menu-title')[itm]).text();
                    ew.set(str, {'options': 'not available: option ELEMENTS loaded by javascript', 'type': 'floating', 'selected': 'non selected'})
                })
            }
        });
    })

    

}
function div_ul_li(dom){
    //
    if(!($(dom).find("div ul")[0])){
        console.log('Could\'nt find a DIV element with UL > LI as it\'s children  ~> returned: ' + $(dom).find("ul input")[0]);
        //  callNextChecker(dom) on those urls. 
        // fiverr(dom, urlIdxLength, idxStop);
    }
    
    $($(dom).find("div ul")).each((item) => {
        
        inp = $(dom).find("div ul");
        inp_par = $(inp[item]).parent();
        inp_par_par = $(inp_par).parent();
        inp_par_par_par = $(inp_par_par).parent();
        inp_par_par_par_par = $(inp_par_par_par).parent();
        inp_par_par_par_par_par = $(inp_par_par_par_par).parent();
        inp_par_par_par_par_par_par = $(inp_par_par_par_par_par).parent();
        inp_par_par_par_par_par_par_par = $(inp_par_par_par_par_par_par).parent();
        inp_par_par_par_par_par_par_par_par = $(inp_par_par_par_par_par_par_par).parent();

        let div_ul_li = [
            inp,
            inp_par,
            inp_par_par,
            inp_par_par_par,
            inp_par_par_par_par,
            inp_par_par_par_par_par,
            inp_par_par_par_par_par_par,
            inp_par_par_par_par_par_par_par,
            inp_par_par_par_par_par_par_par_par
        ];


        $(dom).find('#s-refinements div').find('span.a-size-base.a-color-base.a-text-bold').each((span) => {
            let tag, options = new Set(), selected;

            tag = $($(dom).find('#s-refinements div').find('span.a-size-base.a-color-base.a-text-bold')[span]).text().trim().replace(/\n/g, '').replace(/\t/g, '').trim();
            selected = 'non selected';

            $($(dom).find('#s-refinements div').find('span.a-size-base.a-color-base.a-text-bold')[span]).parent().next().find('li').each((li) => {
                // console.log($($($(dom).find('#s-refinements div.a-size-base.a-color-base.a-text-bold')[div]).parent().next().find('li')[li]).text().replace(/\n/g, '').replace(/\t/g, '').trim())
                options.add(filterStrSpace($($($(dom).find('#s-refinements div').find('span.a-size-base.a-color-base.a-text-bold')[span]).parent().next().find('li')[li]).text().replace(/\n/g, '').replace(/\t/g, '').trim()).join(''));
                setArrMap(ew, tag, {'options': [...options], 'type': 'link', 'selected': selected} )
            })


        })


        div_ul_li.forEach((items) => {

            if($(items).find('div ul')){
                
                $($(items).find('h3')).each((h3) => {
                    if($($(items).find('h3')[h3]).next().is('ul')){
                        // console.log($($(items).find('h3')[h3]).text())
                        let key = $($(items).find('h3')[h3]).text();
                        let options = new Set();
                        $($(items).find('h3')[h3]).next().find('li').each((li) => {
                            // console.log( key + ' - ' + $($($(items).find('h3')[h3]).next().find('li')[li]).text() )
                            options.add($($($(items).find('h3')[h3]).next().find('li')[li]).text())
                            // ew.set(key, {'options': [...options], 'type': 'link', 'selected': 'non selected'})
                            
                            setArrMap(ew, key, {'options': [...options], 'type': 'link', 'selected': 'non selected'} )
                        })
                    }

                })




            }
        })



        $(dom).find('#s-refinements ul').each((ul) => {
            let tag, options = new Set(), selected;

            tag = $(dom).find('#s-refinements ul').find('.apb-browse-refinements-indent-2').parent().prev().text().replace(/\n/g, '').replace(/\t/g, '').trim();

            if($(dom).find('#s-refinements ul').find('.apb-browse-refinements-indent-1').length > 0){
                selected = $($(dom).find('#s-refinements ul').find('.apb-browse-refinements-indent-1')[0]).text().replace(/\n/g, '').replace(/\t/g, '').trim();
                options.add(selected);
            }else{
                selected = 'non selected';
            }


            $($(dom).find('#s-refinements ul')[ul]).find('.apb-browse-refinements-indent-2').each((li) => {
                options.add($($($(dom).find('#s-refinements ul')[ul]).find('.apb-browse-refinements-indent-2')[li]).text().replace(/\n/g, '').replace(/\t/g, '').trim());
                setArrMap(ew, tag, {'options': [...options], 'type': 'link', 'selected': selected} )
            })


        })
        






        // by aria-label

        // by class of label //by parent.span //by parent.label //by parent

        // console.log(_FILTERS_OBJ)

    });
    
    setTimeout(() => {  

        // check to see if moving this code to download setTimeout if it will cause bug;
        // find a better way to clear application state
        // _state = {
        //     elements: [],
        //     elementsTags: [],
        //     mapElements: new Map(),
        //     elem: [],
        //     elemTags: []
        // }
        // console.log(Object.fromEntries(_FILTER_ARR));
    }, 2000);
    
    // console.log(ew)
    
}
function upwork(dom){

    //div label and next() with decendant 
    // // div_ul_li(dom, urlIdxLength, idxStop);
    // console.log($(dom).find('.up-c-collapse'))
    if($(dom).find('.up-c-collapse').length > 0){
        $(dom).find('.up-c-collapse').each((div) => {

            let tag = $($(dom).find('.up-c-collapse')[div]).prev().text();

            if( $($(dom).find('.up-c-collapse')[div]).find('li>button').length > 0 ){

            }else if($($(dom).find('.up-c-collapse')[div]).find('input').length > 0){

                if($($(dom).find('.up-c-collapse')[div]).find('input').next()[0].childNodes[0].textContent == ''){

                    let  type, value, options = new Set;

                    $($(dom).find('.up-c-collapse')[div]).find('input').each((input) => {

                        if($($($(dom).find('.up-c-collapse')[div]).find('input')[input])[0].type !== 'hidden'){
                            type = $($($(dom).find('.up-c-collapse')[div]).find('input')[input])[0].type;
                        }
                        option = $($($(dom).find('.up-c-collapse')[div]).find('input')[input]).next().next().text();

                        if($($($(dom).find('.up-c-collapse')[div]).find('input')[input])[0].checked){
                            value = $($($(dom).find('.up-c-collapse')[div]).find('input')[input]).next().next().text();
                        }
                        options.add( option );
                        
                    })

                    // ew.set(tag, {'options': [...options], 'type': type, 'selected': value})
                    setArrMap(ew, tag, {'options': [...options], 'type': type, 'selected': value} )
                }
            }
         })
    }else{
        // write a better dynamic code later
        $(dom).find('div ul>li>button').each((btn) => {
            console.log($($(dom).find('ul li>button')[btn]).text())   
        })
    }   
    

}
function ebay(dom){
    console.log('ebay')
    
}
function Aliexpress(dom){
    console.log(' aliExpress')
}

// 
// CHECKERS
//  

let lim = 0, lim2 = 0;
let ix = 0, idx = 0;
function checkEleIf_UL(inp, arr){

    arr.forEach((item, i) => {
            // console.log(item)
            switch (!undefined) {
                case $(item).is('ul'):
                    // rewrite this case when ul has no prev sibling
                    arr.splice(arr.indexOf($(item)) - 1 , arr.length - arr.indexOf($(item)), $(item).prev())
                    // pushTo_stateElement($(item).prev());
                    if($($(item).prev()).length > 0){
                        let str = filterStrSpace($($(item).prev()).text().trim().replace(/\n/g, '').replace(/\t/g, '')).join('');
                        let firstStr;
                        let tagEle = $($(item).prev())[0];
                        if(_state.elem.length === 0){
                            _state.elem.push({[tagEle]: str})
                            makeTags(tagEle, _state.elemTags);
                            firstStr = filterStrSpace($($(item).prev()).text().trim().replace(/\n/g, '')).join('')
                        }else{                     
                            xol = _state.elem[_state.elem.length - 1][$($(item).prev())[0]] == filterStrSpace($($(arr[i]).prev()).text().trim().replace(/\n/g, '').replace(/\t/g, '')).join('');
                            if(!xol){
                                _state.elem.push({[tagEle]: str})
                                makeTags(tagEle, _state.elemTags);
                            }
                            idx++;
                        }
                    }


                    // makeTags(arr);
                    break;
                case $(item).find('ul').length > 0:
                    // console.log('greater than ul')
                    break;
                default:

                    if($(item).length > 0){
                        let str2 = filterStrSpace($(item).text().trim().replace(/\n/g, '').replace(/\t/g, '')).join('');
                        let firstStr2;
                        let tagEle2 = $(item)[0];
                        if(_state.elements.length === 0){
                            _state.elements.push({[tagEle2]: str2})
                            makeTags(tagEle2, _state.elementsTags);
                            firstStr2 = filterStrSpace($(item).text().trim().replace(/\n/g, '')).join('')
                        }else{                     
                            xol = _state.elements[_state.elements.length - 1][$(item)[0]] == filterStrSpace($(arr[i]).text().trim().replace(/\n/g, '').replace(/\t/g, '')).join('');
                            if(!xol){
                                _state.elements.push({[tagEle2]: str2})
                                makeTags(tagEle2, _state.elementsTags);
                            }
                        }
                        setArrMap( _state.mapElements, tagEle2, str2)
                    }
                    
                    // pushTo_stateElement(item);
                    // makeTags(item);
                    break;
            }
    })

}


// 
// FILTER HELPERS
// 

// DOWNLOAD
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function filterStrSpace(str){
    let space = 0;
    return str.split('').map((item) => {
        if(item === ' '){
            space++;
        }else{
            space = 0;
        }
        if(space < 2){
            // return item.join('');
            return item;
        }
    })
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
 }

function setArrMap(arrMap, value, pairs){

    arrMap.set(value, pairs)
}

let we = 0;
function makeTags(tag, arr){
    // check this function when there's reception !we
    if (!we){
        arr.push(tag);

    //     arr.map((item) => {
    //         // console.log(item[0])
    //         _state.tags.push(item[0]);
    //     })
    //     we++;
    }
} 

function removeDuplicates(arr) {
    uniqueArr = new Set(arr);
    return [...uniqueArr];
}

// FILTER LOGIC
// more filter logic can be added
function filter_details_selected(input, input_type, obj, selectedOption){
            // FOR DETAILS  // FOR SELECTED
            switch (input_type) {
                case 'checkbox':
                    obj.details.type = 'checkbox';
                    input.checked ? obj.selected = selectedOption :  obj.selected = 'non selected';
                    // (input.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_PRECEDING)
                    // input.checked ? console.log([input, input.checked, selectedOption]) : null
                    break;
            
                default:
                    obj.details.type = 'text'
                    break;
            }
}

const ew = new Map();
function filter_name_options(name, nameTag, options, optionsTag, inp, inp_type, obj){
            
        
        if(nameTag.length > 0){
            for(let nam = 0; nam < nameTag.length ; nam++){
                if($(nameTag[nam]).next().is('ul')){
    
                    const parent = $($(nameTag[nam]).next())[0];
                    obj.filter_name = name[nam][nameTag[0]];
                    obj.filter_options = new Set();
                    
                    for (let opt = 0; opt < optionsTag.length; opt++) {
            
                        const child = optionsTag[opt];
                        if (parent.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    
                            if(options[opt][optionsTag[opt]] !== ''){
                                // add filter options
                                obj.filter_options.add(options[opt][optionsTag[opt]])
                                filter_details_selected( inp, inp_type, obj, options[opt][optionsTag[opt]] );
    
                                ew.set(obj.filter_name, {'options': [...obj.filter_options], 'type': obj.details, 'selected': obj.selected})
                            }
    
                            // console.log([name[0][nameTag[0]], 'Well-formed document', options[opt][optionsTag[opt]] ]);
                            } else {
                            // console.error([parent, '<parent> is not an ancestor of <child>', optionsTag[opt] ]);
                        }
                    }
                }
    
            }
        }
        
}










// CODE REFERENCE AND OBSOLETE CODES
function pushTo_stateElement(element){
    let tagname;
    if($(element).length === 0){
        return;
    }
    tagname = $(element)[0];
    
    eleStr = $(element).text().trim().replace(/\n/g, '');
    // .contents().filter(function() {
    //   return $(element).contents()[0]//.nodeType === 3;
    // })
    //.trim().replace(/\n/g, '').trim().replace(/\n/g, '');
    if(filterStrSpace(eleStr).join('').length > 40 ){
        return;
    }
    _state.elements.push({[tagname]: filterStrSpace(eleStr).join('')});
    
    // makeArrMap(_state.elements, _state.mapElements)

    pushTo_stateNewElements(tagname)
}

function pushTo_stateNewElements(tagname){

    // WHEN YOU REMOVE DUPLICATES AND EMPTY VALUES '' YOU ARE LEFT WITH ONLY ONE NAME VALUE
    // PAIRS OF ELEMENT: 'STRING'
    // if 2 element.node has same value remove one
    // (element.node === '') || (element.[node] === element.[node])
    
    _state.elements.map((item, i) => {

        if(item[tagname] === undefined || item[tagname] === '' ){
            return;
        }
        // console.log(item);

        // console.log()
        setArrMap( _state.mapElements, getKeyByValue(item, item[tagname] ), item[tagname])
        
    })
    // console.log(removeSimilarFrmArr(_state.elem));
}
// was in $(dom).find('ul input')
function log(element) {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if($(element).text() === ''){
        console.log('contains space');
        return
    }if(format.test($(element).text())){
        // console.log('contains a character');
        // return;
    }if(/\n/.exec($(element).text() )){
        console.log('contains an escape character');

    }
    console.log($(element).text());
}
