class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');


        /**
         * PADRÃO DE PROJETO PROXY
         */
         //  props --> target --> ação 
         this._listaNegociacoes = ProxyFactory.create (
            new ListaNegociacoes(),
            ['adiciona', 'esvazia'], model =>
                this._negociacoesView.update(model));
     
        

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        //mantém este update para a primeira renderização da lista de negociações
        this._negociacoesView.update(this._listaNegociacoes);


        /**
         * PADRÃO DE PROJETO PROXY
         */
        this._mensagem = ProxyFactory.create(
            new Mensagem(), ['texto'], model => 
            this._mensagemView.update(model));


        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
        
    }




    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';        
        this._limpaFormulario();   
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
/*
Factory -> classe determinada para criar um tipo de objeto
*/