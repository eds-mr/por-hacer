const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};


const argv = require('yargs')
    .command('listar', 'Listar las tareas', {
        completado: {
            demand: true,
            alias: 'c',
            default: false,
            desc: 'Buscar por completadas o pendientes'
        }
    })
    .command('crear', 'Crear una tarea por hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado de una tarea', {
        descripcion,
        completado: {
            alias: 'c',
            default: true,
            desc: 'Marca como completado o pendiente la tarea'
        }
    })
    .command('borrar', 'Borrar una tarea', {
        descripcion
    })
    .help('h')
    .argv;

module.exports = {
    argv
};