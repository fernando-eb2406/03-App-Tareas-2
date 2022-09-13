/* TP03 - App de Notas/Tareas 2 */

const process = require('process');
const {listarTareas, agregarTarea, filtrarTareas, eliminarTarea, buscarTarea} = require('./funcionesDeTareas');

console.clear();

let comando = process.argv[2];

if (comando === undefined) {
   console.log('Debe ingresar la acción a realizar.');
   return null;
}

switch (comando.toLowerCase()) {
   case 'listar':
      listarTareas();
      break;
   case 'agregar':
        let titulo = process.argv[3];
        if (!titulo){
            console.log('Ingresar titulo para poder agregar una tarea nueva.');
            break;
        }
        //console.log(process.argv[3]);         --> Agregar tarea entre comillas para que tome las palabras en una unica posicion [3]
        let nuevaTarea = {
            titulo,
            estado : 'pendiente'
        }
        agregarTarea(nuevaTarea);
        break;
   case 'filtrar':
        filtrarTareas(process.argv[3]); 
        break;
   case 'eliminar':
      eliminarTarea(process.argv[3]);
      break;
   case 'buscar':
      buscarTarea(process.argv[3]);
      break;
   case undefined:
      console.log('Atención - Tienes que pasar una acción.');
      break;
   default:
      console.log('No entiendo lo que quieres hacer.');
      break;
}
