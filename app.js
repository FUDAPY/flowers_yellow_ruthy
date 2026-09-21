// Dedicatorias guardadas en Firestore + respaldo local si no hay conexión
const firebaseConfig = {
  apiKey: "AIzaSyB6rtLGctWpD2wKUpbfVRpHe-7MmGvUlcE",
  authDomain: "corazon-4bdc0.firebaseapp.com",
  projectId: "corazon-4bdc0",
  storageBucket: "corazon-4bdc0.firebasestorage.app",
  messagingSenderId: "1033998067998",
  appId: "1:1033998067998:web:dc937f36b4a8ebf55b010f"
};

const CDN_FIREBASE = "https://www.gstatic.com/firebasejs/10.8.1";
const TIEMPO_LIMITE_CONEXION = 7000; // ms máximo de espera al CDN de Firebase

const mensajesLocales = [
    "¡Feliz Día de la Juventud y de la Primavera, mi amada Ruth! Eres mi estación favorita, la que hace florecer todo lo bueno en mí.",
    "Dicen que quien te regala flores amarillas hoy te promete un amor eterno. Yo te elijo a ti para todas mis primaveras.",
    "Al igual que esta naturaleza brilla en la noche, tu amor ilumina cada rincón de mi vida, mi preciosa señora.",
    "Eres el inicio de todas mis alegrías y la juventud de mi corazón. Porque lo eres absolutamente todo para mí."
];
let cartasLeidas = new Set();

/* ====== Firebase (opcional: si falla, se usan las dedicatorias locales) ====== */
let db = null;
let apiFirestore = null;

async function conectarFirebase() {
    // import() dinámico: si el CDN no responde, el resto de la página sigue funcionando
    const [appMod, firestoreMod] = await Promise.all([
        import(`${CDN_FIREBASE}/firebase-app.js`),
        import(`${CDN_FIREBASE}/firebase-firestore.js`)
    ]);
    db = firestoreMod.getFirestore(appMod.initializeApp(firebaseConfig));
    apiFirestore = firestoreMod;
}

function conLimiteDeTiempo(promesa, ms) {
    return Promise.race([
        promesa,
        new Promise((_, rechazar) => {
            setTimeout(() => rechazar(new Error("Tiempo de espera agotado")), ms);
        })
    ]);
}

async function obtenerMensajesFirestore() {
    try {
        await conLimiteDeTiempo(conectarFirebase(), TIEMPO_LIMITE_CONEXION);
    } catch (error) {
        console.log("Sin conexión a Firebase, se usan las dedicatorias locales de respaldo...");
        return [];
    }

    try {
        const snapshot = await apiFirestore.getDocs(apiFirestore.collection(db, "mensajes"));
        const mensajes = [];
        snapshot.forEach((doc) => {
            const texto = doc.data().texto;
            if (texto) mensajes.push(texto);
        });
        return mensajes;
    } catch (error) {
        console.log("No se pudieron leer las dedicatorias de Firestore...");
        return [];
    }
}

/* ====== Cartas amarillas: abrir, pasar a la siguiente y arrancar la historia ====== */
let historiaIniciada = false;
let timeoutHistoria;

/* Abre una carta del mazo y la trae al frente */
function abrirCarta(carta, index, total) {
    carta.classList.add('abierta');
    carta.style.zIndex = 600;
    carta.style.transform = 'translate(-50%, -50%) scale(1.05) rotate(0deg)';
    cartasLeidas.add(index);

    if (cartasLeidas.size === total) {
        programarHistoria(4000); // ya se leyeron todas: la historia arranca sola
    }
}

/* Al tocar una carta ya abierta se pasa a la siguiente carta sin leer */
function pasarASiguienteCarta(desde, total) {
    const cartas = document.querySelectorAll('.Floresa_Amarillas');

    for (let paso = 1; paso <= total; paso++) {
        const i = (desde + paso) % total;
        if (!cartasLeidas.has(i)) {
            abrirCarta(cartas[i], i, total);
            return;
        }
    }

    programarHistoria(0); // no quedan cartas nuevas: se adelanta la historia
}

