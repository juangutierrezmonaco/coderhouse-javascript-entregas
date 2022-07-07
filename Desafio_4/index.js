// Esto estaría en un archivo
const cosplays = [];
cosplays.push(new Cosplay("Nobara Kugisaki", "Jujutsu Kaisen", "Cosplay", 7000, 0, 10, 5, 1, "./assets/images/cosplays/hechos-a-medida/jujutsu-nobara.png"));
cosplays.push(new Cosplay("Rei Ayanami", "Evangelion", "Seifuku", 5500, 0, 2, 100, 2, "./assets/images/cosplays/hechos-a-medida/evangelion-rei.png"));
cosplays.push(new Cosplay("Tradicional", "Anime", "Seifuku", 6000, 0, 100, 20, 4, "./assets/images/cosplays/hechos-a-medida/school-girl.png"));
cosplays.push(new Cosplay("Legión de Reconocimiento", "Shingeki no Kyojin", "Chaqueta", 6500, 10, 100, 0, 3, "./assets/images/cosplays/hechos-a-medida/shingeki-chaqueta.png"));
cosplays.push(new Cosplay("Legión de Reconocimiento", "Shingeki no Kyojin", "Saco", 9500, 25, 120, 3, 5, "./assets/images/cosplays/hechos-a-medida/shigenki-saco.png"));

const codigosDescuento = new Map();
codigosDescuento.set("ORA10", 10);
codigosDescuento.set("ORA25", 25);
codigosDescuento.set("CODERHOUSE", 30);
codigosDescuento.set("JUAN50", 50);

const carrito = new Carrito();

// Creación de galería y muestra
let galeria = document.querySelector(".main--index .main__seccion .row");

for (const cosplay of cosplays) {
    let cosplayHtml = document.createElement("article");
    cosplayHtml.classList.add("col-8", "col-sm-4", "col-md-3", "cosplay");
    
    cosplayHtml.innerHTML = 
        `<img src=${cosplay.imagen} class="cosplay__imagen mb-2 img-fluid"  alt="${cosplay.anime} - ${cosplay.personaje} - ${cosplay.tipo}">

        <div class="cosplay__footer">
            <h3>${cosplay.tipo.toUpperCase()} ${cosplay.personaje.toUpperCase()}</h3>
            <h5>${cosplay.anime}</h5>
            <h4>$ ${cosplay.precio}</h4>
        </div>

        <div class="cosplay__carrito">  
            <!-- Lo dejo armado con una clase para agregar la funcionalidad cuando se agrega algo al carrito en un futuro -->
            <a href="">
                <i class="fa-solid fa-cart-plus"></i>
            </a>
        </div>`;

    galeria.append(cosplayHtml);
}

// Aplicación de filtros a la galería
let opcionesOrden = document.querySelector("#orden");
let opcionesFiltro = document.querySelector("#filtro");

opcionesOrden.onchange = () => {
    let cosplaysOrdenados = cosplays.map(x => x);   // Hago una copia para no modificar el original

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
            cosplaysOrdenados.sort((a, b) => a.precio - b.precio);
            break;
        case "mayor-precio":
            cosplaysOrdenados.sort((a, b) => b.precio - a.precio);
            break;
        case "pred":
            cosplaysOrdenados.sort((a, b) => b.popularidad - a.popularidad); // No hay default porque la opción ya está validada
    }

    modificarGaleria(cosplaysOrdenados);
}

opcionesFiltro.onchange = () => {
    let cosplaysFiltrados = cosplays.map(x => x);
    switch (opcionesFiltro.value) {
        case "ofertas":
            cosplaysFiltrados = cosplays.filter(c => c.oferta > 0);
            break;
        case "stock":
            cosplaysFiltrados = cosplays.filter(c => c.stock > 0); // No hay default porque la opción ya está validada
    }
    modificarGaleria(cosplaysFiltrados);
}

