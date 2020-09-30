class Bind {
    //rest operator (...props)
    constructor(model, view, ...props) {

        /*
            Factory -> classe determinada para criar um tipo de objeto
        */
        let proxy = ProxyFactory.create(model, props, (model) => 
            view.update(model));
        
        view.update(model);
        
        //Diferemte de Java (por exemplo), JS o construtor pode realizar retorno
        return proxy;
    }
}