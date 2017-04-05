$(document).on("pagebeforecreate",microblog_init);
$(document).on("pagecontainerbeforeshow",microblog_page_load);

var _currentMicroBlogID = null;

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

/// Funciones de la Aplicación

/// Cuando Inicia cada Página
function microblog_init(e){
  var pageToCreate = $(e.target).attr("id");
  registerCreated(pageToCreate);
  switch(pageToCreate){
    case "listUsers":
      $("#users_usuarios_list").on('vclick',"a",onLiClick);
      break;
    case "new":
      $("#btnCrearUsuario").on("vclick", onAddClick);
      break;
    case "publicar":
      $("#btnPublicar").on("vclick", onAddPost);
      break;
  }
}

//// Cuando se Carga y se Muestra cada Página
function microblog_page_load(e, ui){
  var pageLoading = $(ui.toPage[0]).attr("id");
//  console.log(pageLoading);

  switch(pageLoading){
    case "listUsers":
        cargar_microblog_users();
      break;
    case "new":
        limpiar_new_values();
      break;
    case "publicar":
        obtengaDatos();
    break;
  }

}



//Eventos de Página New

function onAddClick(e){
    var formValues = $("#new_form").serializeArray();
    var dataToSend = {};
    formValues.map(function(obj, i){
      dataToSend[obj.name] = obj.value;
    });

    showLoading();
    $.post(
      "/usuarios/add",
      dataToSend,
      onAddSuccess,
      'json'
    );
}

function onAddPost(e){
    var formValues = $("#post_form").serializeArray();
    var dataToSend = {};
    formValues.map(function(obj, i){
      dataToSend[obj.name] = obj.value;
    });

    showLoading();
    $.post(
      "/usuarios/addPost",
      dataToSend,
      onAddSuccess,
      'json'
    );
}

function onLiClick(e){
    _currentMicroBlogID= $(this).data('id');
}

function onAddSuccess(data, successTxt, xhrq){
  hideLoading();
  change_page("listUsers");
}

function limpiar_new_values(){
    $("#new_form").get()[0].reset();
}

// funciones de la pagina listUsers
function cargar_microblog_users(){
  $.get(
    'usuarios/',
    {},
    function(_microblog,successTxt, xhrq){
      console.log(_microblog);
      $htmlBuffer = _microblog.map(function(miblog, i){
        return '<li><a href="#publicar" data-id="'+miblog._id+'">'+miblog.Nombre+'</a></li>';
      });

      $("#users_usuarios_list").html($htmlBuffer.join('')).listview('refresh');
    },
    'json'
  );
}

// Funciones de la página publicar

function obtengaDatos(){
  $.get(
    "usuarios/get/" + _currentMicroBlogID,
    {},
    function onAddSuccess(data, sucessTxt, xhrq){
        console.log(data);
        $("#publicar_nombre").html(data.Usuario);

    } ,
    'json'
  );
}
