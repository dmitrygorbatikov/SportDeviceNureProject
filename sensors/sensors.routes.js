const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const Sensor = require('../models/UserSensor')
const Team = require('../models/Team')
const Notification = require('../models/Notification')
const auth = require('../middleware/auth.middleware')


const router = Router()

router.patch('/start-sensor', async (req, res) => {
    try{
        const team = await Team.findById({_id: req.header('id')})

        let users = team.users

        let sensor = await Sensor.find({user: users})

        let arr = []
        for( let i = 0; i< users.length; i++ ){
            arr.push(sensor[i].id)
        }

         let body = {
             'speed': req.body.speed,
             'impactPower': req.body.impactPower,
             'heart_beat': req.body.heart_beat,
             'timer': req.body.timer
         }

        for( let i = 0; i< arr.length; i++ ) {
            await Sensor.findByIdAndUpdate({_id: arr[i]}, body)
        }
        let changedSensors = []
        for( let i = 0; i< arr.length; i++ ) {
            let sensors = await Sensor.findById({_id: arr[i]})
            changedSensors.push(sensors)
        }
        res.status(200).send({message:  changedSensors})
    }
    catch (e) {
        res.status(400).send({'error': e});
    }
})

router.get('/get-team-sensors', async (req, res) => {
    try{
        const team = await Team.findById({_id: req.header('id')})

        let users = team.users

        let sensor = await Sensor.find({user: users})

        res.status(200).send(sensor)
    }
    catch (e) {
        res.status(400).send({'error': e});
    }
})

router.get('/get-user-notes',auth, async (req,res) => {
    try{
        let notes = await Notification.find({userId: req.user.userId})
        return res.status(200).json(notes)
    }
    catch (e) {
        res.status(400).send({'error': e});
    }
})

router.delete('/delete-user-note',auth, async (req,res) => {
    try{
        let count = 0
        await Notification.find({from: req.user.userId, team: req.header('team') }).then(async (notes) => {
            if(notes.length == 2) {
                let fstNote = notes[0]
                let sndNote = notes[1]
                count++
                await Notification.findByIdAndDelete(fstNote._id)
                await Notification.findByIdAndDelete(sndNote._id)

                return res.status(200).json({message: 'deleted'})
            }
        })
        if(count == 0){
            await Notification.findByIdAndDelete(req.header('noteId'))
            return res.status(200).json({message: 'deleted'})
        }



    }catch (e) {
        res.status(400).send({'error': e});
    }
})

router.delete('/delete-leader-note', auth, async (req,res) => {
    try{
        await Notification.findById(req.header('noteId')).then(async (result) => {
            await Notification.find({from: result.from, team: req.header('team') }).then(async (notes) => {

                let fstNote = notes[0]
                let sndNote = notes[1]

                await Notification.findByIdAndDelete(fstNote._id)
                await Notification.findByIdAndDelete(sndNote._id)

                const team = await Team.findById(result.team)

                const notification = new Notification({
                    from: "0",
                    leader: req.user.userId,
                    userId: result.from,
                    note: `Вам было отказано во вступлении в команду ${team.team_name}`,
                    team: result.team
                })
                await notification.save()

                return res.status(200).json({message: 'deleted'})

            })
        })
    }
    catch (e) {
        res.status(400).send({'error': e});
    }
})

router.post('/confirm-leader-note', auth, async (req,res) => {
    try{
        await Notification.findById(req.header('noteId')).then(async (result) => {
            await Notification.find({from: result.from, team: req.header('team') }).then(async (notes) => {
                let fstNote = notes[0]
                let sndNote = notes[1]

                await Notification.findByIdAndDelete(fstNote._id)
                await Notification.findByIdAndDelete(sndNote._id)

                const team = await Team.findById(req.header('team'))

                const notification = new Notification({
                    from: "0",
                    leader: req.user.userId,
                    userId: req.header('userId'),
                    note: `Вы были приняты в команду ${team.team_name}`,
                    team: req.header('team')
                })
                await notification.save()

            })
        })
        await Team.findById(req.header('team')).then(async (result) => {
            let arr = result.users;

            if (arr.includes(req.header('userId'))) {
                return res.status(200).send({message: "Пользователь уже в команде"});
            }
            // const sensor = new Sensor({
            //     speed: 0,
            //     impactPower: 0,
            //     heart_beat: 0,
            //     timer: 0,
            //     user: req.body.user_id
            // })
            // await sensor.save()


                let hasTeam = {
                    'hasTeam': true
                }
                await User.findByIdAndUpdate(req.header('userId'), hasTeam).then((result) => {
                    arr.push(result);
                })


            let body = {
                'users': arr,
            }

            await Team.findByIdAndUpdate(req.header('team'), body).then((updated) => {
                return res.status(200).json({message: "Пользователь был успешно добавлен в команду"})
            })
        })
    }
    catch (e) {
        res.status(400).send({'error': e});
    }
})

router.delete('/delete-user-by-leader',auth, async (req,res) => {
    try{
        await Team.findById(req.query.id).then( async (result) => {

            const notification = new Notification({
                from: "0",
                leader: req.user.userId,
                userId: req.header('userId'),
                note: `Вы были исключены из команды "${result.team_name}"`,
                team: result._id
            })
            await notification.save()

            let arr = result.users

            let hasTeam = {
                'hasTeam': true
            }
            await User.findByIdAndUpdate(req.header('userId'), hasTeam)

            arr = arr.filter((n) => n._id != req.header('userId'))

            let body = {
                'users': arr,
            }
            await Team.findByIdAndUpdate(req.query.id, body).then((team) => {
                return res.status(200).json({message: "Пользователь был удалён из команды"})
            })
        })
    }catch (e) {
        return res.status(400).send({'error': e})
    }
})






module.exports = router