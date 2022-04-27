async function get(url, type = 'json'){
    const res = await fetch(url).then(response => {
        // si viene json
        if(type == 'json'){
            return response.json();
            // si no es json se asume que es texto
        }else{
            return response.text();
        }
    })
    .catch(error => {
        throw new Error(error);
    });
    return res;

}

// devuelve una promesa
async function post(url, type = 'json', data){
    // para que espere
    const res = await fetch(url,{
        method:'POST',
        headers: {
            'Content-Type':'application/js'
        }, body: JSON.stringify(data)
    }).then(response => {
        // si viene json
        if(type == 'json'){
            return response.json();
            // si no es json se asume que es texto
        }else{
            return response.text();
        }
    })
    .catch(error => {
        throw new Error(error);
    });
    return res;
    
}

export {get, post};