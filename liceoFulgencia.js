const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');
const BD = require("./dataBase.js")

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

// Array de objetos para almacenar los datos
let estudiantes = [];

// --- FUNCIONES (Lógica del Proyecto) ---

// Función para REGISTRAR (Create)
function registrarEstudiante(){
    console.log("\n--- Registro de Nuevo Estudiante ---");
    let ci = prompt("Ingrese Cédula: ");
    let nombre = prompt("Ingrese Nombre: ");
    let apellido = prompt("Ingrese Apellido: ");

    // Validación básica: evitar duplicados por CI
    if (estudiantes.find(e => e.ci === ci)) {
        console.log(" Error: Esa cédula ya existe.");
    } else {
        estudiantes.push({ ci, nombre, apellido });
        console.log(" Estudiante registrado con éxito.");
    }
}

// Función para LEER todos (Read)
function verEstudiantes(){
    console.log("\n--- Lista de Alumnos Registrados ---");
    if (estudiantes.length === 0) {
        console.log("No hay alumnos en el sistema.");
    } else {
        // Mostramos los datos de forma tabular
        console.table(estudiantes);
    }
}

// Función para MODIFICAR (Update)
function modificarEstudiante(){
    let ciBusca = prompt("Ingrese la Cédula del alumno a modificar: ");
    let alumno = estudiantes.find(e => e.ci === ciBusca);

    if (alumno) {
        console.log(`Modificando a: ${alumno.nombre} ${alumno.apellido}`);
        alumno.nombre = prompt("Nuevo nombre (deja vacío para mantener): ") || alumno.nombre;
        alumno.apellido = prompt("Nuevo apellido (deja vacío para mantener): ") || alumno.apellido;
        console.log(" Datos actualizados correctamente.");
    } else {
        console.log(" Estudiante no encontrado.");
    }
}

// Función para ELIMINAR (Delete)
function eliminarEstudiante(){
    let ciBusca = prompt("Ingrese la Cédula del alumno a eliminar: ");
    let indice = estudiantes.findIndex(e => e.ci === ciBusca);

    if (indice !== -1) {
        let confirmado = prompt(`¿Seguro que desea eliminar a ${estudiantes[indice].nombre}? (s/n): `);
        if (confirmado.toLowerCase() === 's') {
            estudiantes.splice(indice, 1); // Elimina el elemento del array
            console.log(" Registro eliminado.");
        }
    } else {
        console.log(" No se encontró ningún estudiante con esa cédula.");
    }
}

// --- MENÚ PRINCIPAL (Control de flujo) ---
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
            case '1': registrarEstudiante(); break;
            case '2': verEstudiantes(); break;
            case '3': modificarEstudiante(); break;
            case '4': eliminarEstudiante(); break;
            case '5': console.log("Cerrando sistema... ¡Hasta luego!");console.clear(); break;
            default: console.log("Opcion no válida, intente de nuevo.");
        }
    } while (opcion !== '5');
}

menuPrincipal(); // Iniciar el programa

BD.cerrarBD(); //Cerrar Base de Datos
}
