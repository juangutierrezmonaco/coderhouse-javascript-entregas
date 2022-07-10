// Esto estaría en un archivo
const codigosDescuento = new Map();
codigosDescuento.set("ORA10", 10);
codigosDescuento.set("ORA25", 25);
codigosDescuento.set("CODERHOUSE", 30);
codigosDescuento.set("JUAN50", 50);

const cosplaysBackup = [];
cosplaysBackup.push(new Cosplay("Nobara Kugisaki", "Jujutsu Kaisen", "Cosplay", 7000, 0, 10, 5, "./assets/images/cosplays/hechos-a-medida/jujutsu-nobara.png"));
cosplaysBackup.push(new Cosplay("Rei Ayanami", "Evangelion", "Seifuku", 5500, 0, 2, 100, "./assets/images/cosplays/hechos-a-medida/evangelion-rei.png", true));
cosplaysBackup.push(new Cosplay("Tradicional", "Anime", "Seifuku", 6000, 0, 100, 20, "./assets/images/cosplays/hechos-a-medida/school-girl.png"));
cosplaysBackup.push(new Cosplay("Legión de Reconocimiento", "Shingeki no Kyojin", "Chaqueta", 6500, 10, 100, 0, "./assets/images/cosplays/hechos-a-medida/shingeki-chaqueta.png"));
cosplaysBackup.push(new Cosplay("Legión de Reconocimiento", "Shingeki no Kyojin", "Saco", 9500, 25, 120, 5, "./assets/images/cosplays/hechos-a-medida/shigenki-saco.png", true));
cosplaysBackup.push(new Cosplay("Kaonashi", "El viaje de Chihiro", "Cosplay", 8000, 15, 40, 7, "./assets/images/cosplays/chihiro-noface.png", true));

cosplaysBackup.sort((a, b) => b.popularidad - a.popularidad);   // Por defecto se ordenan por popularidad

let cosplays = cosplaysBackup;  // Tengo un backup de los datos originales por cualquier error


/**************************************************************/
/*                          GALERIA                           */
/**************************************************************/

// Creación de galería y muestra
let galeriaIndex = document.querySelector(".main--index .galeria");
cargarGaleria(cosplays);

// Convierte y agrega un cosplay a la galeria
function agregarCosplayAGaleria (cosplay) {
    let cosplayHtml = document.createElement("article");
    cosplayHtml.id = cosplay.id;
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

    galeriaIndex.append(cosplayHtml);
        
}

function cargarGaleria (arrCosplays) {
    for (const cosplay of arrCosplays) {
        agregarCosplayAGaleria(cosplay);
    }
}

// Modificación de galería
function modificarGaleria (cosplaysModificados, mensaje = "") {
    galeriaIndex.innerHTML = ""; // Borro lo que ya estaba

    let titulo = document.createElement("h2");
    titulo.innerHTML = `<h2>${mensaje}</h2>`;
    galeriaIndex.append(titulo);

    cargarGaleria(cosplaysModificados);
}

// Esta función es para obtener el estado actual de los cosplays en la galería  (Por ejemplo: si se quiere ordenar cosplays ya filtrados)
function getCosplaysFromHtml () {
    let cosplaysModificados = [];
    let cosplaysHtml = document.querySelectorAll(".cosplay");

    for (const cosplay of cosplaysHtml) {
        let thisId = cosplay.id;
        cosplaysModificados.push(searchCosplayById(cosplays, thisId));
    }

    return cosplaysModificados;
}

