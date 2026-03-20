const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
const BD = require("./dataBase.js")

console.clear()

// CONSOLA DE CONTRASEÑA
let Key = "fulgencia123";
let TestKey;
let a = 1;

console.log("Hello dear user, welcome to FulgenciaRegister\n")
TestKey = prompt("Insert Your Password: ");

while(TestKey!==Key && a<3){
	console.log("Error, This Password Is Incorrect..."+" Your Count of Errors is: "+a+"/3");
	a++;
	TestKey = prompt("Insert Your Password: ");
}
	
if(TestKey===Key){
	console.log("Your Conection is Succesfull");

BD.abrirBD();

// --- MENÚ PRINCIPAL (Control de Flujo) ---
function menuPrincipal() {
    let opcion;
    do {
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
                BD.registrarEstudiante(); break; // BD - ON
            case '2': 
	            console.clear("\n--- Lista de Alumnos Registrados ---");
                BD.verEstudiantes(); break; //BD - ON
            case '3': BD.buscarAlumno(); break; //BD - ON
            case '4': BD.modificarEstudiante(); break; //BD - ON
            case '5': BD.eliminarEstudiante(); break; //BD - ON
            case '6': 
				readline.keyInPause("Cerrando sistema... ¡Hasta luego!");
				console.clear(); break;
            default: console.log("Opcion no válida, intente de nuevo.");
        }
    } while (opcion !== '6');
}

menuPrincipal(); // Iniciar el programa

BD.cerrarBD(); //Cerrar Base de Datos
}
