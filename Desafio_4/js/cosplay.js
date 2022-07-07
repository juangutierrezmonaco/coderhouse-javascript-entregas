class Cosplay {
    constructor (personaje, anime, tipo, precio, oferta = 0, popularidad = 0, stock = 0, id, imagen) {
        this.personaje = personaje;
        this.anime = anime;
        this.tipo = tipo;               // Tipo de prenda
        this.precio = precio;
        this.oferta = oferta;           // Porcentaje de descuento (Rebaja)
        this.popularidad = popularidad; // Esta variable es un contandor que almacena cada vez que se compra uno
        this.stock = stock;
        this.id = id;
        this.imagen = imagen;
    }

    calcularPrecio () {
        return (this.oferta == 0) ? this.precio : this.calcularPrecioConDescuento();
    }

    clonarCosplay () {
        let cosplayCopia = new Cosplay(this.personaje, this.anime, this.tipo, this.precio, this.oferta, this.popularidad, this.stock);
        
        return cosplayCopia;
    }

    toStr() {
        let print = [];
        print.push("Personaje: " + this.personaje);
        print.push("Anime: " + this.anime);
        print.push("Tipo de prenda: " + this.tipo);
        print.push("Precio: $" + this.precio);
        print.push( ((this.oferta == 0) ? "No tiene descuento" : `Tiene un ${this.oferta}% de descuento ($${calcularPrecioConDescuento(this.precio, this.oferta)} con el descuento)`) );
        print.push(`Cantidad: ${this.stock}`);      // NOTA: ESTO ESTÁ MOMENTANEAMENTE, EL USUARIO NO DEBERÍA VERLO, ES PARA DEBUGGEAR
        return (print.join("\n"));
    }
}

function mostrarCosplays (cosplays, dummy = 0) {
    if (cosplays.length == 0) return 0; // Si el arreglo está vacío devuelvo un 0

    let mensaje = [];
    for (cosplay of cosplays) {
        mensaje.push(cosplay.toStr() + "\n\n");
    }
    if (dummy != 0) {
        return mensaje;     // Si lo quiero devolver como un arreglo de strings.  
    } else {
        return mensaje.join("");    // Si lo quiero devolver todo como un string.
    }
}
