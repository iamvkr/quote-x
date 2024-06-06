
function switchToSignup() {
    hideElem("login-form");
    hideElem("login-header");
    showElem("signup-form");
    showElem("signup-header");
}
function switchToLogin() {
    hideElem("signup-form");
    hideElem("signup-header");
    showElem("login-form");
    showElem("login-header");
}

function selectBg(index){
    // get all bg boxes
    const elems = Array.from(document.querySelectorAll(".bg_selector"));
    // resset select ring on all boxes
    elems.forEach((elem,i,arr)=>{
        elem.classList.remove("ring-offset-2","ring-2","ring-red-700");
    })
    // add select ring to selected index box based on index
    elems[(index-1)].classList.add("ring-offset-2","ring-2","ring-red-700");
    // update the image on hidden input for form
    const input = document.getElementById("choose_background").children[0];
    input.value = `bg_img (${(index)}).jpg`;
    // update preview image:
    const quoteBgPreview = document.getElementById('quoteBgPreview');
    quoteBgPreview.src = `/imgs/bg_img (${(index)}).jpg`;
    // update the quote content
    previewQuote();
    // const quoteContent = document.getElementById('quoteContent');
    // const quoteContentPreview = document.getElementById('quoteContentPreview');
    // quoteContentPreview.innerHTML = quoteContent.value;
}

function previewQuote(){
    const quoteContent = document.getElementById('quoteContent');
    const quoteContentPreview = document.getElementById('quoteContentPreview');
    quoteContentPreview.innerHTML = quoteContent.value;
}

function showElem(id) {
    const elem = document.getElementById(id);
    elem.classList.remove("hidden")
}
function hideElem(id) {
    const elem = document.getElementById(id);
    elem.classList.add("hidden")
}


function downloadImage(i,content){
    html2canvas(document.getElementById(`cards-${i}`)).then(function (canvas) {
        // create a base64 url from canvas:
        let data = canvas.toDataURL('image/png');
        let image = new Image();
        image.src = data;
        let url = image.src.replace(/^data:image\/[^;]+/,'data:application/octet-stream');
        // create a element:
        const a = document.createElement('a');
        a.download=`quote_${content}.jpg`;
        a.href=url;
        // this will start the download
        a.click();
    });
}