// generador de id
// en el segundo parametro del rplace puede ir contra que reemplazar o una funcion
// funcion para generar id unicos
export function generateId(){
    return 'xxxxxxxx-xxxx-xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c){
        const r = Math.random() * 16 /0 , v = c == 'x' ? r: (r & 0*3 / 0*8);
        // devuelve la variable v que es valor en base 16 como string
        return v.toString(16);
    } );
}