class NegociacaoService {

    //cb = call back
    obterNegociacoesDaSemana(cb) {
        //cria instancia de um xml
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/semana');

        /*configurações*/
        xhr.onreadystatechange = () => {
            // 4: requisição concluida e a resposta está pronta
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {

                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana', null);
                }
            }
        }

        xhr.send();

    }
    
    obterNegociacoesDaSemanaAnterior(cb) {
        //cria instancia de um xml
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/anterior');

        /*configurações*/
        xhr.onreadystatechange = () => {
            // 4: requisição concluida e a resposta está pronta
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {

                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana anterior', null);
                }
            }
        }

        xhr.send();
    }
    
    obterNegociacoesDaSemanaRetrasada(cb) {
        //cria instancia de um xml
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'negociacoes/retrasada');

        /*configurações*/
        xhr.onreadystatechange = () => {
            // 4: requisição concluida e a resposta está pronta
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {

                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)));

                } else {
                    console.log(xhr.responseText);
                    cb('Não foi possível obter as negociações da semana retrasada', null);
                }
            }
        }

        xhr.send();
    }
}