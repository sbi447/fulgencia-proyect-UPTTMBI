const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
const {Estudiantes} = require("./dataBase.js")
let BD = new Estudiantes("dataBase.json"); // BD = BASE DE DATOS
const CM = require("./lock.js"); // FM = FUNCTIONS TO MAIN

console.clear()

// CONSOLA DE CONTRASEÑA
CM.blockWithPassword()

// MENÚ PRINCIPAL
let opcion;
do {
    //OPTIONS SWITCH
    console.log("\n==========================================");
    console.log("  SISTEMA DE PREINSCRIPCIÓN Y CONSTANCIAS ");
    console.log("==========================================");
    console.log("1. Registrar Estudiante");
    console.log("2. Ver Todos los Estudiantes");
    console.log("3. Buscar Un Estudiante");
    console.log("4. Modificar Datos");
    console.log("5. Eliminar Registro");
    console.log("6. Salir");
    opcion = prompt("Seleccione una opción: ");

    switch (opcion) {
        case '1': 
            console.log("\n--- Registro de Nuevo Estudiante ---");
            let cedula = prompt("Ingrese la cedula: ")
            let nombre = prompt("Ingrese el nombre: ");
            let segNombre = prompt("Ingrese el segundo nombre: ");
            let apellido = prompt("Ingrese el apellido: ");
            let segApellido = prompt("Ingrese el segundo apellido: ");
            let genero = prompt("Ingrese el genero: ")
            if (BD.existeAlumno(cedula)) {
                readline.keyInPause("ACCION DENEGADA: alumno ya existe");
                break;
            }
            BD.registrarAlumno(cedula, nombre, segNombre, apellido, segApellido, genero)
            readline.keyInPause("Estudiante registrado!")
        break;
        case '2': 
	        console.clear("\n--- Lista de Alumnos Registrados ---");
            console.table(BD.todosLosAlumnos())
        break;
        case '3':
            console.clear("\n--- Buscar Estudiante ---")
            ci = prompt("Ingrese la cedula del Estudiante: ")
            if (!BD.existeAlumno(ci)){
                readline.keyInPause("¡Estudiante No Registrado - No Existente!");
                break;
            }
            let alumno = BD.buscarAlumno(ci);
            console.table(alumno.Informacion());
        break;
        case '4':
            console.log("\n---Modificación de Alumno")
            let ci = prompt("Ingrese la cedula: ")
            if(!BD.existeAlumno(ci)){
                console.log("El alumno no existe..."); readline.keyInPause()
                break;
            }
            let nombreNew = prompt("Ingrese primer nombre: ")
            let segNombreNew = prompt("Ingrese segundo nombre: ")
            let apellidoNew = prompt("Ingrese primer apellido: ")
            let segApellidoNew = prompt("Ingrese segundo apellido: ")
            let generoNew = prompt("Ingrese el genero: ")
            BD.modificarAlumno(nombreNew, segNombreNew, apellidoNew, segApellidoNew, generoNew)
            console.log("El alumno a sido modificado.. ")
        break;
        case '5': 
        break;
        case '6': 
			readline.keyInPause("Cerrando sistema... ¡Hasta luego!");
			console.clear(); 
        break;
        default: 
            console.log("Opcion no válida, intente de nuevo.");
    }
} while (opcion !== '6');


BD.guardar(); //Cerrar Base de Datos