// Orden en la galería  - Ordena lo que está a la vista (o sea, lo que está en el html), si se filtra o se busca, ordena eso y no el arreglo original.
let opcionesOrden = document.querySelector("#orden");
opcionesOrden.onchange = () => {
    let cosplaysOrdenados = getCosplaysFromHtml();

    switch (opcionesOrden.value) {
        case "nombre-asc-anime":
            cosplaysOrdenados.sort((a, b) => {
                if (a.anime > b.anime) {
                    return 1;
                } else if (a.anime < b.anime) {
                    return -1;
                } else {
                    return 0;
                }
            });
            break;
        case "nombre-des-anime":
            cosplaysOrdenados.sort((a, b) => {
                if (a.anime > b.anime) {
                    return -1;
                } else if (a.anime < b.anime) {
                    return 1;
                } else {
                    return 0;
                }
            });
            break;
        case "nombre-asc-personaje":
            cosplaysOrdenados.sort((a, b) => {
                if (a.personaje > b.personaje) {
                    return 1;
                } else if (a.personaje < b.personaje) {
                    return -1;
                } else {
                    return 0;
                }
            });
            break;
        case "nombre-des-personaje":
            cosplaysOrdenados.sort((a, b) => {
                if (a.personaje > b.personaje) {
                    return -1;
                } else if (a.personaje < b.personaje) {
                    return 1;
                } else {
                    return 0;
                }
            });
            break;
        case "menor-precio":
            cosplaysOrdenados.sort((a, b) => a.calcularPrecio() - b.calcularPrecio());
            break;
        case "mayor-precio":
            cosplaysOrdenados.sort((a, b) => b.calcularPrecio() - a.calcularPrecio());
            break;
        case "pred":
            cosplaysOrdenados.sort((a, b) => b.popularidad - a.popularidad); // No hay default porque la opción ya está validada
    }

    modificarGaleria(cosplaysOrdenados);
}

// Aplicación de filtros a la galería
let opcionesFiltro = document.querySelector("#filtro");

opcionesFiltro.onchange = () => {
    let checkBoxes = document.querySelectorAll('input[name=filtrado-articulos]');

    // Genero un filtro que retorna una función que es la conjunción de los 3 filtros
    const filtro = (c) => {
        let funcion = true;
        for (const checkBox of checkBoxes) {
            if (checkBox.checked) {
                switch (checkBox.id) {
                    case "oferta":
                        funcion = funcion & c.oferta > 0;
                    break;
                    case "stock":
                        funcion = funcion & c.stock > 0;
                    break;  
                    case "especial":
                        funcion = funcion & c.especial > 0;
                    break;
                }
            }
        }

        return funcion;
    }
    
    let cosplaysFiltrados = cosplays.filter(filtro);
    modificarGaleria(cosplaysFiltrados); 
}

// Búsqueda en la galería
let buscador = document.querySelector("#buscadorTienda");
let buscadorInput = document.querySelector("#inputBuscador");

buscador.addEventListener("submit", buscar);    // Para hacer click en la lupa y que busque

buscadorInput.addEventListener("change", buscar);    // En caso de que se desenfoque

buscadorInput.addEventListener("keydown", (e) => {  
    if (e.key == "\n") {    // Para hacer click en enter y que busque
        buscar(e);
    } 

    // Si se borra, se restaura el arreglo al original y se busca nuevamente (porque en la búsqueda modifico el arreglo). También aplica para el caso que no se ponga nada en la búsqueda, se restaura el arreglo.
    if (e.key = "\r") {     
        cosplays = cosplaysBackup;
    }
});

function buscar (e) {
    e.preventDefault();
    let word;
    let form = e.target;

    if (e.type == "submit") {   // Se llamó haciendo click en el botón
        word = form.children[0].value;
    } else {                    // Se llamó desenfocando el input
        word = form.value;
    }

    let mensaje = "";

    cosplays = cosplays.filter(c => 
        c.personaje.toLowerCase().includes(word.toLowerCase()) ||
        c.anime.toLowerCase().includes(word.toLowerCase())  ||
        c.tipo.toLowerCase().includes(word.toLowerCase())
    )
    if (cosplays.length == 0) {
        mensaje = "No hay coincidencias con la búsqueda";
    }

    modificarGaleria(cosplays, mensaje);

    // Por último, cuando se busca se borran todos los filtros.
    // Esto es porque se puede buscar y filtrar esos resultados, pero no buscar en los resultados filtrados.
    let checkBoxes = document.querySelectorAll('input[name=filtrado-articulos]');
    for (const cb of checkBoxes) {
        cb.checked = false;
    }
}

/**************************************************************/
/*                          CARRITO                           */
/**************************************************************/
let carrito = new Carrito();


let carritoHtmlGaleria = document.querySelector("#galeria__carrito");
let carritoHtmlFooter = document.querySelector("#footer__carrito");

