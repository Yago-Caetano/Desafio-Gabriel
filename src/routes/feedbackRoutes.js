const express = require('express');
const routes = express.Router();
const {celebrate, Segments, Joi, CelebrateError} = require('celebrate');

const FeedbackController = require('../controllers/feedbackController');
const FeedbackParser = require('../parsers/feedbackParser');

routes.post("/",celebrate({
            [Segments.BODY]:Joi.object({
                user:Joi.string().required(),
                data:Joi.string().required(),
                goals:Joi.string().required(),
                successes:Joi.string().required(),
                mistakes:Joi.string().required()})    
            }),async (req,res)=>{

        await FeedbackController.insertFeedback(req,res,FeedbackParser.parseBody(req.body));

});

routes.delete("/:feedbackId",async (req,res)=>{
    await FeedbackController.deleteFeedback(req,res,req.params.feedbackId);
});

routes.get("/user/:userId",async (req,res)=>{
    await FeedbackController.getFeedBacks(req,res,req.params.userId);
});


routes.get("/:feedBackId",async (req,res)=>{
    await FeedbackController.getFeedback(req,res,req.params.feedBackId);
});

routes.put('/:feedBackId',celebrate({
    [Segments.BODY]:Joi.object({
        user:Joi.string().required(),
        data:Joi.string().required(),
        goals:Joi.string().required(),
        successes:Joi.string().required(),
        mistakes:Joi.string().required()})    
    }),async (req,res)=>{
    await FeedbackController.updateFeedback(req,res,req.params.feedBackId,FeedbackParser.parseBody(req.body));
});

module.exports=routes;
