class Carrito {
    constructor () {
        this.cosplays = [];
        this.cantidades = [];   // Arreglo paralelo con la cantidad de cada cosplay
        this.descuento = 0;     // Descuento porcentual
        this.total = 0;
    }

    getCantidad(cosplay) {
        let indiceCosplay = this.cosplays.indexOf(cosplay);
        return this.cantidades[indiceCosplay];
    }

    getCantidadTotal() {
        return this.cantidades.reduce( (ac, el) => ac + el, 0);
    }

    existeCosplay(cosplay) {
        return (this.cosplays.indexOf(cosplay) != -1)? true : false;
    }

    agregarCosplay(cosplay) {
        let indiceCosplay = this.cosplays.indexOf(cosplay);

        if (indiceCosplay == -1) {  // Si no está en el carrito
            this.cosplays.push(cosplay);
            this.cantidades.push(1); 
        } else {    // Si ya existe en el carrito
            this.cantidades[indiceCosplay] += 1; // Aumento la cantidad
        }

        this.total += cosplay.calcularPrecio();    // Actualizo el precio total
    }

    eliminarCosplay(cosplay) {
        let indiceCosplay = this.cosplays.indexOf(cosplay);
        this.cantidades[indiceCosplay] -= 1; // Disminuyo la cantidad

        this.total -= cosplay.calcularPrecio();    // Actualizo el precio total
    }

    eliminarCosplayCompleto(cosplay) {
        let indiceCosplay = this.cosplays.indexOf(cosplay);
        let cantidadEnCarrito = this.cantidades[indiceCosplay];

        this.total -= cosplay.calcularPrecio() * cantidadEnCarrito; // Actualizo el precio total

        carrito.cosplays.splice(indiceCosplay, 1);
        carrito.cantidades.splice(indiceCosplay, 1);
    }

    costoEnvio () {    // De momento, si el total es más de 7000, el envío es gratis, sino es 1000 (Para evitar calcular con los C.P.)
        return (this.total >= 7000)? 0: 1000;
    }

    calcularSubcosto(cosplay) {
        let indiceCosplay = this.cosplays.indexOf(cosplay);
        return this.cosplays[indiceCosplay].calcularPrecio()*this.cantidades[indiceCosplay];
    }

    calcularDescuento () {
        let totalConEnvio = this.total + this.costoEnvio();
        return calcularDescuento(totalConEnvio, this.descuento);
    }

    calcularTotal () {
        let totalConEnvio = this.total + this.costoEnvio();
        return (calcularPrecioConDescuento(totalConEnvio, this.descuento));
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
        this.cosplays.splice(0, this.cosplays.length);
        this.cantidades.splice(0, this.cantidades.length);
    }

    length () {
        return this.cosplays.length;
    }
}