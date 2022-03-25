const {Router} = require('express');
const router= Router();
const {register, login, renew} = require('../controllers/auth');
const { check }= require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');
const cors = require('cors');
const { validatePasswords } = require('../controllers/helpers/validatePasswords');


router.post(
   '/new', 
   [//middlewares
      cors(),
      check('name', 'El nombre es requerido').not().isEmpty(),  
      check('email', 'El email es requerido').not().isEmpty(),  
      check('email', 'El email debe tener un formato valido').isEmail(),  
      check('password', 'La contraseña es requerida').not().isEmpty(),  
      check('password', 'La contraseña debe ser de al menos 6 caracteres').isLength({min:6}),
      check('confirmPassword', 'La confirmación de la contraseña es requerida').not().isEmpty(),
      check('confirmPassword', 'Las contraseñas no coinciden').custom(validatePasswords),
      validateFields
   ], 
   register
);
router.post(
   '/login',
   [
      cors(),
      check('email', 'Email es requerido y debe tener un formato válido').notEmpty(),
      check('email', 'El email debe tener un formato valido').isEmail(), 
      check('password', 'La contraseña es requerida').notEmpty(),
      check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}),
      validateFields
   ],
   login
 );
router.get(
   '/renew',
   [
      cors(),      
      validarJWT
   ], 
   renew
);


module.exports = router;


