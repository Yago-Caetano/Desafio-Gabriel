const RoleModel = require('../models/employeeRoleModel')
const RoleDAO = require('../DAO/employeeRoleDAO')
const Cripto = require('../crypto/criptoService');
const sequelize = require('../connection/database');

const { create_UUID } = require('../utils/UuidGenerator');

async function insertRole(req,res,role)
{


    try{

         await sequelize.query("CALL proc_add_func_cargo  (:p_func_id , :pcargo_id, :p_cargo , :p_cargo_data, :p_cargo_descricao)",
                            {replacements:{p_func_id:role.userId,pcargo_id:`${create_UUID()}`,p_cargo: role.name, p_cargo_data: role.date,p_cargo_descricao: role.description}});

        res.status(201).send({status:"Cadastrado com sucesso"})
    }
    catch(err){
        console.log(err)
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
        const roles = await sequelize.query("CALL proc_get_cargos_by_user (:p_func_id )",{replacements:{p_func_id:userId}});
        res.status(200).send({roles});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}

async function deleteRole(req,res,roleId)
{
    try{
       
        const resp = await sequelize.query("CALL proc_remove_cargo_func (:p_role_id )",{replacements:{p_role_id:roleId}});
        console.log(resp);
        
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
            cargo_descricao: role.description,
            cargo_data: role.date
        },{
            where:{
                cargo_id: roleId
            }
        });
        res.status(200).send({status:"Atualizado com sucesso"});
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({status:`${err}`})
    }
}

module.exports = {insertRole,getRole,getRoles,deleteRole,updateRole}