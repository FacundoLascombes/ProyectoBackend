const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
const { json } = require('stream/consumers');

var contId;

class Contenedor {
  constructor (nomarch) {
    this.nomarch = nomarch;
  }

  async save (object) {
    try {
      if (!fs.existsSync('./archivo.txt')){
        object.id = 1;
        await fs.promises.appendFile('./archivo.txt', JSON.stringify([object]))
        console.log('Agregado');
        console.log(object.id);
        return (object.id);
        //Crea el archivo por primera vez poniendolo en un array
      }
      else{
        var conten = await fs.promises.readFile('./archivo.txt', 'utf-8');
        var content = JSON.parse(conten);
        object.id = content.length + 1;
        content.push(object);
        var cont = JSON.stringify(content);
        fs.unlinkSync('./archivo.txt');
        fs.promises.appendFile('./archivo.txt', (cont));
        console.log('Agregado');
        console.log(object.id);
        return (object.id);
        //Trae al archivo y lo convierte en objeto para pushear el nuevo objeto al final en el mismo array
      }
    }
    catch (err) {
      console.log('No se pudo escribir el archivo', err);
    }
  }

  async getById(number) {
    try {
        const contenido = await fs.promises.readFile('./archivo.txt', 'utf-8');
        //console.log(contenido);
        var content = JSON.parse(contenido);
        const ide = content.find(i => i.id == number);
        console.log(ide);
    }
    catch (err) {
      console.log('No se pudo leer el archivo', err);
    }
}

async getAll() {
  try {
      var contenido = await fs.promises.readFile('./archivo.txt', 'utf-8');
      var contenidoConvertido = JSON.parse(contenido);
      return contenidoConvertido;
  }
  catch (err) {
    console.log('No se pudieron retornar los objetos', err);
  }
}

async deleteById(number) {
  try {
      const contenido = await fs.promises.readFile('./archivo.txt', 'utf-8');
      var content = JSON.parse(contenido);
      
      for (let i = 0; i < content.length; i++) {
        if (number == content[i].id) {
          content.splice(i, 1);
          console.log(content);
        }
      }
      
      fs.unlinkSync('./archivo.txt');
      this.save(content);
      
  }
  catch (err) {
    console.log('No se pudo leer el archivo', err);
  }
}

  async deleteAll() {
    try {
      await fs.promises.writeFile('./archivo.txt', '');
  }
  catch (err) {
    console.log('No se pudieron borrar los objetos', err);
  }
  }
}

  let Container = new Contenedor("archivo.txt");

  var objeto1 = {
        title: ('Computadora'),
        price: ('$100'),
        thumbnail: ('img.com')
  };
  var objeto2 = {
    title: ('Celular'),
    price: ('$200'),
    thumbnail: ('img.com')
  };
  var objeto3 = {
    title: ('Mouse'),
    price: ('$150'),
    thumbnail: ('img.com')
  };
  var objeto4 = {
    title: ('Teclado'),
    price: ('$130'),
    thumbnail: ('img.com')
  };

  //Container.save(objeto4);
  //Container.getById(2);
  //Container.getAll();
  //Container.deleteById(1);
  //Container.deleteAll();

  module.exports = Contenedor;