/* Arranca la historia una sola vez (con una pequeña espera para leer) */
function programarHistoria(demora) {
    if (historiaIniciada) return;

    clearTimeout(timeoutHistoria);
    timeoutHistoria = setTimeout(() => {
        historiaIniciada = true;
        const contenedor = document.getElementById('corazon-primavera');
        contenedor.style.transition = "opacity 1s ease";
        contenedor.style.opacity = "0";
        iniciarHistoria();
    }, demora === undefined ? 4000 : demora);
}

async function cargarCartas() {
    const contenedor = document.getElementById('corazon-primavera');
    let mensajes = await obtenerMensajesFirestore();

    if (mensajes.length === 0) {
        mensajes = mensajesLocales;
    }

    mensajes.forEach((texto, index) => {
        const carta = document.createElement('div');
        carta.className = 'Floresa_Amarillas';

        const orden = mensajes.length - index;
        const rotacion = (Math.random() * 12) - 6;
        carta.dataset.orden = orden;
        carta.dataset.rotacion = rotacion;

        carta.style.zIndex = orden;
        carta.style.transform = `translate(-50%, -50%) rotate(${rotacion}deg)`;

        carta.innerHTML = `
            <div class="flor-icono">🌻</div>
            <div class="texto-carta">${texto}</div>
        `;

        carta.addEventListener('click', function() {
            if (this.classList.contains('abierta')) {
                // Carta ya leída: se cierra y el toque pasa a la siguiente carta
                cerrarCarta(this);
                pasarASiguienteCarta(index, mensajes.length);
            } else {
                abrirCarta(this, index, mensajes.length);
            }
        });

        contenedor.appendChild(carta);
    });
}

function cerrarCarta(carta) {
    carta.classList.remove('abierta');
    carta.style.zIndex = carta.dataset.orden;
    carta.style.transform = `translate(-50%, -50%) rotate(${carta.dataset.rotacion}deg)`;
}

/* Deja las cartas como al inicio para poder volver a leer toda la historia */
function reiniciarCartas() {
    const contenedor = document.getElementById('corazon-primavera');
    clearTimeout(timeoutHistoria);
    historiaIniciada = false; // la historia puede volver a arrancar
    cartasLeidas.clear();
    document.querySelectorAll('.Floresa_Amarillas').forEach(cerrarCarta);
    contenedor.style.opacity = "1";
}

/* Avisa con claridad si alguna foto no llega al dispositivo (archivo faltante) */
function vigilarFoto() {
    const imagen = document.getElementById('imagen-historia');
    if (!imagen) return;

    imagen.addEventListener('error', function () {
        if (this.getAttribute('src')) this.parentElement.classList.add('sin-foto');
    });

    imagen.addEventListener('load', function () {
        this.parentElement.classList.remove('sin-foto');
    });
}

function activarExplosionCorazones() {
    const corazones = document.querySelectorAll('.bubble');
    
    corazones.forEach(corazon => {
        corazon.addEventListener('click', function() {
            this.classList.add('pop');
            setTimeout(() => {
                this.remove();
            }, 300);
        });
    });
}

