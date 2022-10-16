const express = require('express');
const routes = express.Router();
const {celebrate, Segments, Joi, CelebrateError} = require('celebrate');

const RoleController = require('../controllers/employeeRoleController');
const RoleDAO = require('../DAO/employeeRoleDAO');
const RoleParser = require('../parsers/employeeRoleParser');


routes.post('/',celebrate({
    [Segments.BODY]:Joi.object({
                    name:Joi.string().required(),
                    description:Joi.string().required()
                    })    
            }),async (req,res)=>{

                body = req.body;
            
                RoleController.insertRole(req,res,RoleParser.parseBody(body));
    
});



//routes.use(authMiddleware.auth);


routes.get('user/:userId', async (req,res)=>{
    await RoleController.getRoles(req,res,req.params.userId);
})

routes.put('/:roleID',celebrate({
    [Segments.BODY]:Joi.object({
            name:Joi.string().required(),
            description:Joi.string().required()
                })    
            }),async (req,res)=>{

            body = req.body
            RoleController.updateRole(req,res,req.params.roleID,RoleParser.parseBody(body));

})

routes.delete('/:roleID',async (req,res)=>{
    RoleController.deleteUser(req,res,req.params.roleID);
})

module.exports = routes;
