class Cosplay {
    static count = 0;   // Por el momento, es para generar un id

    constructor (personaje, anime, tipo, precio, oferta = 0, popularidad = 0, stock = 0, imagen, especial = false) {
        this.personaje = personaje;
        this.anime = anime;
        this.tipo = tipo;               // Tipo de prenda
        this.precio = precio;
        this.oferta = oferta;           // Porcentaje de descuento (Rebaja)
        this.popularidad = popularidad; // Esta variable es un contandor que almacena cada vez que se compra uno
        this.stock = stock;
        this.imagen = imagen;
        this.especial = especial;       // Si es a medida o tiene algo particular.

        this.id = ++Cosplay.count; 
    }

    calcularPrecio () {
        return (this.oferta == 0) ? this.precio : calcularPrecioConDescuento(this.precio, this.oferta);
    }

    toHtml () {
        let cosplayHtml = document.createElement("article");
        cosplayHtml.id = `galeriaIndex${cosplay.id}`;
        cosplayHtml.classList.add("col-8", "col-sm-4", "col-md-3", "cosplay");
        
        let precio = cosplay.oferta == 0 ? `<h4>$ ${cosplay.precio}</h4>` : `<h4>(<del>$ ${cosplay.precio}</del>) $ ${cosplay.calcularPrecio()}</h4>`;
    
        let mostrarDescuento = (cosplay.oferta == 0) ? "d-none" : "d-flex"; 
        cosplayHtml.innerHTML = 
            `<img src=${cosplay.imagen} class="cosplay__imagen mb-2 img-fluid"  alt="${cosplay.anime} - ${cosplay.personaje} - ${cosplay.tipo}">
    
            <div class="cosplay__footer">
                <h3>${cosplay.tipo.toUpperCase()} ${cosplay.personaje.toUpperCase()}</h3>
                <h5>${cosplay.anime}</h5>
                ${precio}
            </div>
    
            <button type="submit" class="cosplay__carrito" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCarrito" aria-controls="offcanvasCarrito">
                <i class="fa-solid fa-cart-plus"></i>
            </button>
    
            <div class="cosplay__descuento ${mostrarDescuento}">
                ${cosplay.oferta}% <br>OFF
            </div>`;
    
            // Nota: Si se quiere ver cómo funcionan los filtros, agregar el div de acá abajo luego de la línea 43
            /* <div class="cosplay__footer BORRAR">
                <h4>OFERTA: ${cosplay.oferta}</h4>
                <h4>STOCK: ${cosplay.stock}</h4>
                <h4>ESPECIAL: ${cosplay.especial}</h4> 
            </div> */
    
            return cosplayHtml;
    }
}

function searchCosplayById (cosplays, id) {
    return cosplays.find(c => c.id == parseInt(id));
} 

function htmlToCosplay (cosplays, cosplayHtml) {
    let id  = cosplayHtml.id;
    id = numbersInString(c);    // Obtengo el numero en el id

    return (searchCosplayById(id));
}