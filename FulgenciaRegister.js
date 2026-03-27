const fm = require('./funcMain.js')
const prompt = require("prompt-sync")({sigint:true});

console.clear()
// Login
fm.loginLock()
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
            fm.registerStudent()
            break;
        case '2': 
	        fm.listOfStudents()
            break;
        case '3':
            fm.searchOneStudent()
            break;
        case '4':
            fm.modifyStudent()
            break;
        case '5':
            fm.deleteStudent()
            break;
        case '6':
            fm.exit()
            break;
        default: 
            console.log("Opcion no válida, intente de nuevo.");
    }
} while (opcion !== '6');
