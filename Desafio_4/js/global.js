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

function calcularDescuento (total, desc) {
    return total * desc/100;
}

function calcularPrecioConDescuento (total, desc) {  // Se le pasa un total y un descuento en porcentaje, por ejemplo, si se le pasa un 10 significa 10%.
    return total * (1 - desc/100);
}

/**
 * NOTA: LA MAYORIA DE LAS CLASES TIENE ALGÚN MÉTODO QUE SE LLAMA "mostrarAlgo()", ESTOS GENERALMENTE NO MUESTRAN NADA SINO QUE GENERAN UN MENSAJE QUE
 * LUEGO SE DISPONE EN UN ALERT. ESTO ES PARA NO SUJETAR LOS MÉTODOS AL ALERT Y DESDE AFUERA TENER ACCESO A ESTE MENSAJE QUE RETORNAN POR SI SE 
 * DEBE USAR PARA OTRA COSA LA IMPRESIÓN, POR DECIRLO DE ALGUNA MANERA.ñ
 */