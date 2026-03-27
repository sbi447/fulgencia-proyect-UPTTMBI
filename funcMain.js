const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
const {Estudiantes} = require("./dataBase.js")
let BD = new Estudiantes("dataBase.json"); // BD = BASE DE DATOS

loginLock=()=>{
    let Key = "fulgencia123"; let TestKey; let a = 1;
    console.log("Bienvenido a FulgenciaRegister\n"); TestKey = prompt("Ingrese su Contraseña: ");

    while(TestKey!==Key && a<4){
    	console.log("Error, la Contraseña es Incorrecta..."+" Número de Errores: "+a+"/3");
	    a++;
        if(a>3){
            readline.keyInPause("NUMERO DE ERRORES EXCEDIDO | ACCESO DENEGADO")
            process.exit()
        }
	    TestKey = prompt("Ingrese su Contraseña: ");
    }
    if(TestKey===Key){
        console.clear()
	    console.log("Se ha iniciado sesion correctamente");
    }
}

registerStudent=()=>{
    console.log("\n--- Registro de Nuevo Estudiante ---");
    let cedula = prompt("Ingrese la cedula: ")
    if (BD.existeAlumno(cedula)) {
        readline.keyInPause("ACCION DENEGADA: alumno ya existe");
    }else{
        let nombre = prompt("Ingrese el nombre: ");
        let segNombre = prompt("Ingrese el segundo nombre: ");
        let apellido = prompt("Ingrese el apellido: ");
        let segApellido = prompt("Ingrese el segundo apellido: ");
        let tlfno = prompt("Ingrese el tlfno: ")
        BD.registrarAlumno(cedula, nombre, segNombre, apellido, segApellido, tlfno)
        readline.keyInPause("Estudiante registrado!")
    }
}

listOfStudents=()=>{
    console.clear("\n--- Lista de Alumnos Registrados ---");
    console.table(BD.todosLosAlumnos())
}

searchOneStudent=()=>{
    console.clear("\n--- Buscar Estudiante ---")
    checkCedula = prompt("Ingrese la cedula del Estudiante: ")
    if (!BD.existeAlumno(checkCedula)){
        readline.keyInPause("¡Estudiante No Registrado - No Existente!");
    }else{
        let alumno = BD.buscarAlumno(checkCedula);
        console.log(alumno.Informacion()); 
    }
}

modifyStudent=()=>{
    console.clear("\n---Modificación de Alumno")
    let ci = prompt("Ingrese la Cedula del Estudiante a Modificar: ")
    if(!BD.existeAlumno(ci)){
        console.clear(); readline.keyInPause("El alumno no existe...")
    }else{
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
    }
}

deleteStudent=()=>{
    console.clear("---Eliminar Estudiante---");
    ciDelete = prompt("Ingrese la cedula del alumno ")
    //Comprobacion de existencia
    if (!BD.existeAlumno(ciDelete)){
        readline.keyInPause("Estudiante No Existente");
    }else{
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
    }
}

module.exports = {
    loginLock,
    registerStudent,
    listOfStudents,
    searchOneStudent,
    modifyStudent,
    deleteStudent,
}
