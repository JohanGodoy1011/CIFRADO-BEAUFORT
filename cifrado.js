function cifradoBeaufort(){
    //Se obtiene el texto y la clave correspondiente que ingrese el usuario
    const texto = document.getElementById('InputText').value.toLowerCase().replace(/\s+/g, '')
    const clave = document.getElementById('InputKey').value.toLowerCase().replace(/\s+/g, '')
    let resultado = ""

    //Bucle que recorre todo el texto ingresado
    for(i=0; i<texto.length; i++){
        //Se realiza la formula del cifrado de Beaufort para tener el valor ASCII de la nueva letra
        const nueva_letra = ((clave.charCodeAt(i % clave.length)) - (texto.charCodeAt(i))) % 26;

        //En caso de que el valor de la nueva letra sea mayor o igual que 0
        if(nueva_letra >= 0){
            //Se guarda la letra cifrada en el resultado
            resultado += String.fromCharCode(nueva_letra + 97);
        }else{//En caso que el valor de la nueva letra sea menor que 0
            //Se guarda la letra cifrada en el resultado, añadiendo 26 porque corresponde a la cantidad de letras en el alfabeto ingles
            resultado += String.fromCharCode(nueva_letra + 26 + 97);
        }
    }
    //Se muestra el resultado en el input correspondiente
    document.getElementById('InputResult').value = `${resultado}`
}
