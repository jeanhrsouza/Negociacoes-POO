class ProxyFactory {

    //Não se faz necessário, porém pode invocar um método estático para criar
    static create(objeto, props, acao) {

        return new Proxy(objeto, {
            //Get sempre será chamado
            // get: function
            get(target, prop, receiver) {

                //perguntar se ta na lista para interceptar
                /*
                    métodos -> inclui nas propriedades
                    typeof receberá a propriedade do target
                */

                //array de propriedades (métodos como: esvazia, adiciona) 
                if (props.includes(prop) &&  ProxyFactory._ehfuncao(target[prop])) {

                    //tem que ser function para ter o "this" dinâmico. Não pode ser arrow function que possui escopo léxico.
                    return function() {

                        console.log(`interceptando ${prop}`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                    
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) acao(target);    // só executa acao(target) se for uma propriedade monitorada
                return retorno; 
            }
        });

    }

    static _ehfuncao(func) {
        return typeof(func) == typeof (Function);
    }

}