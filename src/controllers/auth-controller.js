
const authenticate = (req, res) =>{
    //Validando dados obrigatórios
    if(!req.body.login || !req.body.senha){
        return res.status(404).send({message: 'Login e senha são obrigatórios'});
    }
};

exports.modules = {
    Authenticate : authenticate
};
