var ObjectId = require("mongodb").ObjectID;

function microblog_init(db){
  var usuarioColl = db.collection('Usuarios');
  var publicacionColl = db.collection('Publicaciones');
  var modeloBlogger = {};
  // funcion para agregar usuarios
  modeloBlogger.agregarUsuario = function(data, handler){
        usuarioColl.insert(data, function(err, doc){
          if(err){
            handler(err,null);
          }else{
            handler(null, doc);
          }
        });
    };

    // funcion para agregar publicaciones
    modeloBlogger.agregarPublicacion = function(data, handler){
          publicacionColl.insert(data, function(err, doc){
            if(err){
              handler(err,null);
            }else{
              handler(null, doc);
            }
          });
      };

  // funcion para obtener todas las usuarios registradas

  modeloBlogger.obtenerUsuarios = function(handler){
    usuarioColl.find({}).project({"Nombre":1}).sort([["Nombre",1]]).toArray(function(err, Usuarios){
      if(err){
        handler(err, null);
      }else{
        handler(null,Usuarios);
      }
    });
  }



  return modeloBlogger;

}





module.exports = microblog_init;
