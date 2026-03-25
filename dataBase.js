//DATABASE FULGENCIA
let fs = require("fs");

// Clase Default para Persona
class defaultperson{

    constructor(ci, nombre, segNombre, apellido, segApellido){
        this.ci = ci
        this.nombre = nombre
        this.segNombre = segNombre
        this.apellido = apellido
        this.segApellido = apellido
    }
   
}

class Alumno extends defaultperson{
    
    constructor(ci, nombre, segNombre, apellido, segApellido,genero){
        super(ci,nombre,segNombre,apellido,segApellido)
        this.genero = genero
    }
        
    Informacion(){
        return `Alumno: ${this.nombre} ${this.segNombre} ${this.apellido} ${this.segApellido} | CI: ${this.ci} | Genero: ${this.genero}`;
    }

    modificar(nombre,segNombre,apellido,segApellido,genero){
        this.nombre=nombre
        this.segNombre = segNombre
        this.apellido= apellido
        this.segApellido= segApellido
    }
}

class Estudiantes {
    
    #Lista = [];
    #JsonName = "";

    constructor(JsonName) {
        this.#JsonName = JsonName;
        if (fs.existsSync(JsonName)) {
            const dataBase = fs.readFileSync(JsonName, "utf8");
            const data = JSON.parse(dataBase).estudiantes;

        this.#Lista = data.map(a => new Alumno(a.ci, a.nombre, a.segNombre, a.apellido, a.segApellido, a.genero));
        } else {
            const dataBase = JSON.stringify({
                estudiantes: []
            }, null, 2);
            fs.writeFileSync(JsonName, dataBase);
        }
    }

    registrarAlumno(ci, nombre, apellido) {
        const nuevoAlumno = new Alumno(ci, nombre, apellido);
        this.#Lista.push(nuevoAlumno);
    }

    modificarAlumno(ci,nombre,apellido){
         let alumno = this.buscarAlumno(ci);
         alumno.modificar(nombre,apellido);
    }

    buscarAlumno(ci) {
        return this.#Lista.find(alumno => alumno.ci == ci);
    }

    eliminarAlumno(ci) {
        let i = this.#Lista.findIndex(alumno => alumno.ci == ci);
        if (i !== -1){ this.#Lista.splice(i, 1) }
    }

    existeAlumno(ci) {
        return this.#Lista.some(alumno => alumno.ci == ci);
    }

    guardar() {
        const dataBase = JSON.stringify({
            estudiantes: this.#Lista
        }, null, 2);
        fs.writeFileSync(this.#JsonName, dataBase);
    }
}

module.exports.Estudiantes = Estudiantes;
module.exports.Alumno = Alumno;
