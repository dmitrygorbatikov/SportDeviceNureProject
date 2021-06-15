const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.middleware.js')

const router = Router()


router.post(
    '/register',
    async (req,res) => {
        try {
            const candidate = await User.findOne({ email: req.body.email })

            if (candidate) {
                return res.json({message: 'Такой пользователь уже существует'})
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 12)

            let user_role = req.body.role

            if(user_role == null){
                user_role = "user"
            }

            const user = new User({
                user_name: req.body.user_name,
                surname: req.body.surname,
                email: req.body.email,
                password: hashedPassword,
                user_img: " ",
                role: user_role
            })


                await user.save()
                res.status(200).json({message: 'Пользователь создан!'})

            } catch (e) {
                res.status(400).json({message: e.message})

        }
    })

//

router.post(
    '/login',
    async (req,res) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }
            const isMatch = await  bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message:'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret')
            )
            res.status(200).send({token, userId: user.id})

        }
        catch (e) {
            res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})

        }
    })

router.get('/get-users', async (req, res) => {
        try{
            const users = await User.find()
            res.status(200).json({message: users})
        }
        catch (e){
            res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
})

router.delete('/delete-user', (req,res) => {
    try{
            User.findByIdAndDelete({ _id: req.header('id')}).then(() => {
                res.status(200).send({'status': 'deleted'});
            });
        }

    catch (e) {
        res.status(400).send({ 'error': e });
    }
})

router.patch('/update-user-name', auth, async (req,res) => {
    try{
            let body = {
                'user_name': req.body.user_name,
            }
            if(body.user_name == ""){
                return res.status(400).json({message: "Введите имя"})
            }

            await User.findByIdAndUpdate({_id: req.user.userId}, body).then(() => {
                res.status(200).send({message: 'updated'})
            })
    }
    catch(e){
        res.status(400).send({ 'error': e });
    }
})

router.patch('/update-user-surname', auth, async (req,res) => {
    try{
            let body = {
                'surname': req.body.surname,
            }
            if(body.surname == ""){
                return res.status(400).json({message: "Введите фамилию"})
            }

            await User.findByIdAndUpdate({_id: req.user.userId}, body).then(() => {
                res.status(200).send({message: 'updated'})
            })
    }
    catch(e){
        res.status(400).send({ 'error': e });
    }
})

router.get('/getData', auth, async (req, res) => {
    try{
        const data = await User.findById(req.user.userId)
        res.send(data)
    }
    catch (e) {
        res.status(400).send({ 'error': e });
    }
})

router.get('/get-leader', auth, async (req, res) => {
    try{
        const data = await User.findById(req.query.id)
        return res.status(200).send(data)
    }
    catch (e) {
        res.status(400).send({ 'error': e });
    }
})

router.patch('/save-user-photo', auth, async (req, res) => {
    try{
        await User.findById(req.user.userId).then(async () => {
            let body = {
                'user_img': req.body.user_img
            }
            await User.findByIdAndUpdate(req.user.userId, body).then((result) => {
                res.status(200).json(result)
            })

        })

    }
    catch (e) {
        res.status(400).send({ 'error': e });
    }
})
router.patch('/delete-user-photo', auth, async (req,res) => {
    try{
        await User.findById(req.user.userId).then(async () => {
            let body = {
                'user_img': " "
            }
            await User.findByIdAndUpdate(req.user.userId, body).then((result) => {
                res.status(200).json({message: 'updated'})
            })

        })
    }
    catch (e) {
        res.status(400).send({ 'error': e });
    }
})



module.exports = router