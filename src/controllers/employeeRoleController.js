const RoleModel = require('../models/employeeRoleModel')
const RoleDAO = require('../DAO/employeeRoleDAO')
const Cripto = require('../crypto/criptoService');

async function insertRole(req,res,role)
{

    //hashSenha = await Cripto.generateHash(user.senha);

    mRole = RoleDAO.build({
        cargo: role.name,
        cargo_descricao: role.description
    });

    try{
        await mRole.save();
        /**
         * @TODO Implementar SP
         *  */         
        res.status(201).send({status:"Cadastrado com sucesso"})
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}


async function getRole(req,res,roleId)
{
    try
    {
        const ret = await RoleDAO.findAll({  where: {
            cargo_id: roleId
          }});
    
        res.status(200).send({role:ret});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }

}

async function getRoles(req,res,userId)
{
    try
    {
        /**
         * @TODO Implementar SP
         *  */         
        const roles = await RoleDAO.findAll({where:{}});
        res.status(200).send({roles});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}

async function deleteRole(req,res,roleId)
{
    try{
        /**
         * @TODO Implementar SP
         *  */         
        await RoleDAO.destroy({
            where: {
                cargo_id: roleId
            }
          });

        res.status(200).send({status:"Removido com sucesso"});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}

async function updateRole(req,res,roleId,role)
{
    try{
        await RoleDAO.update({
            cargo: role.name,
            cargo_descricao: role.description
        },{
            where:{
                cargo_id: roleId
            }
        });
        res.status(200).send({status:"Atualizado com sucesso"});
    }
    catch(err)
    {
        res.status(500).send({status:`${err}`})
    }
}

module.exports = {insertRole,getRole,getRoles,deleteRole,updateRole}