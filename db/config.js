const mongoose = require("mongoose");

const dbConnection = async() =>{
    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true
        });

        console.log('conecto a la base de datos')

    }
    catch(error) {
        console.log(error)
        throw new Error('error al iniciar la db')
    }
}


module.exports = {
    dbConnection
}