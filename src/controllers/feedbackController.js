const FeedbackModel = require('../models/feedbackModel')
const FeedbackDAO = require('../DAO/feedbackModelDAO')
const Cripto = require('../crypto/criptoService');

async function insertFeedback(req,res,feedback)
{

    //hashSenha = await Cripto.generateHash(user.senha);

    emp = FeedbackDAO.build({
        feed_data: feedback.data,
        feed_metas: feedback.goals,
        feed_pontos_positivos: feedback.successes,
        feed_pontos_negativos: feedback.mistakes
    });

    try{
        await emp.save();
        /**
         * @TODO Implementar SP
         *  */         
        res.status(201).send({status:"Cadastrado com sucesso"})
    }
    catch(err){
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
        /**
         * @TODO Implementar SP
         *  */         
        const users = await FeedbackDAO.findAll({where:{}});
        res.status(200).send({users});
    }
    catch(err){
        res.status(500).send({status:`${err}`})
    }
}

async function deleteFeedback(req,res,feedId)
{
    try{
        /**
         * @TODO Implementar SP
         *  */         
        await FeedbackDAO.destroy({
            where: {
                feed_id: feedId
            }
          });

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
            feed_data: feedback.data,
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
        res.status(500).send({status:`${err}`})
    }
}

module.exports = {insertFeedback,getFeedback,getFeedBacks,deleteFeedback,updateFeedback}