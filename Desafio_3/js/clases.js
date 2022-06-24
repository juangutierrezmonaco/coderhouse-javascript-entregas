class Cosplay {
    constructor (personaje, anime, tipo, precio, oferta = 0, envioGratis = false) {
        this.personaje = personaje;
        this.anime = anime;
        this.tipo = tipo;               // Tipo de prenda
        this.precio = precio;
        this.oferta = oferta;           // Porcentaje de descuento (Rebaja)
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

class Cliente {
    constructor (nombre, mail, telefono) {
        this.nombre = nombre;
        this.mail = mail;
        this.telefono = telefono;
    }
}

class CodigoDescuento {
    constructor (nombre, descuento) {
        this.nombre = nombre;
        this.descuento = descuento; //Descuento porcentual
    }
}