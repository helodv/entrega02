// stock manager 
// Hernan Loureiro / entrega 2 / CoderHouse / JavaScript

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
    // id, producto, marca, modelo, categoria, stock, precio
    new Producto(1, 'Mother MSI B450 AM4 Gaming Max', 'msi', 'b450 Gaming Max', 'motherboard', 2, 76000),
    new Producto(2, 'Motherboard ASUS Prime B450M-A', 'ASUS', 'Prime B450M-A', 'motherboard', 5, 85000),
    new Producto(3, 'Tarjeta gráfica NVIDIA GeForce RTX 3060', 'NVIDIA', 'GeForce RTX 3060', 'tarjeta gráfica', 3, 450000),
    new Producto(4, 'SSD Kingston A2000 1TB NVMe', 'Kingston', 'A2000', 'almacenamiento', 8, 120000),
    new Producto(5, 'Monitor LG 27GL83A-B', 'LG', '27GL83A-B', 'monitor', 4, 320000)
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

// verifica cual es el id mas alto y devuelve el siguiente para asignarlo a un nuevo producto
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
    menuProductos()
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
    while (opcion < 1 || opcion > 4 || isNaN(opcion)) {
        opcion = Number(prompt('Bienvenido a CoderStock\n1: Buscar productos\n2: Dar de alta producto\n3. Listar todos los productos\n4. Desloguear'))
    }
    if (opcion === 1) {
        let nombreBuscado = prompt('Buscar producto:')
        buscarProducto(nombreBuscado)
    } else if (opcion === 2) {
        crearProducto()
    } else if (opcion === 3) {
        listarProductos(listaProductos)
    } else if (opcion === 4) {
        alert('Hasta luego')
        menuPrincipal()
    }
}


//lista los productos por busqueda
function buscarProducto(nombreBuscado) {
    let resultados = listaProductos.filter((producto) =>
        producto.producto.toLowerCase().includes(nombreBuscado.toLowerCase())
    );

    if (resultados.length === 0) {
        alert('No se encontraron productos.');
        menuProductos()
    } else {
        let mensajeResultados = resultados.map((producto) => `ID: ${producto.id}, Producto: ${producto.producto}, Marca: ${producto.marca}, Modelo: ${producto.modelo}, Categoria: ${producto.categoria}, Stock: ${producto.stock}, Precio: ${producto.precio}`).join('\n');
        alert(`Productos encontrados (${resultados.length} resultados):\n${mensajeResultados}`)
        menuProductos()
    }
}

// lista todos los productos
function listarProductos(productos) {
    let lista = ''
    for (let producto of productos) {
        lista += `ID: ${producto.id}`
        lista += ` ,Producto: ${producto.producto}`
        lista += ` ,Marca: ${producto.marca}`
        lista += ` ,Modelo: ${producto.modelo}`
        lista += ` ,Categoría: ${producto.categoria}`
        lista += ` ,Stock: ${producto.stock}`
        lista += ` ,Precio: $${producto.precio}\n`
    }
    alert(`Lista de todos los productos:\n\n${lista}`)
    menuProductos()
}

// EJECUCION 
menuPrincipal()