// Se encarga de transportar todas las modificaciones en el carrito al html.
function modificarCarrito () {


    // Modifico cartel 
    let carritoVacio = document.querySelector("#carritoVacio");
    let mensaje = document.createElement("h5");
    mensaje.innerText = (carrito.length() == 0) ?  "No hay productos en su carrito!" : "";

    carritoVacio.innerHTML = '';
    carritoVacio.append(mensaje);

    // Agregar al carrito
    let carritoHtmlGaleria = document.querySelector("#galeria__carrito");
    let carritoHtmlFooter = document.querySelector("#footer__carrito");
    carritoHtmlGaleria.innerHTML = ''; // Ya que voy a recorrer todo nuevamente
    carritoHtmlFooter.innerHTML = '';

    for (cosplay of carrito.cosplays) {
        let cosplayHtml = document.createElement("div");
        cosplayHtml.classList.add("header__carrito__offcanvas__producto");

        let precio = cosplay.oferta == 0 ? `$ ${cosplay.precio}` : `(<del>$ ${cosplay.precio}</del>) $ ${cosplay.calcularPrecio()}`
        let descuento = cosplay.oferta == 0 ? `` : `(${cosplay.oferta}% OFF)`;

        cosplayHtml.innerHTML = 
            `<div class="header__carrito__offcanvas__producto__imagen">
                <img src=${cosplay.imagen} alt="${cosplay.anime} - ${cosplay.personaje} - ${cosplay.tipo}">
            </div>

            <div class="header__carrito__offcanvas__producto__info" id=${cosplay.id}>
                <span>${cosplay.tipo.toUpperCase()} ${cosplay.personaje.toUpperCase()}</span>
                <span>${precio} ${descuento}</span>
                
                <div class="header__carrito__offcanvas__producto__info__cantidad mb-3">
                    <button class="btn btn-light carritoMenos" type="submit"><i class="fa fa-minus"></i></button>
                    <span class="carritoCantidad">${carrito.getCantidad(cosplay)}</span>
                    <button class="btn btn-light carritoMas" type="submit"><i class="fa fa-plus"></i></button>
                </div>

                <h6 class="stockAgotado"></h6>
            </div>

            <div class="header__carrito__offcanvas__producto__precio">$ ${carrito.calcularSubcosto(cosplay)} </div>

            <div>
                <button class="btn btn-danger header__carrito__offcanvas__producto__tachito" type="submit">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>`;
        carritoHtmlGaleria.append(cosplayHtml);

        let footerCarrito = document.createElement("div");
        footerCarrito.classList.add("header__carrito__offcanvas__footer");
        footerCarrito.innerHTML = 
            `<div class="fs-5">
                <span>Subtotal (sin envío):</span>
                <span>$ ${carrito.total}</span>
            </div>
    
            <div class="fs-5">
                <span>Envío (CP 7600): </span>
                <span>$ ${carrito.costoEnvio()}</span>
            </div>

            <div class="fs-5">
                <span>Descuentos: </span>
                <span>$ ${carrito.calcularDescuento()}</span>
            </div>
    
            <div class="fs-4">
                <span>TOTAL: </span>
                <span>$ ${carrito.calcularTotal()}</span>
            </div>
        
            <div class="fs-5 mt-5 flex-column row col-12 col-md-6">
                <h4 class="">CÓDIGO DE DESCUENTO</h4>
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Ingrese su código" id="codigoDescuento">
                    <button class="btn btn-dark text-white aplicarCodigo" type="submit">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
                <h6 class="cartelCodigoDescuento mt-2 ms-1"></h6>
            </div>

            <button class="btn btn-dark mt-4 me-2 iniciarCompra" type="submit">INICIAR COMPRA</button>`;
    
        carritoHtmlFooter.innerHTML = "";   //Borro lo que traía de antes
        carritoHtmlFooter.append(footerCarrito);
    }

    // Modifico el carrito del header
    let carritoHeader = document.querySelector(".header__carrito span");
    carritoHeader.innerHTML = `CARRITO (${carrito.getCantidadTotal()}) $${carrito.total}`;
}

