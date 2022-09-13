const fs = require('fs');
const tareas = require('./tareas.json');
const colors = require('colors');

const guardarJSON = (tareas) => {
   fs.writeFileSync('./tareas.json', JSON.stringify(tareas,null,3));
   return null;
};

const mostrarTareas = (tareas) => {
   tareas.forEach((tarea, index) => {
      console.log(`${index+1} - ${tarea.titulo} - Estado: ${validarEstado(tarea)}`);
   });
   return null;
}

function validarEstado(tarea) {
   if (tarea.estado == 'terminada') {
      return tarea.estado.green;
   } else if (tarea.estado == 'en proceso') {
      return tarea.estado.blue;
   } else {
      return tarea.estado.red;
   }
}

module.exports = {
   listarTareas : () => {
      mostrarTareas(tareas)
      return null;
   },
   agregarTarea : (tarea) => {
      tareas.push(tarea);
      guardarJSON(tareas);
      return console.log('Tarea agregada!');
   },
   
   filtrarTareas : (estado) => {
      let estadosValidos = ['terminada', 'en proceso', 'pendiente'];
      if (!estadosValidos.includes(estado)) {
         return console.log('Comando incorrecto, los estados validos son -->', estadosValidos);
      }
      let tareasFiltradas = tareas.filter((tarea) => {
         return tarea.estado === estado;
      });
      mostrarTareas(tareasFiltradas);
      return null;
   },
   eliminarTarea : (titulo) => {
      let check = tareas.filter(tarea => tarea.titulo === titulo);
      if(check.length === 0){
         return console.log('Titulo inexistente!');
      }
      let tareasFiltradas = tareas.filter(tarea => {
         return tarea.titulo !== titulo;
      })
      guardarJSON(tareasFiltradas);
      return console.log('Tarea eliminada!');
   },
   buscarTarea : (keyword) => {
      let resultado = tareas.filter(tarea => {
         return tarea.titulo.toLowerCase().includes(keyword.toLowerCase());
      })
      mostrarTareas(resultado);
      return null;
   }
}
