class ProxyFactory {

    //Não se faz necessário 
    //pode invocar um método estático para criar
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
                    return function () {

                        console.log(`método '${prop}' interceptado`);

                        Reflect.apply(target[prop], target, arguments);
                       
                       //retorna uma possível ação de um alvo
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                if(props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }

                return Reflect.set(target, prop, value, receiver);

            }
        });

    }

    static _ehfuncao(func) {
        return typeof(func) == typeof (Function);
    }

}