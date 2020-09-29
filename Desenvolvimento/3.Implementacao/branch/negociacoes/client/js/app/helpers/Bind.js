class Bind {

    constructor(model, view, props) {

        let proxy = ProxyFactory.create(model, props, model => 
            view.update(model));
        
        view.update(model);
        
        //Diferemte de Java (por exemplo), JS o construtor pode realizar retorno
        return proxy;
    }
}