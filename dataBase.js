//DATABASE FULGENCIA
const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
let estudiantes=[];
let dataBase;
let fs = require("fs");

// CONSOLA DE CONTRASEÑA
module.exports.blockWithPassword=()=>{
    let Key = "fulgencia123"; let TestKey; let a = 1;
    console.log("Hello dear user, welcome to FulgenciaRegister\n"); TestKey = prompt("Insert Your Password: ");

    while(TestKey!==Key && a<3){
    	console.log("Error, This Password Is Incorrect..."+" Your Count of Errors is: "+a+"/3");
	    a++;
	    TestKey = prompt("Insert Your Password: ");
    }

    if(TestKey===Key){
	console.log("Your Conection is Succesfull");
    }
}

function registarAlumno(ci,nombre,apellido){
    estudiantes.push({
        ci:ci,
        nombre:nombre,
        apellido:apellido
    })
}
// Función para REGISTRAR (Create) --- BD: ON
module.exports.registrarEstudiante=()=>{
    let ci = prompt("Ingrese Cédula: ");
    let nombre = prompt("Ingrese Nombre: ");
    let apellido = prompt("Ingrese Apellido: ");

    // Validación básica: evitar duplicados por CI
    if (estudiantes.find(e => e.ci === ci)) {
        console.log(" Error: Esa cédula ya existe.");
    } else {
        console.log(" Estudiante registrado con éxito.");
        registarAlumno(ci,nombre,apellido)
    }
}

// Ver Lista De Estudiantes --- BD: ON
module.exports.verEstudiantes=()=>{
    if (estudiantes.length === 0) {
        console.log("No hay alumnos en el sistema.");
    }else{
        console.table(estudiantes);}
}

// Ver 1 Alumno
module.exports.buscarAlumno=ci=>{
    let ciBusca = prompt("Ingrese la Cédula del Alumno: ");
    let alumno = estudiantes.find(e => e.ci === ciBusca);
    if (alumno === undefined){
        console.clear()
        console.log("Alumno No Existente - No Registrado")
    }else{
    console.table(alumno);
    }
}

// Función para MODIFICAR (Update) --- BD: ON
module.exports.modificarEstudiante=()=>{
    let ciBusca = prompt("Ingrese la Cédula del Alumno a Modificar: ");
    let alumno =estudiantes.find(e => e.ci === ciBusca);

    if (alumno) {
        console.log(`Modificando a: ${alumno.nombre} ${alumno.apellido}`);
        alumno.nombre = prompt("Nuevo nombre (deja vacío para mantener): ") || alumno.nombre;
        alumno.apellido = prompt("Nuevo apellido (deja vacío para mantener): ") || alumno.apellido;
        console.log(" Datos actualizados correctamente.");
    } else {
        console.log(" Estudiante no encontrado.");
    }
}
// Función para ELIMINAR (Delete) --- BD: ON
module.exports.eliminarEstudiante=()=>{
    let ciBusca = prompt("Ingrese la Cédula del alumno a eliminar: ");
    let indice = estudiantes.findIndex(e => e.ci === ciBusca);

    if (indice !== -1) {
        let confirmado = prompt(`¿Seguro que desea eliminar a ${estudiantes[indice].nombre}? (s/n): `);
        if (confirmado.toLowerCase() === 's'){
			let Key = "fulgencia123";
			let TestKey;
			let a = 1;
			TestKey = prompt("Insert Your Password for Continue: ");

			while(TestKey!==Key && a<3){
				console.log("Error, This Password Is Incorrect..."+" Your Count of Errors is: "+a+"/3");
				a++;
				TestKey = prompt("Insert Your Password: ");
			}
			if(TestKey===Key){
				estudiantes.splice(indice, 1);
				console.log(" Registro eliminado.");
			}
    } else {
        console.log(" No se encontró ningún estudiante con esa cédula.");
		}
	}
}

// OPEN & CLOSE BD
module.exports.abrirBD=()=>{
    dataBase= fs.readFileSync("dataBase.json","utf8");
    estudiantes=JSON.parse(dataBase).estudiantes
}

module.exports.cerrarBD=()=>{    
    dataBase = JSON.stringify({estudiantes:estudiantes},null,2);
    fs.writeFileSync("dataBase.json",dataBase);
}
