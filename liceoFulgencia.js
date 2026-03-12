const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
const BD = require("./dataBase.js")

console.clear()

// CONSOLA DE CONTRASEÑA
let Key = "fulgencia123";
let TestKey;
let a = 1;

console.log("Hello dear user, welcome to FulgenciaRegister your trusted bank\n")
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
        console.log("2. Ver Todos los Alumnos");
        console.log("3. Modificar Datos");
        console.log("4. Eliminar Registro");
        console.log("5. Salir");
        
        opcion = prompt("Seleccione una opción: ");

        switch (opcion) {
            case '1': BD.registrarEstudiante(); break; // BD - ON
            case '2': BD.verEstudiantes(); break; //BD - ON
            case '3': BD.modificarEstudiante(); break;
            case '4': BD.eliminarEstudiante(); break;
            case '5': 
				console.log("Cerrando sistema... ¡Hasta luego!"); 
				readline.keyInPause("Press Any Key to Exit...");
				console.clear(); break;
            default: console.log("Opcion no válida, intente de nuevo.");
        }
    } while (opcion !== '5');
}

menuPrincipal(); // Iniciar el programa

BD.cerrarBD(); //Cerrar Base de Datos
}
