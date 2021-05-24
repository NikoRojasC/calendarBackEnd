/*
    eventos Router
    /api/events
*/


const { Router } = require("express")
const { check } = require("express-validator")
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events")

const {validarJWT} = require('../middlewares/validateJWT')
const { validarCampos } = require("../middlewares/validation")
const {isDate} = require('../helpers/custom')


const router = Router()

router.use(validarJWT)

router.get('/',getEventos);

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','fecha de inicio es obligatoria').custom(isDate),
        check('end','fecha de finalizacion es obligatoria').custom(isDate),

        validarCampos
    ], 
    crearEvento);

router.put('/:id', actualizarEvento);

router.delete('/:id', eliminarEvento);


module.exports = router;