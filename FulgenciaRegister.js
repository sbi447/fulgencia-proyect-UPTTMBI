const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
const {Estudiantes} = require("./dataBase.js")
let BD = new Estudiantes("dataBase.json"); // BD = BASE DE DATOS

console.clear()

// Login
let Key = "fulgencia123"; let TestKey; let a = 1;
    console.log("Bienvenido a FulgenciaRegister\n"); TestKey = prompt("Ingrese su Contraseña: ");

    while(TestKey!==Key && a<3){
    	console.log("Error, la Contraseña es Incorrecta..."+" Número de Errores: "+a+"/3");
	    a++;
	    TestKey = prompt("Ingrese su Contraseña: ");
    }

    if(TestKey===Key){
        console.clear()
	    console.log("Se ha iniciado sesion correctamente");
    }


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
            if (BD.existeAlumno(cedula)) {
                readline.keyInPause("ACCION DENEGADA: alumno ya existe");
                break;
            }
            let nombre = prompt("Ingrese el nombre: ");
            let segNombre = prompt("Ingrese el segundo nombre: ");
            let apellido = prompt("Ingrese el apellido: ");
            let segApellido = prompt("Ingrese el segundo apellido: ");
            let tlfno = prompt("Ingrese el tlfno: ")
            BD.registrarAlumno(cedula, nombre, segNombre, apellido, segApellido, tlfno)
            readline.keyInPause("Estudiante registrado!")
            break;
        case '2': 
	        console.clear("\n--- Lista de Alumnos Registrados ---");
            console.table(BD.todosLosAlumnos())
            break;
        case '3':
            console.clear("\n--- Buscar Estudiante ---")
            checkCedula = prompt("Ingrese la cedula del Estudiante: ")
            if (!BD.existeAlumno(checkCedula)){
                readline.keyInPause("¡Estudiante No Registrado - No Existente!");
                break;
            }
            let alumno = BD.buscarAlumno(checkCedula);
            console.log(alumno.Informacion());
            break;
        case '4':
            console.clear("\n---Modificación de Alumno")
            let ci = prompt("Ingrese la Cedula del Estudiante a Modificar: ")
            if(!BD.existeAlumno(ci)){
                console.clear(); readline.keyInPause("El alumno no existe...")
                break;
            }
            let Key = "fulgencia123"; let TestKey; let a = 1;
            alumnoModify = BD.buscarAlumno(ci);
            console.log(`Se modificara a: ${alumnoModify.Informacion()}\n`); TestKey = prompt("Ingrese la Contraseña para Continuar: ");

            while(TestKey!==Key && a<4){
    	        console.log("Error, la Contraseña es Incorrecta..."+" Número de Errores: "+a+"/3");
	            a++;
                if(a>3){
                    console.clear()
                    readline.keyInPause("---VERIFICACION INVALIDA | ACCESO DENEGADO---")
                    break;
                }
                TestKey = prompt("Ingrese su Contraseña: ");
            }

            if(TestKey===Key){
	            console.log("\n---Verificación Aprobada---\n")
                let nombreNew = prompt("Ingrese primer nombre: ") || alumnoModify.nombre
                let segNombreNew = prompt("Ingrese segundo nombre: ") || alumnoModify.segNombre
                let apellidoNew = prompt("Ingrese primer apellido: ") || alumnoModify.apellido
                let segApellidoNew = prompt("Ingrese segundo apellido: ") || alumnoModify.segApellido
                let tlfnoNew = prompt("Ingrese el tlfno: ") || alumnoModify.tlfno
                BD.modificarAlumno(ci, nombreNew, segNombreNew, apellidoNew, segApellidoNew, tlfnoNew)
                readline.keyInPause("El Estudiante a Sido Modificado con Exito...")
                console.clear()

            }
            break;
        case '5':
            console.clear("---Eliminar Estudiante---");
            ciDelete = prompt("Ingrese la cedula del alumno ")
            //Comprobacion de existencia
            if (!BD.existeAlumno(ciDelete)) {
                readline.keyInPause("Estudiante No Existente");
                break;
            }
            //Comprobacion de Eliminacion
            let alumnoDelete = BD.buscarAlumno(ciDelete)
            console.log('¿Esta Seguro de Eliminar al Estudiante?:')
            console.log(alumnoDelete.Informacion());
            let eliminar = prompt("Escriba 'y' para confirmar: ");
            if (eliminar.toLowerCase() == "y"){
                let testKeyDelete = prompt("Ingrese la Contraseña para Continuar: "); let key1 = "fulgencia123";
                while(testKeyDelete!==key1 && a<4){
    	            console.log("Error, la Contraseña es Incorrecta..."+" Número de Errores: "+a+"/3");
	                a++;
                    if(a>3){
                        console.clear()
                        readline.keyInPause("---VERIFICACION INVALIDA | ELIMINACION NO PERMITIDA---")
                        break;
                    }
                    testKeyDelete = prompt("Ingrese su Contraseña: ");
                }
                if(testKeyDelete===key1){
                    BD.eliminarAlumno(ciDelete)
                    readline.keyInPause("¡Estudiante Eliminado!");
                }
            }
            break;
        case '6':
            console.clear()
			readline.keyInPause("Cerrando sistema... ¡Hasta luego!");
			console.clear(); 
            break;
        default: 
            console.log("Opcion no válida, intente de nuevo.");
    }
} while (opcion !== '6');

BD.guardar(); //Cerrar Base de Datos

