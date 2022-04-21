const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now},

});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body){
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function(){
  this.validate();
  if(this.errors.length>0) return;
  this.contato = await ContatoModel.create(this.body);

};


Contato.prototype.validate= function() {
  this.cleanup();
  //Validação dos campos
  //O email precisar ser válido
  if(this.body.email && !validator.isEmail(this.body.email)){
    this.errors.push('Email inválido');
  }
  if(!this.body.nome) this.errors.push('You must type a name');
  if(!this.body.email && !this.body.telefone){
    this.errors.push('At least one contact information must be typed: email or phone');
  } 

}

Contato.prototype.cleanup = function(){  
  for(const key in this.body){
    if (typeof this.body[key] !== 'string'){
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone,
  };
}

Contato.prototype.edit = async function(id){
  if(typeof id !== 'string') return;
  this.validate();
  if(this.errors.length>0) return;
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new:true});
}

//Métodos estáticos 
Contato.findById = async function(id){
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findById(id);
  return contato;
}

Contato.findContatos = async function(){
  const contatos = await ContatoModel.find()
  .sort({criadoEm: -1});
  return contatos;
}

Contato.delete = async function(id){
  if(typeof id !== 'string') return;
  const contato = await ContatoModel.findOneAndDelete({_id:id});
  return contato;
}

module.exports = Contato;