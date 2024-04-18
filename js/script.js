// simulador de login, creacion de usuarios, administracion de usuarios. 
// simulador de stock, alta de productos, modificacar precio, agregar stock.

// clase constructora de usuarios
class Usuario {
    constructor(nombre, apellido, usuario, password) {
        this.nombre = nombre
        this.apellido = apellido
        this.usuario = usuario
        this.password = password
    }
}

// clase constructora de productos
class Producto {
    constructor(id, producto, marca, modelo, categoria, stock, precio) {
        this.id = id
        this.producto = producto
        this.marca = marca
        this.modelo = modelo
        this.categoria = categoria
        this.stock = stock
        this.precio = precio
    }
}

//array USUARIOS
let listaUsuarios = [
    // nombre, apellido, usuario, contraseña
    new Usuario('admin', 'admin', 'admin', 'admin')
]

// array PRODUCTOS
let listaProductos = [
    new Producto(1, 'Mother MSI B450 AM4 Gaming Max', 'msi', 'b450 Gaming Max', 'motherboard', 2, 76000),
    new Producto(2, 'Motherboard ASUS Prime B450M-A', 'ASUS', 'Prime B450M-A', 'motherboard', 5, 85000),
    new Producto(3, 'Tarjeta gráfica NVIDIA GeForce RTX 3060', 'NVIDIA', 'GeForce RTX 3060', 'tarjeta gráfica', 3, 450000),
    new Producto(4, 'SSD Kingston A2000 1TB NVMe', 'Kingston', 'A2000', 'almacenamiento', 8, 120000),
    new Producto(5, 'Monitor LG 27GL83A-B', 'LG', '27GL83A-B', 'monitor', 4, 320000),
    new Producto(6, 'Teclado mecánico Corsair K70 RGB MK.2', 'Corsair', 'K70 RGB MK.2', 'periférico', 6, 180000),
    new Producto(6, 'Mouse Logitech G502 HERO', 'Logitech', 'G502 HERO', 'periférico', 7, 90000),
    new Producto(7, 'Auriculares Sony WH-1000XM4', 'Sony', 'WH-1000XM4', 'audio', 2, 350000),
    new Producto(8, 'Impresora HP LaserJet Pro MFP M28w', 'HP', 'LaserJet Pro MFP M28w', 'impresora', 1, 180000),
    new Producto(10, 'Smartphone Samsung Galaxy S21 Ultra', 'Samsung', 'Galaxy S21 Ultra', 'smartphone', 3, 1200000),
    new Producto(11, 'Tablet Apple iPad Air (2020)', 'Apple', 'iPad Air (2020)', 'tablet', 4, 600000)
];


// Función para crear un nuevo usuario
function crearUsuario() {
    let nombre = prompt('Ingrese su nombre')
    let apellido = prompt('Ingrese su apellido')
    let usuario = prompt('Elije un nombre de usuario')
    if (usuarioExiste(usuario)) {
        do {
            usuario = prompt('El usuario ya existe\nPor favor elija otro nombre de usuario')
        } while (usuarioExiste(usuario))
    }
    let password = prompt('Elija una contraseña')
    generarUsuario(nombre, apellido, usuario, password)
}

// Función para verificar si el usuario ya existe
function usuarioExiste(usuario) {
    return listaUsuarios.some(validacion => validacion.usuario === usuario);
}

// Función con prompts para crear un nuevo producto
function crearProducto() {
    let producto = prompt('Ingrese el nombre del producto\nejemplo: Procesador AMD Ryzen 7 5700 AM2');
    let marca = prompt('Ingrese la marca del producto')
    let modelo = prompt('Ingrese el modelo')
    let categoria = prompt('Ingrese la categoria')
    let stock = Number(prompt('Ingrese el stock'))
    let precio = Number(prompt('Ingrese el precio'))
    let id = generarId();
    generarProducto(id, producto, marca, modelo, categoria, stock, precio)
}

function generarId() {
    let ids = listaProductos.map((p) => p.id);
    let maxId = Math.max(...ids);
    return maxId + 1;
}

// recibe los valores de los prompts para generar los usuarios en el array
function generarUsuario(nombre, apellido, usuario, password) {
    let usuarioNuevo = new Usuario(nombre, apellido, usuario, password)
    listaUsuarios.push(usuarioNuevo)
    menuPrincipal()
}

// recibe los los valores de los prompts para generar productos en el array
function generarProducto(id, producto, marca, modelo, categoria, stock, precio) {
    let productoNuevo = new Producto(id, producto, marca, modelo, categoria, stock, precio)
    listaProductos.push(productoNuevo)
    menuAdmin()
}

// MENU Principal
function menuPrincipal() {
    let opcion = 0
    while (opcion < 1 || opcion > 3 || isNaN(opcion)) {
        opcion = Number(prompt('Ingrese:\n 1: para ingresar\n 2: para registrarse \n 3: para salir'))
    }
    if (opcion === 1) {
        login()
    } else if (opcion === 2) {
        crearUsuario()
    } else if (opcion === 3) {
        alert('Hasta luego')
    }
}

// MENU login
function login() {
    let intentos = 3
    for (i = 0; i = 4; i++) {
        let usuarioPrompt = prompt('Ingrese su usuario')
        let passwordPrompt = prompt('Ingrese su contraseña')
        let validacion = listaUsuarios.find(validacion => validacion.usuario === usuarioPrompt && validacion.password === passwordPrompt);
        if (validacion) {
            return menuProductos();
        }
        intentos -= 1
        if (intentos <= 0) {
            alert('DEMASIADOS INTENTOS')
            return
        }
        alert('usuario o clave incorrecta le quedan ' + intentos + ' intentos')
    }
}

// Menu Productos
function menuProductos() {
    let opcion = 0
    while (opcion < 1 || opcion > 7 || isNaN(opcion)) {
        opcion = Number(prompt('Ingrese 1 para listar productos\nIngrese 2 para listar productos por precio\nIngrese 3 para borrar un producto\nIngrese 4 para cambiar el stock de un producto\nIngrese 5 para cambiar el precio de un producto\nIngrese 6 para dar de alta un producto\nIngrese 7 para volver al menu anterior'))
    }
    if (opcion === 1) {
        let nombreBuscado = prompt('Ingresa un nombre de usuario:');
        buscarProducto(nombreBuscado);
    } else if (opcion === 2) {
        //listar productos por precio
    } else if (opcion === 3) {
        // listar productos por stock
    } else if (opcion === 4) {
        // agregar stock a un producto
    } else if (opcion === 5) {
        // cambiar precio de un producto
    } else if (opcion === 6) {
        crearProducto()
    } else if (opcion === 7) {

    }
}


//listar usuarios por busqueda

function buscarProducto(nombreBuscado) {
    let resultados = listaProductos.filter((producto) =>
        producto.producto.toLowerCase().includes(nombreBuscado.toLowerCase())
    );

    if (resultados.length === 0) {
        alert('No se encontraron usuarios con ese nombre de usuario.');
        menuUsuarios()
    } else {
        const mensajeResultados = resultados.map((u) => `Nombre: ${u.nombre}, Apellido: ${u.apellido}, Usuario: ${u.usuario}`).join('\n');
        alert(`Usuarios encontrados (${resultados.length} resultados):\n${mensajeResultados}`);
        menuUsuarios()
    }
}

// EJECUCION 
menuPrincipal()