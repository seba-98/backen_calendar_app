const {Router} = require('express');
const router= Router();
const {register, login, renew} = require('../controllers/auth');
const { check }= require('express-validator');
const {validateFields} = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');
const cors = require('cors');


router.post(
   '/new', 
   [//middlewares
      cors(),
      check('name', 'name required').not().isEmpty(),  
      check('email', 'email required').not().isEmpty().isEmail(),  
      check('password', 'password required').not().isEmpty().isLength({min:6}),  
      validateFields
   ], 
   register
);
router.post(
      '/login',
      [
         cors(),
         check('email', 'email required').notEmpty().isEmail(),
         check('password', 'password required').notEmpty().isLength({min:6}),
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


