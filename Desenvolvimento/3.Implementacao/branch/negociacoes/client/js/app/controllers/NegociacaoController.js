class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');


        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),                          //modelo
            new NegociacoesView($('#negociacoesView')),      //view
            'adiciona', 'esvazia');                          //condição


        this._mensagem = new Bind(
            new Mensagem(),                                 //modelo
            new MensagemView($('#mensagemView')),           //view
            'texto');                                       //condição

    }


    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();
    }
    

    importaNegociacoes() {

        let service = new NegociacaoService();
    
        /**
         * Importando negociações da semana
         */
        service.obterNegociacoesDaSemana()
          .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
        })
        .catch(erro => this._mensagem.texto = erro);
    
        /**
         * Importando negociações da semana anterior
         */
        service.obterNegociacoesDaSemanaAnterior()
          .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
        })
        .catch(erro => this._mensagem.texto = erro);
    

        /**
         * Importando negociações da semana retrasada
         */
        service.obterNegociacoesDaSemanaRetrasada()
          .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações da semana obtidas com sucesso';
        })
        .catch(erro => this._mensagem.texto = erro);
    
    }


    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso';
    }

    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }


    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }
}
