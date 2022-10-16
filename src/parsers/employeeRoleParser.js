const RoleModel = require("../models/employeeRoleModel");


function parseBody(body)
{
    retRole = new FeedbackModel ();

    retRole.name = body.name;
    retRole.description = body.description;

    return retRole;

}

module.exports = {parseBody}