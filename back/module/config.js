/*
Objetivo: Arquivo responsável pela padronização de variáveis e constantes globais do projeto

*/

//********************** MENSAGENS DE ERRO ****************************** */
const ERROR_INVALID_ID = {

    status: false,
    status_code: 400,
    message: 'o ID encaminhado na requisição não é valido!!'
} 

const ERROR_REQUIRED_FIELDS = {

    status: false,
    status_code: 400,
    message: 'Existem campos requeridos que não foram preenchidos, ou não atendem aos critérios de digitação'
}

const ERROR_NOT_FOUND = {

    status: false,
    status_code: 404,
    message: 'Não foi encontrado nenhum item com este id'
}

const ERROR_INTERVAL_SERVER_DB = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição, devido a um erro no acesso ao Banco de Dados. Contate o administrador da API !!'
}

//********************** MENSAGENS DE SUCESSO ****************************** */


const SUCESS_CREATED_ITEM = {

    status: true,
    status_code: 201,
    message: 'Item criado com sucesso!!'
} 

module.exports = {
    SUCESS_CREATED_ITEM,
    ERROR_REQUIRED_FIELDS,
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERVAL_SERVER_DB
}