// Modificación de galería
function modificarGaleria (cosplaysModificados, mensaje = "") {
    galeria.innerHTML = ""; // Borro lo que ya estaba

    let titulo = document.createElement("h2");
    titulo.innerHTML = `<h2>${mensaje}</h2>`;
    galeria.append(titulo);

    for (const cosplay of cosplaysModificados) {
        let cosplayHtml = document.createElement("article");
        cosplayHtml.classList.add("col-8", "col-sm-4", "col-md-3", "cosplay");
        
        cosplayHtml.innerHTML = 
            `<img src=${cosplay.imagen} class="cosplay__imagen mb-2 img-fluid"  alt="${cosplay.anime} - ${cosplay.personaje} - ${cosplay.tipo}">

            <div class="cosplay__footer">
                <h3>${cosplay.tipo.toUpperCase()} ${cosplay.personaje.toUpperCase()}</h3>
                <h5>${cosplay.anime}</h5>
                <h4>$ ${cosplay.precio}</h4>
            </div>

            <div class="cosplay__carrito">  
                <!-- Lo dejo armado con una clase para agregar la funcionalidad cuando se agrega algo al carrito en un futuro -->
                <a href="">
                    <i class="fa-solid fa-cart-plus"></i>
                </a>
            </div>`;

        galeria.append(cosplayHtml);
    }
}

// Menú con alerts, próximamente se migrará todo al DOM
function main() { 

    let opciones = ["Ver los cosplays ordenados", 
                "Aplicar algún filtro a los cosplays y verlos",
                "Buscar un cosplay",
                "Agregar un cosplay al carrito",
                "Eliminar un cosplay del carrito",
                "Ver carrito",
                "Registrarse", 
                "Solicitar más información"];

    let funciones =     [verCosplaysOrdenados, 
                        filtrarCosplays,
                        buscarCosplays,
                        agregarCosplayAlCarrito,
                        eliminarCosplayDelCarrito,
                        verCarrito,
                        registro,
                        masInfo];

    let menu = new Menu(opciones, funciones);
    exit = menu.ejecutarMenu();
}

function verCosplaysOrdenados () {
    let opciones = ["Ordenar por nombre ascendente, según anime", 
                    "Ordenar por nombre descendente, según anime",
                    "Ordenar por nombre ascendente, según personaje", 
                    "Ordenar por nombre descendente, según personaje",
                    "Ordenar por menor precio",
                    "Ordenar por mayor precio",
                    "Ordenar por popularidad (más populares primero)"];
    let menu = new Menu(opciones);
    let opcion = menu.ejecutarMenu();
    
    let cosplaysOrdenados = cosplays.map(x => x);   // Hago una copia para no modificar el original

    switch (opcion) {
        case 1:
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
        case 2:
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
        case 3:
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
        case 4:
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
        case 5:
            cosplaysOrdenados.sort((a, b) => a.precio - b.precio);
            break;
        case 6:
            cosplaysOrdenados.sort((a, b) => b.precio - a.precio);
            break;
        case 7:
            cosplaysOrdenados.sort((a, b) => b.popularidad - a.popularidad); // No hay default porque la opción ya está validada
    }

    modificarGaleria(cosplaysOrdenados);
}

function filtrarCosplays () {
    let opciones = ["Filtrar por ofertas",
                    "Filtrar por stock"];
    let menu = new Menu(opciones);
    let opcion = menu.ejecutarMenu();

    let cosplaysFiltrados;
    switch (opcion) {
        case 1:
            cosplaysFiltrados = cosplays.filter(c => c.oferta > 0);
            break;
        case 2:
            cosplaysFiltrados = cosplays.filter(c => c.stock > 0); // No hay default porque la opción ya está validada
    }

    modificarGaleria(cosplaysFiltrados);
}

function buscarCosplays() {
    let word = ingresarTexto("Ingrese la palabra que desea buscar: ");
    let mensaje = `COSPLAYS QUE COINCIDEN CON: "${word}"\n\n`;

    let cosplaysBuscados = cosplays.filter(c => 
                                            c.personaje.toLowerCase().includes(word.toLowerCase()) ||
                                            c.anime.toLowerCase().includes(word.toLowerCase())
    )

    modificarGaleria(cosplaysBuscados, mensaje);

}

