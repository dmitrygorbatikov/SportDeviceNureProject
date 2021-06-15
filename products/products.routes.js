const {Router} = require('express')
const router = Router()
const Product = require('../models/Product')
const Order = require('../models/Order')
const auth = require('../middleware/auth.middleware')


router.post('/create-product', async (req,res) => {
    try{
        const product = new Product({
            name: req.body.name,
            img: req.body.img,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            info: req.body.info
        })

        await product.save()
        return res.status(200).json(product)
    }catch (e) {
        return res.status(400).send({'error': e})
    }
})

router.get('/get-products', auth, async (req,res) => {
    try{
        await Product.find().then((products) => {
            return res.status(200).json(products)
        })
    }
    catch (e) {
        return res.status(400).send({'error': e})
    }
})
router.get('/get-product', auth, async (req,res) => {
    try{
        await Product.findById(req.query.id).then((product) => {
            return res.status(200).json(product)
        })
    }
    catch (e) {
        return res.status(400).send({'error': e})
    }
})

router.post('/create-order', auth, async (req,res) => {
    try{
        const order = new Order({
            user_name: req.body.user_name,
            user_surname: req.body.user_surname,
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            productId: req.body.productId,
            product_name: req.body.product_name,
            message: req.body.message,
            price: req.body.price,
            orderDateTime:
                new Date().toLocaleString('ru',
                {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: "numeric",
                    minute: "numeric"
                })
        })
        await order.save()
        res.status(200).json(order._id)
    }
    catch (e) {
        return res.status(400).send({'error': e})
    }
})


module.exports = router