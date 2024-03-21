/**
 * Para realizar a integração com o Banco de Dados devemos
 * utilizar uma das seguintes bibliotecas:
 * - SEQUELIZE - É a biblioteca mais antiga
 * - PRISMA ORM - É a biblioteca mais atual (utilizaremos no projeto)
 * - FASTFY ORM - É a biblioteca mais atual
 * 
 * Para a instalação do PRISMA ORM:
 *    npm install prisma --save        (É responsavel pela conexão com o BD)
 *    npm install @prisma/client --save  (É responsável por executar scripts SQL no BD)
 *    npx prisma init  (inicializar o prisma no projeto)
 * 
 */




const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Acesss-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')


    app.use(cors())


    next()
})

app.use(cors())

/*********************Import dos arquivos de Controller do projeto **********************/

const controllerFilmes = require('./controller/controller_filmes.js')

/************************************ */

//criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()




//Endpoint: Versão 1.0 que retorna os dados de um arquivo de filmes
//Período de utilização 01/2024 até 02/2024
app.get('/v1/acmeFilmes/filmes', cors(), (request, response) => {

    let controleFilmes = require('./controller/funcoes')

    const listaFilmes = controleFilmes.getListaFilmes()
    if (listaFilmes) {
        res.json(listaFilmes)
    } else {
        res.status(404).json({ erro: 'nenhum filme foi encontrado' })
    }
})

app.get('/v2/acmeFilmes/filmes', cors(), async function (request, response) {

    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({ message: 'nenhum registro encontrado' })
        response.status(404)
    }
})

app.get('/v2/acmeFilmes/filmes/filtro', cors(), async function (req, response) {

    const nome = req.query.nome
    console.log(nome)
    const listaNomes = await controllerFilmes.getNomeFilme(nome)

    response.status(listaNomes.status_code)
    response.json(listaNomes)
})

app.get('/v2/acmeFilmes/filme/:id', cors(), async function(request, response){

    let idFilme = request.params.id
    
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.post('/v2/acmeFilmes/filme', cors(), bodyParserJSON, async function(request, response){

    //Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //encaminhandoos dados para o controler para enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody)

    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

app.get('/v1/acmeFilmes/:id', cors(), (req, res) => {

    let idFilme = req.params.id
    let controleFilmesId = require('./controller/funcoes')
    const listaFilmesId = controleFilmesId.getListaFilmeId(idFilme)
    console.log(listaFilmesId)
    if (listaFilmesId) {
        res.json(listaFilmesId)
    } else {
        res.status(404).json({ erro: 'nenhum filme com esse id foi encontrado' })
    }
})

// app.get('/v1/acmeFilmes/filmes/nomes', cors(), (req, res) => {

//     let controleNomes = require('./controller/funcoes')
//     const listaNomes = controleNomes.getListaFilmesNomes()
//     if (listaNomes) {
//         res.json(listaNomes)
//     } else {
//         res.status(404).json({ erro: 'nenhum nome de filme foi encontrado' })
//     }
// })

const PORT = 5080
app.listen(PORT, () => {
    console.log(`foiiii ${PORT}`)
})

//
// export {getFimes, setFilme, postFilme, putFilme} from "./filmes.js"

// export: async function putFilme(Filme){
//     const url = `http:10.107.134.17:8080/v2/acmeFilmes/filme${id}`
//     const options = {
//         method: PUT,
//         headers: {
//             Content type: 'aplication/json'
//         },
//         body: JSON.stringify(filme)
//     }
//     const response= await fetch(url, opitions)
//     return response.ok
// }


// export {getFimes, setFilme, postFilme, putFilme} from "./filmes.js"

// export: async function putFilme(id){
//     const url = `http:10.107.134.17:8080/v2/acmeFilmes/filme${id}`
//     const options = {
//         method: DELETE,
//     }
//     const response = await fetch(url, options)
//     return response.ok
// }


