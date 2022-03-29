const cors=require('cors')
const {Router}=require('express');
const router= Router();
const { createEvent, updateEvent, deleteEvent, getEvents } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check}= require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../controllers/helpers/isDate');

router.use(validarJWT); //cada peticion tiene integrado el token con el id del usuario

router.get(
    '/getEvents',
    [
        
    ],
    getEvents
)

router.post(
    '/createEvent',
    [
        check('title', 'Título es obligatorio').not().isEmpty(),
        check('notes', 'Notas son obligatorias').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').not().isEmpty(),
        check('start', 'Fecha de inicio debe ser valida').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').not().isEmpty(),
        check('end', 'Fecha de finalización debe ser valida').custom(isDate),
        validateFields
    ],
    createEvent
)

router.put(
    '/updateEvent/:id',
    [

    ],
    updateEvent
)
router.delete(
    '/deleteEvent/:id',
    [

    ],
    deleteEvent
)


module.exports=router;
    
