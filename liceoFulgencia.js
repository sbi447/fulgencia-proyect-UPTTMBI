const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
const {Estudiantes} = require("./dataBase.js")
let BDEstudiantes = new Estudiantes("dataBase.json");
const FM = require("./funcToMain.js")

console.clear()

// CONSOLA DE CONTRASEÑA
FM.blockWithPassword()

// --- MENÚ PRINCIPAL ---
let opcion;
    do {
        FM.optionsForMenu()

        opcion = prompt("Seleccione una opción: ");
        switch (opcion) {
            case '1': 
                console.log("\n--- Registro de Nuevo Estudiante ---");
                break;
            case '2': 
	            console.clear("\n--- Lista de Alumnos Registrados ---");
                break;
            case '3':
                break;
            case '4': 
                break;
            case '5': 
                break;
            case '6': 
				readline.keyInPause("Cerrando sistema... ¡Hasta luego!");
				console.clear(); break;
            default: 
                console.log("Opcion no válida, intente de nuevo.");
        }
    } while (opcion !== '6');
}


BD.guardar(); //Cerrar Base de Datos