const nuestraHistoria = [
    { 
        foto: "foto1.png", 
        texto: "Nunca me imaginé que empezar a vivir juntos sería la mejor decisión de toda mi vida. Despertar a tu lado cada mañana y compartir cada noche contigo se ha convertido en un verdadero ensueño del que no quiero despertar jamás, mi amada Ruth Otazu." 
    },
    { 
        foto: "foto2.png", 
        texto: "Deseo con todo mi corazón que este cumpleaños haya sido tan espectacular como tú. Verte sonreír, divertirte y brillar rodeada de personas buenas es lo que más me llena el alma. Te mereces absolutamente toda la felicidad del mundo." 
    },
    { 
        foto: "foto3.png", 
        texto: "Aún sonrío al recordar nuestra primera salida juntos. Aquella noche en el cumpleaños de tu ex compañero, donde entre tantas risas y unas cuantas copas de más, supe que quería compartir incontables momentos de locura y alegría a tu lado." 
    },
    { 
        foto: "foto4.png", 
        texto: "Nuestra última cita en el shopping junto a Mini fue simplemente perfecta. Míranos en esta foto, salimos hermosos porque el inmenso amor que nos tenemos, Giuliano Catella y tú, se refleja en nuestras miradas. Ustedes son mi familia y mi todo." 
    }
];

let indiceHistoria = 0;
let escribiendo = false;
let timeoutEscritura;

function iniciarHistoria() {
    const galeria = document.getElementById('galeria-historia');
    galeria.classList.remove('oculto');
    setTimeout(() => {
        galeria.style.opacity = "1";
        mostrarDiapositiva(0);
    }, 100);
}

/* Rehace la entrada de la hoja en cada diapositiva */
function animarHoja() {
    const hoja = document.querySelector('.hoja-carta');
    if (!hoja) return;
    hoja.classList.remove('entrando');
    void hoja.offsetWidth; // fuerza el reinicio de la animación
    hoja.classList.add('entrando');
}

/* Confirmación visual del toque: la foto da un saltito */
let timeoutSalto;
function saltarImagen() {
    const marco = document.querySelector('.marco-foto');
    if (!marco) return;

    clearTimeout(timeoutSalto);
    marco.classList.remove('saltando');
    void marco.offsetWidth; // reinicia la animación aunque ya estuviera saltando
    marco.classList.add('saltando');

    // La clase se limpia siempre, aunque el navegador no emita animationend
    timeoutSalto = setTimeout(() => marco.classList.remove('saltando'), 560);
}

function mostrarDiapositiva(indice) {
    indiceHistoria = indice; // mantiene el índice sincronizado con lo que se ve

    if (indice >= nuestraHistoria.length) {
        const galeria = document.getElementById('galeria-historia');
        galeria.style.opacity = "0";
        setTimeout(() => {
            galeria.classList.add('oculto');
            reiniciarCartas(); // así puede volver a vivir toda la historia
        }, 800);
        return;
    }

    const slide = nuestraHistoria[indice];
    document.getElementById('imagen-historia').src = slide.foto;
    const contenedorTexto = document.getElementById('texto-historia');
    const indicador = document.getElementById('indicador-toque');

    animarHoja();
    contenedorTexto.innerHTML = ""; 
    contenedorTexto.scrollTop = 0;
    indicador.classList.add('oculto'); 
    
    escribirTexto(slide.texto, contenedorTexto, indicador);
}

function escribirTexto(texto, contenedor, indicador) {
    escribiendo = true;
    let i = 0;
    
    function escribir() {
        if (i < texto.length) {
            contenedor.innerHTML += texto.charAt(i);
            i++;
            timeoutEscritura = setTimeout(escribir, 50); 
        } else {
            escribiendo = false;
            indicador.classList.remove('oculto'); 
        }
    }
    escribir();
}

document.getElementById('galeria-historia').addEventListener('click', function() {
    if (escribiendo) {
        // Primer toque: completa la dedicatoria y la foto salta como confirmación
        clearTimeout(timeoutEscritura);
        document.getElementById('texto-historia').innerHTML = nuestraHistoria[indiceHistoria].texto;
        escribiendo = false;
        document.getElementById('indicador-toque').classList.remove('oculto');
        saltarImagen();
    } else {
        // Siguiente toque: pasa a la siguiente carta (foto + texto nuevos)
        indiceHistoria++;
        mostrarDiapositiva(indiceHistoria);
    }
});

cargarCartas();
activarExplosionCorazones();
vigilarFoto();