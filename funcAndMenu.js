const prompt = require("prompt-sync")({sigint:true});
const readline = require('readline-sync');

// CONSOLA DE CONTRASEÑA
module.exports.blockWithPassword=()=>{
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
}

// MOSTRAR OPCIONES DEL MENU
module.exports.optionsForMenu=()=>{
    console.log("\n==========================================");
    console.log("  SISTEMA DE PREINSCRIPCIÓN Y CONSTANCIAS ");
    console.log("==========================================");
    console.log("1. Registrar Estudiante");
    console.log("2. Ver Todos los Estudiantes");
    console.log("3. Buscar Un Estudiante");
    console.log("4. Modificar Datos");
    console.log("5. Eliminar Registro");
    console.log("6. Salir");
}
