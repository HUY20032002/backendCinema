const mongosse = require('mongoose')
async function connect(){

try {
    await mongosse.connect('mongodb://localhost:27017/Cinema',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("Connect successfully!!!!!!!")
} catch (error) {
    console.log("Connect fail!!!!!!!")
}

}


module.exports = {connect};