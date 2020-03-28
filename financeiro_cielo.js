var nodemailer = require('nodemailer');
var sendEmail = require("./sendEmail.js");
var consts = require("./consts.js");

// ====================================== Pendencias =======================================================================

Parse.Cloud.define("novaPendenciaFinanceiraApp", async function (req, res) {
    var pendencia = req.params;
    var queryProcesso = new Parse.Query("Processo");
    var processo = await queryProcesso.get(pendencia.processo);

    const queryUser = new Parse.Query(new Parse.User());
    var parte = await queryUser.get(pendencia.parte, { useMasterKey: true });

    const pendenciaClass = Parse.Object.extend('FinanceiroPendencia');
    const pendenciaFinanceira = new pendenciaClass();
    pendenciaFinanceira.set('processo', processo);
    pendenciaFinanceira.set('parte', parte);
    pendenciaFinanceira.set('pendenciaBloqueante', pendencia.pendenciaBloqueante);
    pendenciaFinanceira.set('valor', pendencia.valor);
    pendenciaFinanceira.set('descricao', pendencia.descricao);
    pendenciaFinanceira.set('descricaoEnum', pendencia.descricaoEnum);

    pendenciaFinanceira.save()
        .then((result) => res.success(result))
        .catch((error) => res.error(error));
});

Parse.Cloud.define("fetchPendenciasFinanceirasApp", async function (req, res) {
    const query = new Parse.Query("FinanceiroPendencia");
    if (req.params.processo) {
        const queryProcesso = new Parse.Query("Processo");
        const processo = await queryProcesso.get(req.params.processo);
        query.equalTo("processo", processo);
    }
    if (req.params.parte) {
        const queryUser = new Parse.Query(new Parse.User());
        var parte = await queryUser.get(req.params.parte, { useMasterKey: true });
        query.equalTo("parte", parte);
    }
    query.include("processo");
    query.find({ useMasterKey: true })
        .then((results) => res.success(results))
        .catch((error) => res.error(error))
});

// Pode ser substituida pela de cima
Parse.Cloud.define("fetchPendenciaFinanceiraApp", async function (req, res) {
    const queryProcesso = new Parse.Query("Processo");
    const processo = await queryProcesso.get(req.params.processo);
    console.log('Processo->', processo)

    const query = new Parse.Query("FinanceiroPendencia");
    query.equalTo("processo", processo);

    query.include("processo");
    query.include("parte");
    query.find({ useMasterKey: true })
        .then((results) => res.success(results))
        .catch((error) => res.error(error))
});

Parse.Cloud.define("pendenciaPagaApp", async function (req, res) {
    const queryPendencia = new Parse.Query("FinanceiroPendencia");
    var pendencia = await queryPendencia.get(req.params.pendencia);

    var queryProcesso = new Parse.Query("Processo");
    queryProcesso.include('arbitro.User');
    var processo = await queryProcesso.get(req.params.processo);

    const queryParte = new Parse.Query(new Parse.User());
    var parte = await queryParte.get(req.params.user);

    const entrada = createEntrada(req.params, parte, processo, pendencia);
    createSaida(req.params, processo);

    pendencia.destroy()
        .then((result) => {
            entrada.save();
            res.success(result);
        })
        .catch((error) => res.error(error));
});

//====================================================== Boleto ============================================================

Parse.Cloud.define("boletoCriadoWebhook", async function (req, res) {
    const queryPendencia = new Parse.Query("FinanceiroPendencia");
    queryPendencia.include('parte');
    var pendencia = await queryPendencia.get(req.params.meta, { useMasterKey: true });
    pendencia.set('boletoLink', req.params.url);
    pendencia.save()
        .then((result) => {
            sendEmail(pendencia.get('parte').get('email'), "Link boleto", req.params.url);
            res.success()
        })
        .catch((error) => res.error());
});

// data['bank_billet']['tags'] = [pendencia, processo, descricaoEnum, taxa];

