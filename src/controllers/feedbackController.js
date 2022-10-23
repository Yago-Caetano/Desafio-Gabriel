const FeedbackModel = require('../models/feedbackModel')
const FeedbackDAO = require('../DAO/feedbackModelDAO')
const Cripto = require('../crypto/criptoService');
const sequelize = require('../connection/database');
const Uuid = require("../utils/UuidGenerator");

async function insertFeedback(req,res,feedback)
{

    try{

         await sequelize.query("CALL proc_add_feedback (:pfeed_id, :pfeed_data, :pfeed_metas, :pfeed_pontos_positivos, :pfeed_pontos_negativos, :p_func_id)",
                            {replacements:{pfeed_id:Uuid.create_UUID(),pfeed_data:feedback.date,pfeed_metas:feedback.goals, pfeed_pontos_positivos: feedback.successes,pfeed_pontos_negativos: feedback.mistakes, p_func_id:feedback.user_id}})    
        res.status(201).send({status:"Cadastrado com sucesso"})
    }
    catch(err){
        console.log(err);
        res.status(500).send({status:`${err}`})
    }
}


async function getFeedback(req,res,feedId)
{
    try
    {
        const ret = await FeedbackDAO.findAll({  where: {
            feed_id: feedId
          }});
    
        res.status(200).send({feedback:ret});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }

}

async function getFeedBacks(req,res,userId)
{
    try
    {       
         const retUsers = await sequelize.query("CALL proc_get_feed_by_user (:p_func_id )",{replacements:{p_func_id:userId}});
         console.log(retUsers);
         res.status(200).send({users:retUsers});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}

async function deleteFeedback(req,res,feedId)
{
    try{  
         await sequelize.query("CALL proc_remove_feedback_func (:pfeed_id)",
         {replacements:{pfeed_id:feedId}});    
        
        res.status(200).send({status:"Removido com sucesso"});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}

async function updateFeedback(req,res,feedId,feedback)
{
    try{
        await FeedbackDAO.update({
            feed_data: feedback.date,
            feed_metas: feedback.goals,
            feed_pontos_positivos: feedback.successes,
            feed_pontos_negativos: feedback.mistakes
        },{
            where:{
                feed_id: feedId
            }
        });
        res.status(200).send({status:"Atualizado com sucesso"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({status:`${err}`})
    }
}

module.exports = {insertFeedback,getFeedback,getFeedBacks,deleteFeedback,updateFeedback}