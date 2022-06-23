/**************************************************************/
/*                        CLASES                              */
/**************************************************************/
class Cosplay {
    constructor (personaje, anime, tipo, precio, oferta = 0, envioGratis = false) {
        this.personaje = personaje;
        this.anime = anime;
        this.tipo = tipo;               // Tipo de prenda
        this.precio = precio;
        this.oferta = oferta;           // Porcentaje de descuento
        this.envioGratis = (this.precio >= 7000) ? true : false;
    }

    aplicarDescuento () {
        return (this.precio * (1 - this.oferta/100));
    }

    toStr() {
        let print = [];
        print.push("Personaje: " + this.personaje);
        print.push("Anime: " + this.anime);
        print.push("Tipo de prenda: " + this.tipo);
        print.push("Precio: $" + this.precio);
        print.push( ((this.oferta == 0) ? "No tiene descuento" : `Tiene un ${this.oferta}% de descuento ($${this.aplicarDescuento()} con el descuento)`) );
        print.push(this.envioGratis? "Este artículo tiene envío gratis" : "Este artículo no tiene envío gratis");
        
        return (print.join("\n"));
    }
}

class CodigoDescuento {
    constructor (codigo, descuento) {
        this.codigo = codigo;
        this.descuento = descuento; //Descuento porcentual
    }

    
}

/**************************************************************/
/*                       FUNCIONES                            */
/**************************************************************/
// Función principal que ejecuta todas las instrucciones
function main(){
    alert("Bienvenido al simulador interactivo!");

    ejecutarMenu();
}

// Funciones auxiliares que se usan para validaciones y otras cosas
function validarNumero (mensaje) {
    let num = parseInt(prompt(mensaje));
    while (isNaN(num)) {
        alert("Ingreso incorrecto. Intente nuevamente.");
        num = parseInt(prompt(mensaje));
    }

    return num;
}

function ingresarOpcion(limInf, limSup, mensaje) {
    alert(mensaje);
    let opcion = parseInt(prompt("Elección: "));

    while (opcion < limInf || opcion > limSup || isNaN(opcion)) {
        alert("Opción Incorrecta. Intente nuevamente!");

        alert(mensaje);    
        opcion = parseInt(prompt("Elección: "));
    }

    return opcion;
}

// Devuelve si un código de desc. es válido
function codigoValido (let codigo) {

    // Esto estaría en un archivo con los códigos válidos
    let codigos = [];
    codigos.push(new CodigoDescuento("ORA10", 10));
    codigos.push(new CodigoDescuento("ORA25", 25));
    codigos.push(new CodigoDescuento("CODERHOUSE", 30));
    codigos.push(new CodigoDescuento("JUAN50", 50));

    if (codigos[codigo.toUpperCase()]) {
        return 1;
    }
}

// Se encarga del menu propiamente dicho
function ejecutarMenu() {
    let mensaje = "Tiene las siguientes opciones\n 1 - Comprar un cosplay.\n 2 - Registrarse.\n 3 - Solicitar más información";
    
    let op = ingresarOpcion(1, 3, mensaje);

    // Una vez validada, se ejecuta la opción
    switch (op) {
        case 1:
            compra();
            break;
        case 2:
            registro();          
            break;
        case 3:
            masInfo();  //No hay un default porque la opción ya está validada
    }   
}

// Funciones disponibles
function compra () {
    const cosplays = [];

    cosplays.push(new Cosplay("Rei Ayanami", "Evangelion", "Seifuku", 5500));
    cosplays.push(new Cosplay("Nobara Kugisaki", "Jujutsu Kaisen", "Cosplay", 7000));
    cosplays.push(new Cosplay("Legión de Reconocimiento", "Shingeki no Kyojin", "Chaqueta", 6500, 10));

    let mensaje = [];
    mensaje.push("Tiene las siguientes opciones\n");

    for (cosplay of cosplays) {
        mensaje += "- " + (cosplays.indexOf(cosplay) + 1) + " -\n" + cosplay.toStr() + "\n\n";
    }

    let op = ingresarOpcion(1, cosplays.length, mensaje);

    let codigoDesc = prompt("Si tiene un código de descuento, ingréselo");

    //Acá se realizaría una búsqueda en un array de códigos
    if (codigoDesc == "DESCUENTO123") {     
        alert("Tiene un 25% de descuento en su compra!");
    }

    alert("Ahora será redirigido al sistema de ventas para comprar el siguiente producto: \n" + cosplays[op - 1].toStr());
}

function registro () {
    let nombre;
    let mail;
    let exit = 0;

    while (!exit) {
        nombre = prompt("Ingrese su nombre y apellido");
        mail = prompt("Ingrese su mail");

        alert(`Sus datos son:\n - ${nombre}\n - ${mail} \n Si hay algún dato incorrecto presione 0, sino presione cualquier otra tecla para continuar`);
        exit = parseInt(prompt("Ingreso"));
        
        if (isNaN(exit)) {  //Para salir y evitar crear otra variable
            exit = 1;
        }
    }

    alert("Gracias por registrarse! Le llegará un mail de validación para crear un usuario!")
}

function masInfo() {
    let mensaje = "Ingrese por donde desea recibir la información\n 1 - Mail.\n 2 - Teléfono/WhatsApp.";
    
    let op = ingresarOpcion(1, 2, mensaje);

    switch (op) {
        case 1:
            let mail = prompt("Ingrese su mail.")
            break;
        case 2:
            let tel = validarNumero("Ingrese su teléfono.");         
            break;
    }

    alert("Gracias! Nos vamos a estar comunicando con vos!");
}