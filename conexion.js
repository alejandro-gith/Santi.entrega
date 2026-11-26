var sequelize = require('sequelize')
var productoModelo = require('./models/producto')

// conexion local la bd
/*const conexion = new sequelize('productos','root','ggxd12.com',{
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});
*/
// conexion remota
const conexion = new sequelize('productos','3cAKuHniAKNVDrd.root','lXFLRB7GSA4BB5ez',{
    host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
    port: '4000',
    dialect: 'mysql',
    dialectOptions:{
        ssl:{
            minVersion:'TLSv1.2',
            rejectUnauthorized:true
        }
    }
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