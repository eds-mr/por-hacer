const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    const data = JSON.stringify(listadoPorHacer);
    
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo crear la tarea', err);
    });
};

const cargarBD = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        console.log("Error");
        listadoPorHacer = [];
    }
};

const getListado = (completado = false) => {
    completado = validarBoolean(completado);
    cargarBD();
    
    if (completado == null)  {
        return [];
    } else {
        return listadoPorHacer.filter(tarea => tarea.completado === completado);
    }

};

const crear = descripcion => {
    cargarBD();
    
    const porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    
    guardarDB();

    return porHacer;
};

const actualizar = (descripcion, completado = true) => {
    completado = validarBoolean(completado);
    cargarBD();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0 && completado != null) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = descripcion => {
    cargarBD();

    const nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    
    if (listadoPorHacer.length !== nuevoListado.length) {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const validarBoolean = valor => {
    switch(typeof(valor)) {
        case 'boolean': 
            break;
        case 'string':
            if (valor.trim().toLowerCase() === 'true') {
                valor = true;
            } else if (valor.trim().toLowerCase() === 'false') {
                valor = false;
            } else {
                valor = null;
                console.log('El argumento no es valido');
            }
            break;
        default:
            valor = null;
            console.log('El argumento no es valido');
            break;
    }
    return valor;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};