var sequelize = require('sequelize')
var productoModelo = require('./models/producto')

// conexion con la bd
const conexion = new sequelize('productos','root','ggxd12.com',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

const producto = productoModelo(conexion);

conexion.sync({force:false})
.then(()=>{
    console.log('Conectado correctamente a la BD')
})
.catch((e)=>{
    console.log('Error de conexion:' + e)
})

module.exports ={
    producto
}