const { Schema, model } = require("mongoose");
const User = require('./User')

const EventoModel = Schema({
    
    title: {
        type:String,
        required:true
    },

    notes: {
        type:String,
    },

    start:{
        type: Date,
        required: true
    },

    end:{
        type: Date,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

})

EventoModel.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id=_id;
    return object
})

module.exports= model('Evento', EventoModel);