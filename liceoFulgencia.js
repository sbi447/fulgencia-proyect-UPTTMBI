const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
const BD = require("./dataBase.js")
const FM = require("./funcAndMenu.js")

console.clear()

// CONSOLA DE CONTRASEÑA
FM.blockWithPassword()

BD.abrirBD();

// --- MENÚ PRINCIPAL ---
function menuPrincipal() {
    let opcion;
    do {
        FM.optionsForMenu()

        opcion = prompt("Seleccione una opción: ");
        switch (opcion) {
            case '1': 
                console.log("\n--- Registro de Nuevo Estudiante ---");
                BD.registrarEstudiante(); break; // BD - ON
            case '2': 
	            console.clear("\n--- Lista de Alumnos Registrados ---");
                BD.verEstudiantes(); break; //BD - ON
            case '3':
                BD.buscarAlumno(); break; //BD - ON
            case '4': 
                BD.modificarEstudiante(); break; //BD - ON
            case '5': 
                BD.eliminarEstudiante(); break; //BD - ON
            case '6': 
				readline.keyInPause("Cerrando sistema... ¡Hasta luego!");
				console.clear(); break;
            default: 
                console.log("Opcion no válida, intente de nuevo.");
        }
    } while (opcion !== '6');
}

menuPrincipal(); // Iniciar el programa

BD.cerrarBD(); //Cerrar Base de Datos

