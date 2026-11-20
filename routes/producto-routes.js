var router = require('express').Router()
const { where } = require('sequelize')
var {producto} = require('../conexion')

//ruta raiz
router.get('/',(req,res) =>{
    res.render('pages/index')
})

//ruta para abirr la pagina de incertar producto
router.get('/insertarProducto', (req,res) =>{
    res.render('pages/insertarProducto')
})
//ruta para incertar un producto nuevo
router.post('/guardarProducto',(req,res) =>{
    producto.create(req.body)
    .then(()=>{
        console.log('se incerto correctamente el producto')
        res.redirect('/listaProductos')
    })
    .catch((e)=>{
        console.log('Error al insertar: ' + e)
    })
})

//ruta de peticion para obtener todos los productos
router.get('/listaProductos',(req,res)=>{
    producto.findAll()
    .then((data)=>{
        res.render('pages/listaProductos',{producto:data})
    })
    .catch((e)=>{
        console.log('Error en la consulta: ' + e)
    })
})

//routa para buscar im producto por su ID
router.get('/buscarProducto/:idProducto',(req,res)=>{
    producto.findAll({
        where:{
            idProducto:req.params.idProducto
        }
    })
    .then((data)=>{
        res.render('pages/modificarProducto',{producto:data})
    })
    .catch((e)=>{
        console.log('Error en la consulta: ' + e)
    })
})

// ruta para modificar un producto
router.post('/modificarProducto',(req,res)=>{
    var idProducto = req.body.idProducto
    const productoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto
    }

    producto.update(productoModificado,{
        where:{
            idProducto: idProducto
        }
    })
    .then(()=>{
        console.log('Producto modificado exitosa mente')
        res.redirect('/listaProductos')
    })
    .catch((e)=>{
        console.log('Error aol modificar' + e)
    })
})

//Ruta para eliminar un producto
router.get('/eliminarProducto/:idProducto', (req,res)=>{
    producto.destroy({
        where:{
            idProducto: req.params.idProducto
        }
    })
    .then(()=>{
        console.log('Producto eliminado correctamente')
        res.redirect('/listaProductos')
    })
    .catch((e)=>{
        console.log('Error al eliminar el producto')
    })
})

module.exports = router;