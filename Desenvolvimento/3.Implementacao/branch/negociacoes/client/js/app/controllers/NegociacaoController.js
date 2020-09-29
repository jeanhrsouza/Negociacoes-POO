class NegociacaoController {
    
    constructor() {
        
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');


        /**
         * PADRÃO DE PROJETO PROXY
         */

        let self = this;

        this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
            //Get sempre será chamado
            // get: function
            get(target, prop, receiver) {
                
                //perguntar se ta na lista para interceptar
                /*
                    métodos -> inclui nas propriedades
                    typeof receberá a propriedade do target
                */
                //    se adiciona e esvazia tem minha propriedade e é uma função, eu executo
                if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    //PROXY
                    //tem que ser function para ter o "this" dinâmico. Não pode ser arrow function que possui escopo léxico.
                    return function(){

                        console.log(`método '${prop}' interceptado`);    
                        
                        Reflect.apply(target[prop], target, arguments);
                        

                        //chamando a variável _negociaçõesView, atualizando e passando
                        //um model para essa função
                        self._negociacoesView.update(target);
                    }   

                }

                return Reflect.get(target, prop, receiver);

            }
        });
     
        

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        //mantém este update para a primeira renderização da lista de negociações
        this._negociacoesView.update(this._listaNegociacoes);
        
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
        
    }




    
    adiciona(event) {
        
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();   
    }




    

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = 'Negociações apagadas com sucesso';
        this._mensagemView.update(this._mensagem);
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