/**************************************************************/
/*                           GENERAL                          */
/**************************************************************/
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

/**************************************************************/
/*                           CODIGO                           */
/**************************************************************/
function findCodigo(thisCodigo, codigos){
    for (codigo of codigos) {
        if (codigo.nombre == thisCodigo.toUpperCase()) {
            return codigo;
        }
    }

    return false;
}

/**************************************************************/
/*                            MENU                            */
/**************************************************************/
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

function compra () {

    // Esto estaría en un archivo con los códigos de descuento
    let codigos = [];
    codigos.push(new CodigoDescuento("ORA10", 10));
    codigos.push(new CodigoDescuento("ORA25", 25));
    codigos.push(new CodigoDescuento("CODERHOUSE", 30));
    codigos.push(new CodigoDescuento("JUAN50", 50));

    // Esto estaría en un archivo con todos los cosplays
    const cosplays = [];
    cosplays.push(new Cosplay("Rei Ayanami", "Evangelion", "Seifuku", 5500));
    cosplays.push(new Cosplay("Nobara Kugisaki", "Jujutsu Kaisen", "Cosplay", 7000));
    cosplays.push(new Cosplay("Legión de Reconocimiento", "Shingeki no Kyojin", "Chaqueta", 6500, 10));

    // Mensaje para mostrar en el menú
    let mensaje = [];
    mensaje.push("Tiene las siguientes opciones\n");

    for (cosplay of cosplays) {
        mensaje += "- " + (cosplays.indexOf(cosplay) + 1) + " -\n" + cosplay.toStr() + "\n\n";
    }

    let op = ingresarOpcion(1, cosplays.length, mensaje);
    let cosplayElegido = cosplays[op - 1];   // Hago una copia para no modificar el original 

    // Ingreso de código de descuento una vez elegida la compra
    let codigoDesc = prompt("Si tiene un código de descuento, ingréselo");
    let codigo = findCodigo(codigoDesc, codigos);

    if (codigo) {
        alert(`Tiene un ${codigo.descuento}% de descuento!`);

        // Cambio la oferta del cosplay, la acumulo a la oferta que traiga
        cosplayElegido.oferta += codigo.descuento;
    } else {
        alert("Cupón inválido");
    }

    alert("Ahora será redirigido al sistema de ventas para comprar el siguiente producto: \n" + cosplayElegido.toStr());
}

function registro () {
    let cliente = new Cliente();
    let exit = 0;

    while (!exit) {
        cliente.nombre = prompt("Ingrese su nombre y apellido");
        cliente.mail = prompt("Ingrese su mail");

        alert(`Sus datos son:\n - ${cliente.nombre}\n - ${cliente.mail} \n Si hay algún dato incorrecto presione 0, sino presione cualquier otra tecla para continuar`);
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