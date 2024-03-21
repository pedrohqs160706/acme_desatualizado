/**************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de filme
 * Data: 01/02/2024
 * Autor: PEdro Queiroz
 * Versão: 1.0
 */

const message = require('../module/config.js')

//import do arquivo responsável pela interação com o BD (model)
const filmesDAO = require('../model/DAO/filme.js')

const setInserirNovoFilme = async function (dadosFilme) {
    //função para inserir um novo filme

    let novoFilmeJSON = {}

    if (dadosFilme.nome == ''                     || dadosFilme.nome == undefined            || dadosFilme.nome == null             || dadosFilme.nome.length > 80             || 
        dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null          || dadosFilme.sinopse.length > 65000       ||
        dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined         || dadosFilme.duracao == null          || dadosFilme.duracao.length > 8           ||
        dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento  == null || dadosFilme.data_lancamento.length != 10 ||
        dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null        || dadosFilme.foto_capa > 200              ||
        dadosFilme.valor_unitario.length > 6
    ) {
       return message.ERROR_REQUIRED_FIELDS //400
    } else {

        let validateStatus = false

        if (dadosFilme.data_relancamento != null && 
            dadosFilme.data_relancamento !='' &&
            dadosFilme.data_relancamento != undefined
            
            ) {
            if (dadosFilme.data_relancamento.length != 10) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else{
                validateStatus = true
            }
        } else {
            validateStatus =  true
        }

        if(validateStatus) {

        // encamiha para o DAO para inserir no banco
        let novoFilme = await filmesDAO.insertFilme(dadosFilme)
        let idPego = await filmesDAO.pegarUltimoId()

        if(novoFilme && idPego) {
const id = idPego[0].id
            console.log(id);
            //retorno dos dados
                novoFilmeJSON.filme = dadosFilme
                novoFilmeJSON.id_adicionado = `O novo filme possui o id ${id}`
                novoFilmeJSON.status = message.SUCESS_CREATED_ITEM.status
                novoFilmeJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                novoFilmeJSON.message = message.SUCESS_CREATED_ITEM.message

                return novoFilmeJSON //201
            } else {
                return message.ERROR_INTERVAL_SERVER_DB //500
            }

        }
    }
}

const setAtualizarFilme = async function () {
    //função para atualizar um filme
}

const setExcluirFilmes = async function () {
    //Função para excluir um filme
}

const getListarFilmes = async function () {

    //cria um objeto JSON
    let filmesJSON = {};

    //chama a função do DAO que retorna os filmes do DB
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //validação para verificar se o DAO retornou dados
    if (dadosFilmes) {
        //cria o JSON
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.length
        filmesJSON.status_code = 200

        return filmesJSON
    } else {
        return false
    }
}

const getNomeFilme = async function (nome) {

    let nomeFilmeJSON = {}

    if (nome == '' || nome == undefined) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosNomeFilme = await filmesDAO.selectByNameFilme(nome)

        if (dadosNomeFilme) {

            console.log('verificação');

            if (dadosNomeFilme.length > 0) {

                nomeFilmeJSON.filmes = dadosNomeFilme
                nomeFilmeJSON.quantidade = dadosNomeFilme.length
                nomeFilmeJSON.status_code = 200

                return nomeFilmeJSON

            } else {

                return message.ERROR_NOT_FOUND
            }
        } else {

            return message.ERROR_INTERVAL_SERVER_DB //500

        }
    }
}

const getBuscarFilme = async function (id) {
    //função para buscar um filme

    let idFilme = id

    let filmeJSON = {}

    //validação para ver se o id é valido
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        //validação 
        if (dadosFilme) {

            if (dadosFilme.length > 0) {

                filmeJSON.filme = dadosFilme;
                filmeJSON.status_code = 200

                return filmeJSON

            } else {

                //Caso dadoFilme receba os dados do DB e o tamanho dele não seja maior que 0,
                // o erro é de que não foi encontrado, pois nos conseguimos retornar o valor dadosFilme,
                // porém, não foi selecionado da forma correta no DB e não pegamos o id, por isso do 404
                return message.ERROR_NOT_FOUND
            }
        } else {

            //Caso dadosFilme não receba os dados do DB, significa que o erro esta no DB, pois dadosFilme
            // Nem se quer esta retornando algo, mesmo que esteja retornando null, logo, o erro deve estar
            // na hora de fazer a requisição do banco, ou o model pra pegar o resultado do banco 
            return message.ERROR_INTERVAL_SERVER_DB //500
        }


    }
}

module.exports = {
    getNomeFilme,
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilmes,
    getListarFilmes,
    getBuscarFilme
}