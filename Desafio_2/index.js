// Función principal que ejecuta todas las instrucciones
function main(){
    alert("Bienvenido al simulador interactivo!");

    ejecutarMenu();
}

// Funciones auxiliares que se usan para validaciones
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
    let mensaje = "Tiene las siguientes opciones\n 1 - SEIFUKU REI AYANAMI.\n 2 - COSPLAY NOBARA KUGISAKI.\n 3 - CHAQUETA LEGIÓN DE RECONOCIMIENTO";
    
    let op = ingresarOpcion(1, 3, mensaje);

    let codigoDesc = prompt("Si tiene un código de descuento, ingréselo");

    //Acá se realizaría una búsqueda en un array de códigos
    if (codigoDesc == "DESCUENTO123") {     
        alert("Tiene un 25% de descuento en su compra!");
    }

    alert(`Ahora será redirigido al sistema de ventas para comprar la opción ${op}!`);
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