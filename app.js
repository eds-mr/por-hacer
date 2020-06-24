const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        const tarea = porHacer.crear(argv.descripcion);
        break;
    case 'listar':
        const listado = porHacer.getListado(argv.completado);
        
        for (let tarea of listado) {
            console.log('=======Por Hacer======='.green);
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado ? 'Completado' : 'Pendiente');
            console.log('======================='.green);
        }
        break;
    case 'actualizar':
        const fueActualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        if (fueActualizado) {
            console.log('Tarea actualizada exitosamente');
        } else {
            console.log('No se pudo o no se encontró la tarea a actualizar');
        }
        break;
    case 'borrar':
        const fueBorrado = porHacer.borrar(argv.descripcion);

        if (fueBorrado) {
            console.log('Tarea borrada');
        } else {
            console.log('La tarea a borrar no se encontró');
        }
        break;
    default:
        console.log('Comando no es reconocido');
        break;
}
