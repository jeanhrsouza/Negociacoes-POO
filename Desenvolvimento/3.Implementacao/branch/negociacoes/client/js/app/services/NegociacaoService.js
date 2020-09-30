class NegociacaoService {


    constructor() {
        this._http = new HttpService();
    }

    /**
     * Método que realiza o retorno da Promise.
     * 
     */
    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]). then(periodos => {
            let negociacoes = periodos
            .reduce((dados, periodo) => dados.concat(periodo), []);

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
    }


    /**
     * Métodos que realizam Fetch nas API's
     * 1. API da semana
     * 2. API da semana anterior
     * 3. API da semana retrasada
     */

    obterNegociacoesDaSemana() {

        return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana')
                })
        });
    }

    obterNegociacoesDaSemanaAnterior() {

        return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana')
                })

        });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return new Promise((resolve, reject) => {
        
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Não foi possível obter as negociações da semana')
                })

        });
    }
}