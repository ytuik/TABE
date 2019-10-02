const Joi = require('joi');
const express = require('express');
const aplicacao = require('express');

aplicacao.use(express.json())

app.get('/', (req, res) => {
	res.send('Ola mundo!');
});

app.get('/api/produtos', (req, res) => {
	res.send([]);
});

app.get('/api/buscar/:id', (req, res) => {
	res.send(req.query);
});

app.get('/api/produtos/:id', (req, res) => {
	let resposta = produtos.find(c => c.id === req.params.id)
	if(!resposta) res.status(404).send('O produto solicitado nao foi encontrado!')
	res.send(resposta)
	// Nao achei nada, erro 404
});

app.post('/api/courses', (req, res) => {

	// Usando Joi para validar

	const schema = {
		nome: Joi.string().min(3).required()
	};

	const resposta = Joi.validate(req.body, schema);
	console.log(resposta);


	// Validar logica do cliente

	if(!req.body.nome || req.body.nome.length < 3){
		// Erro 404 - Bad Request
		res.status(400).send('Busque por algo com mais de 3 caracteres');
		return;
	}

	let produto = {
		id: produto.length + 1,
		nome: req.body.nome
	};
	resposta.push(produto);
	res.send(produto);
});