const Contato = require('../models/contatoModel');
const contato = require('../models/contatoModel');

exports.index = async(req, res) => {
  const contatos = await Contato.findContatos();
    res.render('index', {contatos});
    return;
  };
  
  