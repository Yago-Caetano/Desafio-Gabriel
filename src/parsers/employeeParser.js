const EmployeeModel = require("../models/employeeModel");


function parseBody(body)
{
    retUser = new EmployeeModel ();

    retUser.name = body.nome;
    retUser.document = body.documento;
    retUser.birthday = body.nascimento;
    retUser.phone = body.telefone;
    return retUser;

}

module.exports = {parseBody}