Parse.Cloud.define("boletoPagoWebhook", async function (req, res) {
    const queryPendencia = new Parse.Query("FinanceiroPendencia");
    queryPendencia.include('parte');
    var pendencia = await queryPendencia.get(req.params.tags[0], { useMasterKey: true });

    var queryProcesso = new Parse.Query("Processo");
    queryProcesso.include('arbitro.User');
    var processo = await queryProcesso.get(req.params.tags[1]);

    const queryParte = new Parse.Query(new Parse.User());
    var parte = await queryParte.get(pendencia.get('parte').id);
    const entrada = createEntrada({
        valor: req.params.amount,
        valorPago: req.params.paid_amount,
        taxa: parseFloat(req.params.tags[3]),
        descricao: consts.helperEnum(parseInt(req.params.tags[2])),
        descricaoEnum: parseInt(req.params.tags[2]),
        idBoleto: req.params.id,
    }, parte, processo, penedncia);

    createSaida({
        valor: req.params.amount,
        descricao: consts.helperEnum(parseInt(req.params.tags[2])),
        descricaoEnum: req.params.tags[2],
        idBoleto: req.params.id
    }, processo);

    pendencia.destroy()
        .then((result) => {
            entrada.save();
            res.success(result);
        })
        .catch((error) => res.error(error));
});

//===================================================== Devolucao ===============================================================

Parse.Cloud.define("novaDevolucaoFinanceiraApp", async function (req, res) {
    var devolucao = req.params;

    const devolucaoClass = Parse.Object.extend('FinanceiroDevolucao');
    const devolucaoFinanceira = new devolucaoClass();

    var query = new Parse.Query("Processo");
    var processo = await query.get(devolucao.processo);

    const query2 = new Parse.Query(new Parse.User());
    var parte = await query2.get(devolucao.parte, { useMasterKey: true });

    devolucaoFinanceira.set('processo', processo);
    devolucaoFinanceira.set('parte', parte);
    devolucaoFinanceira.set('valor', devolucao.valor);
    devolucaoFinanceira.set('descricao', devolucao.descricao);
    devolucaoFinanceira.set('descricaoEnum', devolucao.descricaoEnum);
    devolucaoFinanceira.set('pendente', true);

    devolucaoFinanceira.save()
        .then((result) => {
            res.success(result)
        })
        .catch((error) => res.error(error));
});

Parse.Cloud.define("fetchDevolucoesFinanceiras", async function (req, res) {
    const query = new Parse.Query("FinanceiroDevolucao");
    if (req.params.parte) {
        const queryUser = new Parse.Query(new Parse.User());
        var arbitroUser = await queryUser.get(req.params.parte, { useMasterKey: true });
        query.equalTo("arbitroUser", arbitroUser);
    }
    if (req.params.processo) {
        const queryProcesso = new Parse.Query("Processo");
        const processo = await queryProcesso.get(req.params.processo);
        query.equalTo("processo", processo);
    }
    query.include("processo");
    query.include("parte");
    query.find({ useMasterKey: true })
        .then((results) => res.success(results))
        .catch((error) => res.error(error))
});

Parse.Cloud.define("changePendenteDevolucaoFinanceira", async function (req, res) {
    const query = new Parse.Query("FinanceiroDevolucao");
    const devolucao = await query.get(req.params.id);
    devolucao.set("pendente", req.params.newPendente);
    devolucao.save()
        .then((result) => res.success(result))
        .catch((error) => res.error(error));
});

// =================================================== Entradas ====================================================================

function createEntrada(args, parte, processo, pendencia) {
    const entradaClass = Parse.Object.extend('FinanceiroEntrada');
    const entrada = new entradaClass();
    entrada.set("valor", args.valor);
    entrada.set("valorPago", args.valorPago);
    entrada.set("taxa", args.taxa);
    entrada.set("descricao", args.descricao);
    entrada.set("descricaoEnum", args.descricaoEnum);
    entrada.set("idTransacao", args.idTransacao);
    entrada.set("idBoleto", args.idBoleto);
    entrada.set("dataEmissao", pendencia.createdAt);

    entrada.set("pendente", false);
    entrada.set("processo", processo);
    entrada.set("parte", parte);
    return entrada;
}

Parse.Cloud.define("fetchEntradasFinanceirasApp", async function (req, res) {
    const query = new Parse.Query("FinanceiroEntrada");
    if (req.params.parte) {
        const queryUser = new Parse.Query(new Parse.User());
        var parte = await queryUser.get(req.params.parte, { useMasterKey: true });
        query.equalTo("parte", parte);
    }
    if (req.params.processo) {
        const queryProcesso = new Parse.Query("Processo");
        const processo = await queryProcesso.get(req.params.processo);
        query.equalTo("processo", processo);
    }
    query.include("processo");
    query.find({ useMasterKey: true })
        .then((results) => res.success(results))
        .catch((error) => res.error(error))
});

