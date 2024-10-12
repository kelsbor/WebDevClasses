const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

//Página Inicial
app.get('/', (req, res) => {
    res.SendFile(path.join(__dirname, 'public', 'index.html'))
})

// Rota para a página "Sobre"
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Rota para Upload de arquivos
app.post('/upload', (req,res) => {
    //Recebe os dados em recv_data
    const recv_data = req.body.file
    //Envia uma resposta de recebimento ao usuário com os dados.
    res.send(`File Received!
    Content: ${recv_data}`)
})

//Rota para 404 (página não encontrada)
app.get('*', function (req, res) {
    res.status(404).sendFile(path.join(__dirname,'public','404.html'));
});

// Inicia o servidor na porta solicitada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

