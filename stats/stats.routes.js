const {Router} = require('express')
const jwt = require('jsonwebtoken')
const Sensor = require('../models/UserSensor')
const Team = require('../models/Team')


const router = Router()

router.get('/average-value-on-team', async (req,res) => {
    try{
        const team = await Team.findById({_id: req.header('id')})

        let users = team.users

        let sensor = await Sensor.find({user: users})

        let speed_arr = []
        let impactPower_arr = []
        let heart_beat_arr = []
        let timer_arr = []
        for( let i = 0; i< users.length; i++ ){
            speed_arr.push(sensor[i].speed)
            impactPower_arr.push(sensor[i].impactPower)
            heart_beat_arr.push(sensor[i].heart_beat)
            timer_arr.push(sensor[i].timer)
        }

        let avg_speed_sum = 0
        let avg_impactPower = 0
        let avg_heart_beat = 0
        let avg_timer = 0

        for(let i = 0; i< users.length; i++){
            avg_speed_sum += speed_arr[i]
        }
        for(let i = 0; i< users.length; i++){
            avg_impactPower += impactPower_arr[i]
        }
        for(let i = 0; i< users.length; i++){
            avg_heart_beat += heart_beat_arr[i]
        }
        for(let i = 0; i< users.length; i++){
            avg_timer += timer_arr[i]
        }



        res.status(200).send({
            'avg_speed_sum': avg_speed_sum/users.length,
            'avg_impactPower': avg_impactPower/users.length,
            'avg_heart_beat': avg_heart_beat/users.length,
            'avg_timer': avg_timer/users.length,
        })
    }
    catch (e) {
        res.status(400).send({'error': e});
    }
})



module.exports = router