// =============================================================== Saidas ==================================================


async function createSaida(args, processo) {
    const saidaClass = Parse.Object.extend('FinanceiroSaida');
    const saida = new saidaClass();
    (args.descricaoEnum == consts.PagarParte.pagamentoInicialDoProcesso || args.descricaoEnum == consts.PagarParte.pagamentoInicialDoProcessoUrgente) ?
        // 20% lide / 80% arbitro = 100%.
        // Se o pagamento aqui é só a metade (50% do total)
        // 40% de 50% = 20% de 100% pro lide
        // 60% de 50% = 30% de 100% pro arbitro
        saida.set("valor", args.valor * 0.6) :
        saida.set("valor", args.valor);
    saida.set("descricao", args.descricao);
    saida.set("descricaoEnum", args.descricaoEnum);
    saida.set("idTransacao", args.idTransacao);
    saida.set("idBoleto", args.idBoleto);

    saida.set("processo", processo);
    saida.set("arbitroUser", processo.get('arbitro').get('User'));
    saida.set("pendente", true);
    saida.save();
}

Parse.Cloud.define("fetchSaidasFinanceirasApp", async function (req, res) {
    const query = new Parse.Query("FinanceiroSaida");
    if (req.params.parte) {
        const queryUser = new Parse.Query(new Parse.User());
        var arbitroUser = await queryUser.get(req.params.parte, { useMasterKey: true });
        query.equalTo("arbitroUser", arbitroUser);
    }
    if (req.params.processo) {
        const queryProcesso = new Parse.Query("Processo");
        const processo = await queryProcesso.get(req.params.processo);
        query.equalTo("processo", processo);
    }
    query.include("processo");
    query.include("arbitroUser");
    query.find({ useMasterKey: true })
        .then((results) => res.success(results))
        .catch((error) => res.error(error))
});

Parse.Cloud.define("changePendenteSaidaFinanceira", async function (req, res) {
    const query = new Parse.Query("FinanceiroSaida");
    const saida = await query.get(req.params.id);
    saida.set("pendente", req.params.newPendente);
    saida.save()
        .then((result) => res.success(result))
        .catch((error) => res.error(error));
});


//================================================================= Outros =============================================

Parse.Cloud.define("fetchEnum", async function (req, res) {
    res.success(consts.PagarParte.pagamentoInicialDoProcessoUrgente);
});

function boleto() {
    return 'veio do boleto'
}

Parse.Cloud.define("boletoTeste", async function (req, res) {
    res.success(boleto());
});

Parse.Cloud.define("fetchProcessosAutorApp", async (req, res) => {
    const queryUser = new Parse.Query(new Parse.User());
    var user = await queryUser.get(req.params.user);
    const query = new Parse.Query("Processo");
    query.equalTo('autor', user);
    query.include('autor');
    query.include('reu');
    query.find()
        .then((results) => res.success(results))
        .catch((error) => res.error(error));
});

Parse.Cloud.define("processosUser2", async (req, res) => {
    const queryUser = new Parse.Query(new Parse.User());
    var user = await queryUser.get(req.params.user);

    const queryProcesso = new Parse.Query("Processo");
    const queryProcesso2 = new Parse.Query("Processo");

    queryProcesso.equalTo('autor', user);
    queryProcesso2.equalTo('reu', user);
    const queryMain = new Parse.Query.or(queryProcesso, queryProcesso2);
    queryMain.include('reu');
    queryMain.include('autor');
    queryMain.include('selecaoArbitro');
    queryMain.include('arbitro.User');
    queryMain.descending("createdAt");

    const processos = await queryMain.find({ useMasterKey: true });
    var arbitragem = null;

    if (user.get('arbitro')) {
        const queryArbitro = new Parse.Query("Arbitro");
        var arbitro = await queryArbitro.get(user.get('arbitro').id);
        const queryProcessoArbitro = new Parse.Query("Processo");
        queryProcessoArbitro.equalTo('arbitro', arbitro);
        queryProcessoArbitro.include('reu');
        queryProcessoArbitro.include('autor');
        queryProcessoArbitro.include('arbitro.User');
        queryProcessoArbitro.include('selecaoArbitro');
        queryProcessoArbitro.descending("createdAt");
        arbitragem = await queryProcessoArbitro.find({ useMasterKey: true });
    }
    res.success({ processos: processos, arbitragem: arbitragem });

});