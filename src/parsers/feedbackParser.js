const FeedbackModel = require("../models/feedbackModel");


function parseBody(body)
{
    retFeedBack = new FeedbackModel ();

    retFeedBack.user_id = body.user;
    retFeedBack.date = body.data;
    retFeedBack.goals = body.goals;
    retFeedBack.successes = body.successes;
    retFeedBack.mistakes = body.mistakes;
    return retFeedBack;

}

module.exports = {parseBody}