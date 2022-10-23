const RoleModel = require("../models/employeeRoleModel");


function parseBody(body)
{
    retRole = new RoleModel();

    retRole.name = body.name;
    retRole.description = body.description;
    retRole.date = body.data;
    retRole.userId = body.user;
    return retRole;

}

module.exports = {parseBody}