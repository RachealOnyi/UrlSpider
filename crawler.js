let fm, id, action, newUrl, newAction = [];

let amazon = 'https://amazon.com';



// 
let idxStop = 0;
function goToFilteredSearch(prevUrl, urlIdxLength){

    $('.preloader').addClass('show');
    $('.div').removeClass('show');


    var xhr = new XMLHttpRequest();

    // xhr.open("GET", url, true);
    xhr.open("GET", prevUrl, true);
    xhr.responseType = "document"; //csv, json

    xhr.onload = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            let response = xhr.responseXML;
            ul_input(response, urlIdxLength);
            idxStop++
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
// 
// HELPERS
function swichCaseForImpossibleUrl(prevUrl){
    
    switch (prevUrl) {
        case amazon:
            newUrl = prevUrl + '/s?k=n&ref=nb_sb_noss';
            break;
    
        default: 
            newUrl = prevUrl + action;
            break;
    }
}
function ifCaseForActionWithHttpAndNoSlash(action, newAction){
    action = $(fm).attr('action');

    if(action.split('')[0] === '/'){
        action = $(fm).attr('action');
    }else if(action.split('')[0] === 'h'){

        for(i = 3; i < (action.split('/').length); i++){
            newAction.push(action.split('/')[i]);
        }
        action = '/'+ newAction.join('/');
        
    }else{
        action = '/' + action;
    }
}

// const _STATE_OBJ = new Map;

let _state = {
    elements: [],
    elementsTags: [],
    mapElements: new Map(),
    elem: [],
    elemTags: []
}


function ul_input(dom, urlIdxLength) {
    if(!($(dom).find("ul input")[0])){
        console.log('couldnt find a UL element with INPUT as its children- returned: ' + $(dom).find("ul input")[0]);
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
        // inp_div_span = $(inp_par_par_par_par_par_par).prev()

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

        function push(element){
            _FILTERS_OBJ.filter_options.push($(element).text())
            }

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

        filter_name_options(_state.elem, _state.elemTags, _state.elements, _state.elementsTags, inp[item], inp_type, _FILTERS_OBJ)


    });
    
    setTimeout(() => {  

        _state = {
            elements: [],
            elementsTags: [],
            mapElements: new Map(),
            elem: [],
            elemTags: []
        }
    }, 2000);

    if(idxStop === urlIdxLength){
        ew.delete(undefined);

        setTimeout( () => {
            $('.div').addClass('show');
            $('.preloader').removeClass('show');
            download('site_filter.json', JSON.stringify(Object.fromEntries(ew)))
        }, 1000)
        
    }
}
// 
// DOWNLOAD
// 
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

// 
// FILTER HELPERS
// 

let lim = 0, lim2 = 0;
let ix = 0, idx = 0;
function checkEleIf_UL(inp, arr){

    arr.forEach((item, i) => {
            switch (!undefined) {
                case $(item).is('ul'):
                    // rewrite this case when ul has no prev sibling
                    arr.splice(arr.indexOf($(item)) - 1 , arr.length - arr.indexOf($(item)), $(item).prev())
                    // pushTo_stateElement($(item).prev());
                    if($($(item).prev()).length > 0){
                        let str = filterStrSpace($($(item).prev()).text().trim().replace(/\n/g, '')).join('');
                        let firstStr, lastStr;
                        let tagEle = $($(item).prev())[0];
                        if(_state.elem.length === 0){
                            _state.elem.push({[tagEle]: str})
                            makeTags(tagEle, _state.elemTags);
                            firstStr = filterStrSpace($($(item).prev()).text().trim().replace(/\n/g, '')).join('')
                        }else{                     
                            xol = _state.elem[_state.elem.length - 1][$($(item).prev())[0]] == filterStrSpace($($(arr[i]).prev()).text().trim().replace(/\n/g, '')).join('');
                            if(!xol){
                                _state.elem.push({[tagEle]: str})
                                makeTags(tagEle, _state.elemTags);
                            }
                            idx++;
                        }
                    }


                    break;
                case $(item).find('ul').length > 0:
                    break;
                default:

                    if($(item).length > 0){
                        let str2 = filterStrSpace($(item).text().trim().replace(/\n/g, '')).join('');
                        let firstStr2;
                        let tagEle2 = $(item)[0];
                        if(_state.elements.length === 0){
                            _state.elements.push({[tagEle2]: str2})
                            makeTags(tagEle2, _state.elementsTags);
                            firstStr2 = filterStrSpace($(item).text().trim().replace(/\n/g, '')).join('')
                        }else{                     
                            xol = _state.elements[_state.elements.length - 1][$(item)[0]] == filterStrSpace($(arr[i]).text().trim().replace(/\n/g, '')).join('');
                            if(!xol){
                                _state.elements.push({[tagEle2]: str2})
                                makeTags(tagEle2, _state.elementsTags);
                            }
                        }
                        setArrMap( _state.mapElements, tagEle2, str2)
                    }
                
                    break;
            }
        // }
    })
    

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
    if (!we){
        arr.push(tag);
    }
}

function removeDuplicates(arr) {
    uniqueArr = new Set(arr);
    return [...uniqueArr];
}

// FILTER LOGIC
// 
function filter_details_selected(input, input_type, obj, selectedOption){
            // FOR DETAILS  // FOR SELECTED
            switch (input_type) {
                case 'checkbox':
                    obj.details.type = 'checkbox';
                    input.checked ? obj.selected = selectedOption :  obj.selected = 'non selected';
                   break;
            
                default:
                    obj.details.type = 'text'
                    break;
            }
}


const ew = new Map();


function filter_name_options(name, nameTag, options, optionsTag, inp, inp_type, obj){
        for(let nam = 0; nam < nameTag.length ; nam++){

            if($(nameTag[nam]).next().is('ul')){
                const parent = $($(nameTag[nam]).next())[0];
                obj.filter_name = name[nam][nameTag[0]];
                obj.filter_options = new Set();
                
                for (let opt = 0; opt < optionsTag.length; opt++) {
                    filter_details_selected( inp, inp_type, obj, options[opt][optionsTag[opt]] );
        
                    const child = optionsTag[opt];
                    if (parent.compareDocumentPosition(child) & Node.DOCUMENT_POSITION_CONTAINED_BY) {

                        if(options[opt][optionsTag[opt]] !== ''){
                            obj.filter_options.add(options[opt][optionsTag[opt]])
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

