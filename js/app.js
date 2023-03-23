//Variables globales
const formulario = document.querySelector('#formulario');
const btnAgregar = document.querySelector('input[type=submit]');
const listaTweets = document.querySelector('#lista-tweets');
let arrTweets = [];

//Eventos
eventListeners();
function eventListeners(){
    formulario.addEventListener('submit', agregarTweet);
    document.addEventListener('DOMContentLoaded', () => {
        arrTweets = JSON.parse(localStorage.getItem('tweets')) || [];
        mostrarTweets(arrTweets);
    });
}

//Funciones
function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value;

    //Crear objTweet
    const objTweet = {
        tweet: tweet.trim(),
        id: Date.now()
    }

    //Validar campos vacíos
    if(tweet.trim() === ''){
        mostrarAlerta('No puede mandarse tweets vacíos', 'error');
        return;
    }
    //Validar tweets existentes
    const some = arrTweets.some(item => item.tweet === objTweet.tweet);
    if(some){
        mostrarAlerta('Este tweet ya existe', 'error');
        return;
    }

    //AQUÍ YA PASÓ LAS VALIDACIONES

    //Agregar objTweet al array
    arrTweets.push(objTweet);

    //Mostrar mensaje de agregando...
    mostrarAlerta('Agregando...', 'correcto');
}
function mostrarAlerta(mensaje, query){
    //Limpiar alerta
    limpiarAlerta();

    //Crear alerta
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    if(query === 'error'){
        alerta.classList.add('error');
        formulario.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }else{
        alerta.classList.add('correcto');
        formulario.appendChild(alerta);
        btnAgregar.disabled = true;
        setTimeout(() => {
            btnAgregar.disabled = false;
            formulario.reset();
            alerta.remove();
            mostrarTweets(arrTweets);
        }, 1000);
    }
}
function mostrarTweets(array){
    //Limpiar tweets
    limpiarTweets();

    if(array.length){
        //Iterar sobre el array
        array.forEach(tweet => {
            //Crear li
            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            li.id = tweet.id;

            //Crear btnEliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.textContent = 'X';
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.addEventListener('click', () => {
                arrTweets = arrTweets.filter(item => item.id != tweet.id);
                mostrarTweets(arrTweets);
            });

            //Agregar btn a li
            li.appendChild(btnEliminar);

            //Agregar li al HTML
            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage(array);
}
function sincronizarStorage(array){
    localStorage.setItem('tweets', JSON.stringify(array));
}

function limpiarAlerta(){
    const alerta = document.querySelector('.alerta');
    if(alerta){
        alerta.remove();
    }
}
function limpiarTweets(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}