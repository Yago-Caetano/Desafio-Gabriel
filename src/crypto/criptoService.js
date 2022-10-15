const bcrypt = require('bcrypt')
const saltRounds = 10


async function generateHash(texto)
{
   salt = await bcrypt.genSalt(saltRounds);
   psw = await bcrypt.hash(texto,salt);

   return psw;

}


async function checkPsw(txt,hash)
{
    try{
        result = await bcrypt.compare(txt,hash);
        return result;
    }
    catch{
        return false;
    }
}

module.exports={checkPsw,generateHash}