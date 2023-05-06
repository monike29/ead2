const Cliente= require('../models/cliente')
const controller = {}

controller.listarTodos = async (req, res) => {
    try{
        let cliente = await Cliente.findAll()
        res.status(200).json(cliente)
    }catch(error){
        res.status(500).json(error)
    }
}

controller.buscarporId = async (req, res) => {
    try{
        const cliente = await Cliente.findByPk(req.params.id)
        res.status(200).json(cliente)
    }catch(error){ 
        res.status(422).json("Ocorreu um erro ao buscar o cliente. " + error)
    }
}

controller.buscarPorCidade = async (req, res) => {
    try{
        const cliente = await Cliente.findAll({where: {cidade: req.params.cidade}})
        res.status(200).json(cliente)
    }catch(error){
        res.status(422).json("Nenhum cliente encontrado. " + error)
    }
}

controller.atualizar = async(req,res) =>{
    try{
        let cliente = await Cliente.findByPk(req.params.id);
        cliente.nome = req.body.nome;
        cliente.email = req.body.email;
        cliente.cidade = req.body.cidade;
        cliente.estado = req.body.estado;
        cliente.cep = req.body.cep;
        await cliente.save();
        res.status(200).json(cliente);
    }catch(error){
        res.status(422).json("Erro ao atualizar cliente. " + error);
    }
}

controller.criar = async (req, res) => {
    let reqCliente = req.body
    try{
        const newCliente = await Cliente.create({
            id: reqCliente.id,
            nome: reqCliente.nome,
            email: reqCliente.email,
            cidade: reqCliente.cidade,
            cep: reqCliente.cep 
        })
        res.status(200).redirect("/")
    }catch(error){ 
        res.status(422).send("Ocorreu um erro ao cadastrar o cliente. " + error)
    }

}

controller.atualizar = async (req, res) => {
    try{
        let cliente= await Cliente.findByPk(req.params.id)
        cliente.descricao = req.body.nome
        await cliente.save()
        res.status(200).redirect("/")
    }catch (error){
        res.status(422).send("Ocorreu um erro ao atualizar o cliente. " + error)
    }
}

controller.excluir = async (req, res) => {
    try{
        const cliente = Cliente.findByPk(req.params.id)
        Cliente.destroy()
        res.status(200).redirect('/')
    }catch(error){
        res.status(422).json("Erro ao deletar cliente " + error)
    }
}

module.exports = controller