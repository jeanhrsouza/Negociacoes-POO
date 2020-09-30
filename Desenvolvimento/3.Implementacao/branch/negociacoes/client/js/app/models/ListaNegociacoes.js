class ListaNegociacoes {

    constructor() {
  
          this._negociacoes = [];
    }

    ordena(criterio) {
        this._negociacoes.sort(criterio);        
    }

    inverteOrdem() {
        this._negociacoes.reverse();
    }

    adiciona(negociacao) {

        
        this._negociacoes.push(negociacao);
    }
  
    get negociacoes() {
        return [].concat(this._negociacoes);
    }
  
    esvazia() {
        this._negociacoes = [];
    }
  }