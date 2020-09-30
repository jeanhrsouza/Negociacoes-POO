class HttpService {

    get(url) {

        return new Promise((resolve, reject) => {
             //cria instancia de um xml
            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);
            /*configurações*/
            xhr.onreadystatechange = () => {
                // 4: requisição concluida e a resposta está pronta
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();
            
        });
    }
}















