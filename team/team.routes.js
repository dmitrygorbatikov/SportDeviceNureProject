 const {Router} = require('express')
 const router = Router()
 const Team = require('../models/Team')
 const Sensor = require('../models/UserSensor')
 const User = require('../models/User')
 const Notification = require('../models/Notification')
 const auth = require('../middleware/auth.middleware')

router.post('/create-team', auth,  async (req, res) => {
     try {
     const team = new Team({
         team_name: req.body.team_name,
         leader: req.user.userId,
         description: req.body.description,
         img: req.body.img,
         users: [],
     });


         const savedTeam = await team.save();
         res.status(200).send(savedTeam);
     } catch (error) {
         res.status(400).send({'error': error});
     }
 });

router.delete('/delete-team', (req, res) => {
    try {
        Team.findByIdAndDelete({_id: req.header('id')}).then(() => {
            res.status(200).send({'status': 'deleted'});
        });
    }
    catch (e) {
        res.status(400).send({'error': e});
    }
})

router.post('/add-user',async (req, res) => {
    try {

        // await Team.findById({ _id: req.header('id')})
        //     .then(async (result) => {
        //     let arr = result.users;
        //     if (arr.includes(req.body.user_id)) {
        //         return res.status(200).send({ 'error': 'User already in this team'});
        //     }
        //     const sensor = new Sensor({
        //         speed: 0,
        //         impactPower: 0,
        //         heart_beat: 0,
        //         timer: 0,
        //         user: req.body.user_id
        //     })
        //     await sensor.save()
        //
        //     const user = await User.findById({ _id: req.body.user_id}).then(async (result) => {
        //         arr.push(result);
        //         let body = {
        //             'hasTeam': true
        //         }
        //         await User.findByIdAndUpdate({ _id: req.body.user_id}, body)
        //     })
        //
        //     let body = {
        //         'users': arr,
        //     }
        //
        //     await Team.findByIdAndUpdate({ _id: req.header('id')}, body).then(() => {
        //         res.status(200).send({'status': 'okay'})
        //     })
        // })
    } catch (error) {
        res.status(400).send({'error': error});
    }
});

router.get('/get-all-teams', async (req,res) => {
     try{
         const teams = await Team.find()
         res.status(200).json(teams)
     }
     catch (e){
         res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
     }
 })

router.get('/get-leader-teams', auth, async (req,res) => {
     try{
         const teams = await Team.find({leader: req.user.userId})
         res.status(200).json(teams)
     }
     catch (e) {
         res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
     }
 })

router.get('/get-user-teams', auth, async (req,res) => {
     try{
         await Team.find().then(async (teams) => {

             let arr = []
             for (let i = 0; i < teams.length; i++) {
                 if(teams[i].users.length > 0){
                     arr.push(teams[i])
                 }
             }
             let userTeamsId = []

             for (let i = 0; i < arr.length; i++) {
                 for (let j = 0; j < arr[i].users.length; j++) {
                     if(arr[i].users[j]._id.toString() == req.user.userId.toString()){
                         userTeamsId.push(arr[i]._id)
                     }
                 }
             }


             await Team.find({_id: userTeamsId}).then((userTeams) =>{
                 return res.status(200).json(userTeams)
             })
         })
     }
     catch (e) {
         res.status(400).json({message: e.message})
     }
 })

router.get('/:id', auth, async (req,res) => {
     try{
         const team = await Team.findById(req.params.id)
         res.status(200).json(team)
     }
     catch (e) {
         res.status(400).json({message: e.message})
     }
 })

router.post('/remove-user-from-team',auth, async (req, res) => {
     try{

         await Team.findById(req.query.id).then( async (result) => {
             let arr = result.users;

             await User.findById(req.user.userId).then(async () => {


                 let body = {
                     'hasTeam': true
                 }
                 await User.findByIdAndUpdate(req.user.userId, body).then((user) => {
                 })
             })

             arr = arr.filter((n) => n._id != req.user.userId);

             let body = {
                 'users': arr,
             }
             await Team.findByIdAndUpdate(req.query.id, body).then((team) => {
                 return res.status(200).send(team);
             });
         });
     }
     catch (error) {
         res.status(400).send({'error': error});
     }
 })

router.post('/create-request-to-team',auth, async (req,res) => {
     try{
         await Team.findById(req.query.id).then(async (team) => {

             const note = await Notification.findOne({team: team._id, userId: req.user.userId})

             if(note){
                 return res.status(200).json({message: "Вы уже отправляли запрос на вступление в эту команду"})
             }

             const user = await User.findById(req.user.userId)

             const userNote = `Вы отправили запрос на вступление в команду ${team.team_name}`
             const userNotification = new Notification({
                 from: req.user.userId,
                 leader: team.leader,
                 userId: req.user.userId,
                 note: userNote,
                 team: team._id
             })

             await userNotification.save()

             const leaderNote = `Игрок ${user.user_name} отправил запрос на вступление в вашу команду ${team.team_name}`


             const leaderNotification = new Notification({
                 from: req.user.userId,
                 leader: team.leader,
                 userId: team.leader,
                 note: leaderNote,
                 team: team._id

             })

             await leaderNotification.save()
             return res.status(200).json({message: "Ваш запрос был успешно отправлен"})
         })
     }
     catch (e) {
         res.status(400).send({'error': e});
     }
 })

 router.patch('/update-team-photo',auth, async (req,res) => {
     try{

            let body = {
                'img': req.body.img
            }

            await Team.findByIdAndUpdate(req.query.id, body).then(() => {
                res.status(200).json({message: 'Ok'})
            })

     }
     catch (e) {
         res.status(400).send({'error': e});
     }
 })

 router.patch('/delete-team-photo',auth, async (req,res) => {
     try{
         let body = {
             'img': ""
         }
         await Team.findByIdAndUpdate(req.query.id, body).then(() => {
             res.status(200).json({message: 'Ok'})
         })
     }
     catch (e) {
         res.status(400).send({'error': e});
     }
 })

module.exports = router