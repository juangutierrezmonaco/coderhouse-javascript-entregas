function validacionOpciones() {
    do {
        let Mensaje = "Tiene las siguientes opciones\n 1 - Ingresar nombre.\n 2 - Ingresar edad.\n 3 - Ingresar documento.";
        alert(Mensaje);

        let opcion = parseInt(prompt("Elección: "));

        // Validación
        while (opcion < 1 || opcion > 3 || isNaN(opcion)) {
            alert("Opción Incorrecta. Intente nuevamente!");

            alert(Mensaje);    
            opcion = parseInt(prompt("Elección: "));
        }

        let nombre;
        let edad;
        let documento;

        // Una vez validada, se ejecuta la opción
        switch (opcion) {
            case 1:
                nombre = prompt("Ingrese su nombre: ");
                alert("Su nombre es: " + nombre);
                break;
            case 2:
                edad = parseInt(prompt("Ingrese su edad: "));
                if (isNaN(edad)){
                alert("Edad inválida.")  
                } else {
                    alert("Su edad es: " + edad);
                }            
                break;
            case 3:
                documento = parseInt(prompt("Ingrese su documento: "));
                if (isNaN(documento)){
                    alert("Documento inválido.")
                } else {
                    alert("Su documento es: " + documento);
                }
                break;
            default:
                alert("Si se ejecuta esta opción es porque hubo un error de código porque su opción ya fue validada!");
            break;
        }
    } while (prompt("Si desea salir presione ESC, sino presione cualquier   otra tecla para repetir el algoritmo.") != null);

    alert("Gracias por probar el script!");

}