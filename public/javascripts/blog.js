$(document).on("pagebeforecreate",blog_init);
$(document).on("pagecontainerbeforeshow",blog_page_load);

var _currentBlogID = null;

//// Utilidades
var pages = {};
function registerCreated(pageCreated){
  pages[pageCreated] = true;
}
function change_page(to) {
    $(":mobile-pagecontainer").pagecontainer("change", "#" + to);
}

function showLoading(){
    $.mobile.loading( 'show');
}
function hideLoading(){
    $.mobile.loading( 'hide');
}
