const express = require('express');
const routes = express.Router();
const {celebrate, Segments, Joi, CelebrateError} = require('celebrate');

const EmployeeController = require('../controllers/employeeController');
const Employee = require('../DAO/employeeModelDAO');
const EmployeeParser = require('../parsers/employeeParser');

const authMiddleware = require('../middlewares/auth');
const SessionController = require('../controllers/SessionController');



routes.post('/',celebrate({
    [Segments.BODY]:Joi.object({
                    nome:Joi.string().required(),
                    telefone:Joi.string().required(),
                    nascimento:Joi.string().required()
                    })    
            }),async (req,res)=>{

                body = req.body;
            
                EmployeeController.insertEmployee(req,res,EmployeeParser.parseBody(body));
    
});



//routes.use(authMiddleware.auth);

routes.get('/',async (req,res)=>{
    EmployeeController.getUsers(req,res);
})


routes.get('/:userId', async (req,res)=>{
    EmployeeController.getSingleUser(req,res,req.params.userId);
})

routes.put('/:userId',celebrate({
    [Segments.BODY]:Joi.object({
            nome:Joi.string().required(),
            telefone:Joi.string().required(),
            nascimento:Joi.string().required()
                })    
            }),async (req,res)=>{

            body = req.body
            EmployeeController.updateUser(req,res,req.params.userId,EmployeeParser.parseBody(body));

})

routes.delete('/:userId',async (req,res)=>{
    EmployeeController.deleteUser(req,res,req.params.userId);
})

module.exports = routes;
