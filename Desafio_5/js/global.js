/**
 *  Funciones que son de uso general para todas las clases y funciones.
 */

function ingresarNumero (mensaje) {
    let num = parseInt(prompt(mensaje));
    while (isNaN(num)) {
        alert("Ingreso incorrecto. Intente nuevamente.");
        num = parseInt(prompt(mensaje));
    }

    return num;
}

function ingresarTexto (mensaje) {
    let word = prompt(mensaje);
    while (word == undefined || word == "") {
        if (word == undefined) {
            alert("Ingreso incorrecto. Intente nuevamente.");
        } else {
            alert("No ha ingresado nada. Intente nuevamente.");
        }

        word = prompt(mensaje);
    }
    
    return word;
}

function ingresarOpcion(limInf, limSup, mensaje, mensajeError = "Opción Incorrecta. Intente nuevamente!") {
    alert(mensaje);
    let opcion = parseInt(prompt("Elección: "));

    while (opcion < limInf || opcion > limSup || isNaN(opcion)) {
        alert(mensajeError);

        alert(mensaje);    
        opcion = parseInt(prompt("Elección: "));
    }

    return opcion;
}

function numbersInString (str) {    // Retorna los números de un string o NaN
    let result = str.split("").filter(c => !(isNaN(c)));
    return parseInt(result.join(""));
}

function calcularDescuento (total, desc) {
    return total * desc/100;
}

function calcularPrecioConDescuento (total, desc) {  // Se le pasa un total y un descuento en porcentaje, por ejemplo, si se le pasa un 10 significa 10%.
    return total * (1 - desc/100);
}

function actualizarStock () {
    for (const cosplay of carrito.cosplays) {
        cosplay.stock -= carrito.getCantidad(cosplay);
    }
}