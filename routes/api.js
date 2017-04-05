var express = require('express');
var router = express.Router();
var BlogFabric = require('../models/demo.model.js');

function initRouter(db){
  var blogMdl = BlogFabric(db);
  console.log(blogMdl);

  router.get('/', function(req, res, next) {
    blogMdl.obtenerUsuarios(function(err, Usuarios){
        if(err) return res.status(404).json({"error":"No se obtiene Datos"});
        return res.status(200).json(Usuarios);
    });
  }); // end /


    router.post('/add',function(req,res,next){
      var nuevoUsuario = {};
      nuevoUsuario.usuario = req.body.usuario;
      blogMdl.agregarUsuario(nuevoUsuario,function(err, UsuarioAgregado){
        if(err) return res.status(403).json({"error":"error al ingresar usuario."});
        return res.status(200).json(UsuarioAgregado);
      });

    }); // end /add

    router.post('/addPost',function(req,res,next){
      var nuevoPost = {};
      nuevoPost.postear = req.body.postear;
      blogMdl.agregarPublicacion(nuevoPost,function(err, PostAgregado){
        if(err) return res.status(403).json({"error":"error al ingresar publicacion."});
        return res.status(200).json(PostAgregado);
      });

    }); // end /add

  return router;
}


module.exports = initRouter;
