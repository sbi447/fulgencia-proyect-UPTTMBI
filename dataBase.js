//DATABASE FULGENCIA
let estudiantes=[];
let dataBase;
let fs = require("fs");

module.exports.registarAlumno=(ci,nombre,apellido)=>{
    estudiantes.push({
        ci:ci,
        nombre:nombre,
        apellido:apellido
    })
}

module.exports.buscarAlumno=ci=>{
    return estudiantes.find(alumno=>alumno.ci==ci)
}

module.exports.verEstudiantes=()=>{
    console.log("\n--- Lista de Alumnos Registrados ---");
    if (estudiantes.length === 0) {
        console.log("No hay alumnos en el sistema.");
    } else {
        // Mostramos los datos de forma tabular
        console.table(estudiantes);
    }
}

module.exports.abrirBD=()=>{
    dataBase= fs.readFileSync("dataBase.json","utf8");
    estudiantes=JSON.parse(dataBase).estudiantes
}

module.exports.cerrarBD=()=>{    
    dataBase = JSON.stringify({estudiantes:estudiantes},null,2);
    fs.writeFileSync("dataBase.json",dataBase);
}
