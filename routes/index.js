
const  authRouter  = require('./auth');
const  siteRouter  = require('./site');
const userRouter = require('./user')

function route(app){
   app.use('/user',userRouter)
   app.use('/auth',authRouter)
   app.use('/',siteRouter)
}
module.exports = route;