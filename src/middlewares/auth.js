const jwt = require('jsonwebtoken');

require ('dotenv/config');

module.exports = {

    auth(req,res,next){

        const authHeader = req.headers.authorization;
    
        if(!authHeader)
            return res.status(401).send('Operação não autorizada, verifique suas permissões');
    
        const [,token] = authHeader.split(' '); //separa o token ['bearer', 'token']
    
        try{
            const payload = jwt.verify(token,process.env.MY_JWT_KEY);
    
            //recupera o mac associado ao token e adciona na request
            req.idCliente = payload.userId;
            req.clientLevel = payload.level;
            
            /*console.log(`Id associado ao token: ${req.idCliente}`);
            console.log(`Nivel associado: ${req.clientLevel}`);
            */
            return next(); //continua a promisse
            
        }
        catch(err)
        {
            return res.status(401).send('Invalid token');
        }
    }
}
