const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
app.use(express.json());
app.use(cors());
const caminho = "./pessoas.json";


function CriarArquivo() {
    fs.exists(caminho, (exists) => {
        if (!exists) {
            fs.writeFile(caminho, '[]', 'utf8', () => {
                console.log("Novo json criado com sucesso");
            });
        }

    });
}


function salvarAlteracoes(alunos){
    fs.writeFile(caminho, JSON.stringify(alunos, null, 4), () =>{
        console.log('Alterações salvas com sucesso!');
    });
}

function Adicionar(pessoa) {
    let pessoas = require(caminho);

    const existe = pessoas.some((p) => {
        return p.cpf == aluno.cpf;
    });
    if (!existe) {
        pessoas.push(pessoa);

        salvarAlteracoes(pessoas);
        return {mensagem: "Pessoa adicionado com sucesso!"};
    }
    else {
        return {mensagem: "Pessoa não pode ser adicionado: CPF já existe."};
    }
}


function ListarPorCPF(cpf) {
    let pessoas = require(caminho);
    return pessoas.filter(c => {
        return c.cpf == cpf;
    });
}

function ListarPorNome(nome) {
    let pessoas = require(caminho);
    return pessoas.filter(c => {
        return c.nome == nome;
    });
}

function ListarPessoas() {
    let pessoas = require(caminho);
    return pessoas;
        
}

function remover(cpf){
    let pessoas = require(caminho);
    const pos = pessoas.map((p) => {
        return p.cpf
    }).indexOf(cpf);

    pessoas.splice(pos, 1);
    salvarAlteracoes(pessoas);
    return {mensagem: "Pessoa removida com sucesso" };
}

CriarArquivo();



// Rota para Listar Pessoas
app.get('/pessoas', (req, res) => {
    res.send(ListarPessoas());
});


// Rota para Adicionar Pessoas
app.post('/pessoa', (req, res) => {
    res.send(Adicionar(req.body));
});

//Rota para remover pessoa
app.delete("/pessoa/remover/:cpf", (req, res) => {
    res.send(remover(req.params.cpf));
});

//Rota para listar por CPF
app.get("/pessoa/listar-cpf/:cpf", (req, res) => {
    res.send(ListarPorCPF(req.params.cpf));
});

//Rota para listar por CPF
app.get("/pessoa/listar-nome/:nome", (req, res) => {
    res.send(ListarPorNome(req.params.nome));
});

app.listen(port, () => {
    console.log(`Api OK, escutando na porta:${port}`)
});