const EmployeeModel = require('../models/employeeModel')
const employeeDAO = require('../DAO/employeeModelDAO')
const Cripto = require('../crypto/criptoService');

async function insertEmployee(req,res,employee)
{

    //hashSenha = await Cripto.generateHash(user.senha);

    emp = employeeDAO.build({
        func_nome: employee.name,
        func_telefone: employee.phone,
        func_nascimento: employee.birthday
    });

    try{
        await emp.save();         
        res.status(201).send({status:"Cadastrado com sucesso"})
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}


async function getSingleUser(req,res,userId)
{
    try
    {
        const mUser = await employeeDAO.findAll({  where: {
            func_id: userId
          }});
    
        res.status(200).send({mUser});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }

}

async function getUsers(req,res)
{
    try
    {
        const users = await employeeDAO.findAll();
        res.status(200).send({users});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}

async function deleteUser(req,res,userId)
{
    try{
        await employeeDAO.destroy({
            where: {
                func_id: userId
            }
          });

        res.status(200).send({status:"Removido com sucesso"});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}

async function updateUser(req,res,userId,employee)
{
    try{
        await employeeDAO.update({
            func_nome: employee.name,
            func_telefone: employee.phone,
            func_nascimento: employee.birthday
        },{
            where:{
                func_id: userId
            }
        });
        res.status(200).send({status:"Atualizado com sucesso"});
    }
    catch(err)
    {
        res.status(500).send({status:`${err}`})
    }
}

module.exports = {insertEmployee,getSingleUser,getUsers,deleteUser,updateUser}