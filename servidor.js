const express = require('express');
const Contenedor = require('./archivos.js');

const app = express();
const ContenedorProductos = new Contenedor('./archivo.txt');

const PORT = 8080;

app.listen(PORT, () => console.log(`Server corriendo en el puerto: ${PORT}`));


app.get('/productos', async (req, res) => {
    try {
        const productos = await ContenedorProductos.getAll();
        console.log(productos);
        res.send(productos);
    } catch (error) {
        res.send('error');
    }
})

app.get('/productorandom', async (req, res) => {
    const productos = await ContenedorProductos.getAll();

    const random = Math.floor(Math.random() * productos.length);

    res.send(productos[random]);
})

// app.get('/api/productos', async (req, res) => {
//     const productos = await ContenedorProductos.getAll();

//     res.send(productos);
// })

app.get('/api/productos/:id', async (req, res) => {
    const productos = await ContenedorProductos.getAll();
    let id = req.params.id;
    
    if (productos[id] != null) {
        let product = productos[id];
        res.json({result: "Todo ok", producto: product});
    }   else {
        res.json({error: "producto no encontrado"})
    }
})

app.post('/api/productos', async (req, res) => {
    const productos = await ContenedorProductos.getAll();
    let id = productos.length+1;

    productoNuevo = [{title: "Tablet", price: "2300", thumbnail: "img.com", id: id}];
    
    productos.push(productoNuevo);
    res.json({productos});
})

app.put('/api/productos/:id', async (req, res) => {
    const productos = await ContenedorProductos.getAll();
    let ProductoID = parseInt(req.params.id);
    let Producto = ({title: "Shampoo", price: "3200"});
    let productoEncontrado = productos.find( product =>
       product.id === ProductoID);

    productoEncontrado.title = Producto.title;
    productoEncontrado.price = Producto.price;

    res.json({Product: productoEncontrado});
})

app.delete('/api/productos/:id', async (req, res) => {
    const productos = await ContenedorProductos.getAll();
    let ProductoID = parseInt(req.params.id);

    productos.splice(ProductoID-1, 1);

    res.json({productos});
})