// Click en carrito de los cosplays
galeriaIndex.addEventListener("submit", (e) => {
    e.preventDefault();
    let selectedCosplay = searchCosplayById(cosplays, e.submitter.parentElement.id);

    // Primero veo si existe en el carrito
    if (!carrito.existeCosplay(selectedCosplay)) {
        carrito.agregarCosplay(selectedCosplay);
        modificarCarrito();
    } else {
        // Ahora necesito ir a la galería del carrito y buscar el cosplay que coincida y disparar el evento del botón más de ese,
        // para validar si se puede agregar y mostrar el cartel de que no hay stock, y funcionalidades ya hechas ahí.
        let nodosCarrito = carritoHtmlGaleria.childNodes;

        let nodoCosplay = "";   // Este sería el encontrado
        let i = 0;
        while (nodoCosplay == "") {  // Mientras no lo encuentre
            let thisCosplay = nodosCarrito[i++].querySelector(".header__carrito__offcanvas__producto__info");

            if (thisCosplay.id == selectedCosplay.id) {
                nodoCosplay = thisCosplay;
            }
        }

        // Accedo a su botón de más y lo clickleo
        let botonMas = nodoCosplay.querySelector(".carritoMas");
        botonMas.click();
    }
})

// Click en el más, menos, o tachito
carritoHtmlGaleria.addEventListener("submit", (e) => {
    e.preventDefault();

    // Recupero la información del cosplay actual y para eso necesito llegar al nodo padre que tiene el id.
    let parent = e.submitter;
    while (parent.className != "header__carrito__offcanvas__producto") {
        parent = parent.parentNode;
    }

    let id = parent.querySelector(".header__carrito__offcanvas__producto__info").id;
    let thisCosplay = searchCosplayById(cosplays, id);
    let cantidad = parseInt(parent.querySelector(".carritoCantidad").innerText);

    if (e.submitter.className.includes("carritoMas")) {

        if (cantidad == thisCosplay.stock) {
            // Escalo hasta llegar a la info del cosplay y voy stockAgotado para mostrar el cartel.
            let mensaje = parent.querySelector(".stockAgotado"); 
        
            if (mensaje.innerText == "") {  // Si todavía no saltó el cartel
                mensaje.innerText = "¡UY! NO TENEMOS MÁS STOCK DE ESTE PRODUCTO PARA AGREGARLO AL CARRITO.";
            } else {
                mensaje.classList.remove("shake-vertical");
                window.requestAnimationFrame(() => {
                    mensaje.classList.add("shake-vertical");
                });
            }
        } else {
            carrito.agregarCosplay(thisCosplay);
            modificarCarrito();
        }

    }

    if (e.submitter.className.includes("carritoMenos")) {
        if (cantidad > 1) {
            carrito.eliminarCosplay(thisCosplay);
            modificarCarrito();
        }
    }   

    if (e.submitter.className.includes("tachito")) {
        carrito.eliminarCosplayCompleto(thisCosplay);
        modificarCarrito();
    }    
})

// Click en el aplicar descuento o iniciar compra
carritoHtmlFooter.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.submitter.className.includes("aplicarCodigo")) {
        let inputCodigo = carritoHtmlFooter.querySelector("#codigoDescuento");
        let codigoDesc = inputCodigo.value.toUpperCase();   // Me traigo el código en el input
        let desc = codigosDescuento.get(codigoDesc);
        

        let mensaje;
        let color;

        if (desc != undefined) {    // Si lo encontró
            carrito.descuento = desc;
            mensaje = `DESCUENTO APLICADO (${desc}% OFF)`;
            color = "text-success";
        } else {
            carrito.descuento = 0; 
            mensaje = "CUPÓN INVÁLIDO";
            color = "text-danger";
        }

        
        modificarCarrito();

        let mensajeDescuento = document.querySelector(".cartelCodigoDescuento"); 
        mensajeDescuento.innerText = mensaje

        mensajeDescuento.classList.remove("fade-out", color);
            window.requestAnimationFrame(() => {
                mensajeDescuento.classList.add("fade-out", color);
            });
    }

    if (e.submitter.className.includes("iniciarCompra")) {
        alert(`Ahora será redirigido al sistema de venta por el monto de $ ${carrito.calcularTotal()}`)

        if (compra(carrito.calcularTotal())) {  // Si se cobró exitosamente
            // Actualizo stock
            actualizarStock();

            // Actualizo la galería por si alguno se quedó sin stock
            modificarGaleria(cosplays);

            // Borro el carrito
            carrito.borrarCarrito();
            modificarCarrito();
        }
    }
})

// De momento esto simula el sistema de compra, devuelve si se cobró exitosamente
function compra (monto) {
    console.log(`Se cobraron $${monto}.`);
    return true;    // De momento devuelve que la compra fue exitosa
}