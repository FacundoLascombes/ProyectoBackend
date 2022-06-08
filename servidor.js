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