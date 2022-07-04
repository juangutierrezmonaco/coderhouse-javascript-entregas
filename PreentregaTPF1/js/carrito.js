class Carrito {
    constructor () {
        this.cosplays = [];
        this.cantidades = [];   // Arreglo paralelo con la cantidad de cada cosplay
        this.total = 0;
    }

    agregarCosplay(cosplay, cantidad) {
        let indiceCosplay = this.cosplays.indexOf(cosplay);
        
        cosplay.stock -= cantidad;   // Actualizo el stock - Remuevo los solicitados del stock

        if (indiceCosplay == -1) {  // Si no está en el carrito
            this.cosplays.push(cosplay);
            this.cantidades.push(cantidad); 
        } else {    // Si ya existe en el carrito
            this.cantidades[indiceCosplay] += cantidad; // Aumento la cantidad
        }

        this.total += cosplay.calcularPrecio() * cantidad;    // Actualizo el precio total
    }

    eliminarCosplay(cosplay) {
        let indiceCosplay = this.cosplays.indexOf(cosplay);
        let cantidadEnCarrito = this.cantidades[indiceCosplay];
        cosplay.stock += cantidadEnCarrito;   // Actualizo el stock - Agrego nuevamente al stock el retirado

        this.total -= cosplay.calcularPrecio() * cantidadEnCarrito; // Actualizo el precio total

        carrito.cosplays.splice(indiceCosplay, 1);
        carrito.cantidades.splice(indiceCosplay, 1);
    }

    costoEnvio (precio) {    // De momento, si el total es más de 7000, el envío es gratis, sino es 1000 (Para evitar calcular con los C.P.)
        return (precio >= 7000)? 0: 1000;
    }

    calcularTotal () {
        return this.total + this.costoEnvio(this.total);
    }

    mostrarCosplaysCarrito (dummy = 0) {
        let mensaje = [];
        for (let i = 0; i < this.cosplays.length; i++) {
            let aux = "";
            aux += `${this.cosplays[i].tipo} ${this.cosplays[i].personaje} (${this.cosplays[i].anime})\n`;
            aux += `Cantidad: ${this.cantidades[i]}\n`;
            aux += `Precio: $${this.cosplays[i].calcularPrecio()}\n`;
            aux += `Subtotal: $${this.cosplays[i].calcularPrecio()*this.cantidades[i]}\n\n`
            
            mensaje.push(aux);
        }
        if (dummy != 0) {
            return mensaje;     // Si lo quiero devolver como un arreglo de strings.  
        } else {
            return mensaje.join("");    // Si lo quiero devolver todo como un string.
        }
    }

    mostrarCarrito () {
        let mensaje = [];
        
        if (this.cosplays.length == 0) {
            mensaje = "Su carrito está vacío.";
        } else {
            mensaje = this.mostrarCosplaysCarrito() + `Envío: $${this.costoEnvio(this.total)}\n` + `TOTAL: $${this.calcularTotal()}`;
            
        }
        return mensaje;
    }

    borrarCarrito () {
        //  Tengo que actualizar el stock y borrar el carrito.
        for (let i = 0; i < this.cosplays.length; i++) {
            this.cosplays[i].stock += this.cantidades[i];
        }

        this.cosplays.splice(0, this.cosplays.length);
        this.cantidades.splice(0, this.cantidades.length);
    }
}