function agregarCosplayAlCarrito () {
    alert("Elija que desea agregar al carrito!");
    
    let menu = new Menu(mostrarCosplays(cosplays, 1));  // Acá necesito pasar los cosplays como un arreglo, no como un string gigante.
    let opElegida = menu.ejecutarMenu();
    let cosplayElegido = cosplays[opElegida - 1];

    let stockDisponible = cosplayElegido.stock;
    if (stockDisponible == 0) {
        alert("Lamentamos informarle que no tenemos stock disponible de este producto. Próximamente renovaremos este producto!");
    } else {
        alert("Ha seleccionado el siguiente producto: \n\n" + cosplayElegido.toStr());  

        let cantCosplays = ingresarOpcion(1, stockDisponible, `Cuántas unidades desea? (DISPONIBLES: ${stockDisponible})`, `Recuerde que hay ${stockDisponible} unidades disponibles!`);
        
        carrito.agregarCosplay(cosplayElegido, cantCosplays);
        alert("Agregado al carrito correctamente!");
    }

    let opciones = ["Ver el carrito",
                    "Volver al menú principal"];
    menu = new Menu(opciones);
    let opcion = menu.ejecutarMenu();

    if (opcion == 1) {
        verCarrito();
    }   // Sino va a volver al menú principal de todas maneras. 
}

function eliminarCosplayDelCarrito () {
    if (carrito.cosplays.length == 0) {
        alert("Su carrito está vacío.");
    } else {
        alert("Elija que desea eliminar del carrito!");
    
        let menu = new Menu(carrito.mostrarCosplaysCarrito(1));  // Acá necesito pasar los cosplays como un arreglo, no como un string gigante.
        let opElegida = menu.ejecutarMenu();

        // Elimino del carrito
        let cosplayElegido = carrito.cosplays[opElegida - 1];
        carrito.eliminarCosplay(cosplayElegido);
        alert("Se ha eliminado correctamente!");

        let opciones = ["Ver el carrito",
                    "Volver al menú principal"];
        menu = new Menu(opciones);
        let opcion = menu.ejecutarMenu();

        if (opcion == 1) {
            verCarrito();
        }   // Sino va a volver al menú principal de todas maneras. 
    }
}

function verCarrito () {
    if (carrito.cosplays.length == 0) {
        alert("Su carrito está vacío.");
        return;
    }

    alert("Su carrito contiene los siguientes productos!");
    alert(carrito.mostrarCarrito());

    let opciones = ["Confirma compra",
                    "Cancelar compra",
                    "Seguir comprando"];
    menu = new Menu(opciones);
    let opcion = menu.ejecutarMenu();

    switch (opcion) {
        case 1:
            let montoTotal = carrito.calcularTotal(); // Monto que se le pasa al sistema de compras

            // Ingreso de código de descuento una vez elegida la compra
            let codigoDesc = prompt("Si tiene un código de descuento, ingréselo").toUpperCase();
            let desc = codigosDescuento.get(codigoDesc);
            let descNum = 0;

            if (desc != undefined) {
                alert(`Tiene un ${desc}% de descuento!`);

                // Aplico el desc al monto total
                descNum = calcularDescuento(montoTotal, desc);
                montoTotal = calcularPrecioConDescuento(montoTotal, desc);
            } else {
                alert("Cupón inválido");
            }

            alert("Ahora será redirigido al sistema de ventas para comprar el/los siguiente/s itemas:\n\n" + carrito.mostrarCarrito() + `\nDESCUENTOS: $${descNum}` + `\n\nTOTAL FINAL: $${montoTotal}`);

            break;
        case 2:
            carrito.borrarCarrito();

            alert("Su compra ha sido cancelada correctamente!");
            
    }
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
            let mail = ingresarTexto("Ingrese su mail.");
            break;
        case 2:
            let tel = ingresarNumero("Ingrese su teléfono.");         
            break;
    }

    alert("Gracias! Nos vamos a estar comunicando con vos!");
}