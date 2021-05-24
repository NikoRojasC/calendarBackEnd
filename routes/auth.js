/*
    Rutas de Auth
    host + /api/auth
*/

const {Router} = require('express')
const { check } = require('express-validator')
const { crearUsuario, revalidateToken, loginUsuario } = require('../controllers/auth')
const { validarJWT } = require('../middlewares/validateJWT')
const { validarCampos } = require('../middlewares/validation')

const router = Router()


router.post(
    '/', 
    [
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6}),
        validarCampos
    ] , 
    loginUsuario)

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El Email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario)

router.get('/renew',validarJWT, revalidateToken)



module.exports = router;