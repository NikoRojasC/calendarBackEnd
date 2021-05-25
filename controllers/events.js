const { response } = require("express");
const Evento = require("../models/Evento");


const getEventos = async(req, res = response)=>{

    try {
        const eventos = await Evento.find().populate('user','name')
        return res.status(200).json({
            ok:true,
            eventos
        })        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            masg: "hable con admin"
        })
    }
    
   
}

const crearEvento = async(req, res = response) =>{

    const evento = new Evento(req.body);

    try {
        evento.user= req.uid;
        await evento.save()

        return res.status(201).json({
            ok:true,
            evento
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el admin'
        })
    }

}

const actualizarEvento = async (req, res = response)=>{
    const evId = req.params.id;
    try {
        const evento = await Evento.findById(evId)
        if(!evento) {

            return res.status(404).json({
                ok:false,
                msg:"no existe evento"
            })
        }

        if( evento.user.toString() !== req.uid ){
            return res.status(401).json({
                ok:false,
                msg:"No tienes permiso de editar el evento"
            })
        }
        

        const nuevoEvento = {
            ...req.body,
            user:req.uid
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate(evId,nuevoEvento, {new:true});

        return res.status(201).json({
            ok:true,
            eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el admin'
        })
    }
    

}

const eliminarEvento = async(req, res= response) => {
    const evId = req.params.id;
    try {
        const evento = await Evento.findById(evId)
        if(!evento) {

            return res.status(404).json({
                ok:false,
                msg:"no existe evento"
            })
        }

        if( evento.user.toString() !== req.uid ){
            return res.status(401).json({
                ok:false,
                msg:"No tienes permiso de editar el evento"
            })
        }
        

       
        
        await Evento.findByIdAndRemove(evId);

        return res.status(201).json({
            ok:true,
            msg:"evento eliminado"
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}