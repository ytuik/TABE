/* Para instalar:
*  npm install -g nodemon
*  npm install @hapi/joi express mysql
*  Para rodar:
*  npm init (depois preencher os dados)
*  (estando na pasta da aplicacao) nodemon
*/
const mysql = require('mysql');
const Joi = require('joi');
const express = require('express');
const aplicacao = require('express');

// Config do banco de dados
const db = mysql.createConnection({
	host: 'localhost',
	user: 'admin',
	password: '12345789'
});

db.connect((err) => {
	if(err){
		throw err;
	}
	
	console.log('Conectado ao MySQL');
});

aplicacao.use(express.json())

// Cria o banco de dados
app.get('/criarBD', (req, res) => {
	let sql = 'CREATE DATABASE mysql_db';
	db.querry(sql, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Database criada com sucesso!');
	}
});

// Cria tabelas
app.get('/criarTabelas', (req, res) => {
	let sql = 'CREATE TABLE prods(id int AUTO_INCREMENT, nome VARCHAR(255), descricao VARCHAR(255) PRIMARY KEY (id))';
	db.query(sql, (err, result)
});
	
// Selecionar produtos
app.get('/getProdutos', (req, res) => {
	let sql = 'SELECT * FROM prods';
	let query = db.querry(sql, (err, results) => {
		if(err) throw err;
		console.log(results);
		res.send('Produtos exibidos...');
	});
});

// Metodo POST para SQL
app.get('/adicionarProduto', (req, res) => {
	let prod = {nome: "Camisa", descricao: "Tecido de algodao"};
	let sql = 'INSERT INTO prods SET ?';
	let query = db.query(sql, post, (err, result) => {
		if(err) throw err;
		console.log(result);
		res.send('Produto 1 adicionado...');
	}
});	

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
