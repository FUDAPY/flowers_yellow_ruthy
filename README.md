<div align="center">

# 🌻 Ruthy — Carta Romántica de Primavera

**Un regalo web interactivo: flores amarillas, cartas y una historia de amor contada en fotos.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Licencia MIT](https://img.shields.io/badge/Licencia-MIT-yellow?style=for-the-badge)](./LICENSE)

*Inspirado en la tradición del Día de la Primavera: quien te regala flores amarillas, te promete un amor eterno.* 💛

</div>

---

## ✨ ¿Qué es esto?

Es una **página web de una sola pantalla** pensada como regalo romántico. No usa frameworks ni build tools: es **HTML + CSS + JavaScript puro**, así que se abre con doble clic y también se puede publicar gratis en **Firebase Hosting**.

La experiencia se desarrolla en tres actos:

| Acto | Qué pasa en pantalla |
|:---:|---|
| **1. Cielo nocturno** | Aparecen **cartas amarillas flotantes** (una por dedicatoria) sobre un cielo estrellado con flores animadas y corazones que explotan al tocarlos. |
| **2. Las cartas** | Al tocar cada carta, **se voltea a blanco** y muestra su mensaje. Cuando se abren **todas**, el fondo se desvanece solo. |
| **3. La historia** | Se abre una **hoja tamaño carta real (8.5 × 11 in)** con un portarretrato, una foto y un texto que **se escribe letra por letra**. Un toque completa el texto; otro toque pasa a la siguiente foto. |

Cuando termina la última diapositiva, todo vuelve a empezar: las cartas se cierran y la historia puede vivirse de nuevo, sin recargar la página. ♻️

---

## 📂 Estructura del proyecto

```
ruthy/
├── index.html             # Toda la estructura: cielo, flores, cartas, galería
├── style.css              # Diseño, animaciones y la hoja tamaño carta
├── app.js                 # Lógica: cartas, textos, Firebase y la historia
├── firebase.json          # Configuración de Firebase Hosting + Firestore
├── firestore.rules        # Reglas de seguridad de Firestore (lectura pública)
├── firestore.indexes.json # Índices de Firestore (vacío por defecto)
├── .firebaserc            # Proyecto de Firebase por defecto
├── LICENSE                # Licencia MIT
├── README.md              # Este archivo
├── foto1.png              # ⚠️ NO versionadas (ignoradas por Git)
├── foto2.png              #     Debes agregarlas tú en la raíz
├── foto3.png
└── foto4.png
```

> ⚠️ **Las fotos NO están en el repositorio.** Están excluidas con `.gitignore` porque son personales, así que si clonas el proyecto verás la app **sin imágenes** hasta que agregues las tuyas.

---

## 🚀 Instalación y uso

### Opción A — Sin instalar nada (la más simple) 🥇

1. Descarga o clona el proyecto:
   ```bash
   git clone https://github.com/FUDAPY/flowers_yellow_ruthy.git
   cd flowers_yellow_ruthy
   ```
2. Copia tus 4 fotos en la raíz con los nombres `foto1.png`, `foto2.png`, `foto3.png` y `foto4.png`.
3. Haz **doble clic en `index.html`**. ¡Listo! No necesita servidor ni instalación.

> También puedes arrastrar el `index.html` a la ventana del navegador, o abrirlo con la extensión *Live Preview* de VS Code.

### Opción B — Con servidor local (recomendado si vas a editar)

**Python** (ya viene en muchos sistemas):
```bash
python -m http.server 5500
```
Luego abre 👉 http://localhost:5500

**Node.js**:
```bash
npx serve .
```

**Con Firebase** (simula el hosting real exactamente como se publica):
```bash
npm install -g firebase-tools
firebase login
firebase emulators:start --only hosting
```
Luego abre 👉 http://localhost:5000

### Requisitos

- Un **navegador moderno** (Chrome, Edge, Firefox, Safari). Se apoya en `aspect-ratio`, `clamp()` y `import()` dinámico.
- **Opcional:** [Node.js](https://nodejs.org/) + `firebase-tools` solo si quieres desplegar en Firebase.
- Sin dependencias, sin `npm install`, sin paso de compilación. 🎉

---

## 🎨 Qué tienes que cambiar

Todo lo personalizable vive en **3 archivos**. Los puntos exactos:

### 1️⃣ Tus fotos → carpeta raíz

Coloca tus imágenes como `foto1.png` … `foto4.png`. Si usas otra cantidad, ajusta el array de la historia (paso 3) y podrás tener las que quieras (2, 6, 10…).

### 2️⃣ Las dedicatorias de las cartas amarillas → `app.js`

En la parte superior de `app.js`, dentro de `mensajesLocales`, cambia estos textos:

```js
const mensajesLocales = [
    "¡Feliz Día de la Juventud y de la Primavera, mi amada Ruth! ...",
    "Dicen que quien te regala flores amarillas hoy te promete un amor eterno. ...",
    "Al igual que esta naturaleza brilla en la noche, tu amor ilumina cada rincón ...",
    "Eres el inicio de todas mis alegrías y la juventud de mi corazón. ..."
];
```
> 💡 Una frase = una carta amarilla. Agrega o quita líneas libremente.

### 3️⃣ La historia (fotos + textos) → `app.js`

Más abajo, en `nuestraHistoria`, cada objeto es una diapositiva de la hoja tamaño carta:

```js
const nuestraHistoria = [
    { foto: "foto1.png", texto: "Nunca me imaginé que empezar a vivir juntos ..." },
    { foto: "foto2.png", texto: "Deseo con todo mi corazón que este cumpleaños ..." },
    { foto: "foto3.png", texto: "Aún sonrío al recordar nuestra primera salida juntos. ..." },
    { foto: "foto4.png", texto: "Nuestra última cita en el shopping junto a Mini ..." }
];
```
> 💡 `foto` acepta cualquier ruta o URL (`"img/nuestra-boda.jpg"` o `https://...`).

### 4️⃣ Colores y velocidad (opcional) → `style.css`

| Qué quieres cambiar | Dónde |
|---|---|
| **Cielo nocturno** (color base de todo el fondo) | `:root { --dark-color: #010113; }` — cámbialo por `#1a0033` para un morado profundo, por ejemplo |
| **Color de las cartas** (amarillo) | `.Floresa_Amarillas { background: #ffeb3b; }` y su estado abierto `#ffffff` / borde `#ffcc00` |
| **Papel de la hoja carta** | `.hoja-carta { background-image: linear-gradient(160deg, #fffdf6 0%, #fff8e4 100%); }` |
| **Tamaño de la hoja** | `.hoja-carta { height: min(78vh, 118vw); aspect-ratio: 8.5 / 11; }` — ¡mantén el `aspect-ratio` para conservar la proporción carta! |
| **Velocidad de la escritura** | `app.js` → `escribirTexto()`: `setTimeout(escribir, 50)` (milisegundos por letra; súbelo para más lento) |
| **Corazones flotantes** | `index.html` → bloque `<div class="bubbles">` (cada `.bubble` es un corazón SVG) |
| **Flores de fondo de la galería** | `index.html` → `<div class="flores-fondo">` con los 10 🌻; se posicionan con `.flor-fondo--1` … `--10` en `style.css` |
| **Tipografía** | `index.html` → el `<link>` de Google Fonts *Dancing Script*, y `font-family` en `style.css` |

> 🌼 **Truco:** los emojis (🌻 ❤️) se ven nativos en cada sistema operativo. Si prefieres flores de verdad, reemplaza el emoji por `<img src="...">` en `index.html`.

---

## 🔥 Firebase: para qué se usa aquí

El proyecto usa **Firebase** de dos maneras, y las dos son **opcionales**: la app funciona igual sin conexión.

| Servicio | Para qué | ¿Obligatorio? |
|---|---|---|
| **Firebase Hosting** | Publicar la página en una URL `https://…` bonita, rápida, con CDN y certificado SSL gratis | Opcional (pero recomendado) |
| **Cloud Firestore** | Guardar las **dedicatorias de las cartas** en la nube, para poder editarlas desde la consola de Firebase **sin volver a desplegar** | Completamente opcional |

### ¿Cómo decide la app qué textos usar?

`app.js` implementa una degradación elegante:

```js
// 1) Intenta leer la colección "mensajes" de Firestore (con un timeout de 7 s)
// 2) Si no hay internet, Firestore está apagado o el CDN no responde →
//    usa automáticamente las dedicatorias locales del propio archivo.
```

> 💡 **Por eso nunca se ve una pantalla rota**: si Firebase falla, aparecen las 4 dedicatorias escritas en `app.js` (`mensajesLocales`). Solo verás un aviso en la consola del navegador (F12).

### Usar tu propio proyecto de Firebase

1. Entra a la [consola de Firebase](https://console.firebase.google.com/) y crea un proyecto.
2. **Firestore Database** → *Crear base de datos* (modo **producción**, así usas las reglas incluidas aquí).
3. Crea la colección **`mensajes`** y agrega un documento por dedicatoria, con **un campo de tipo texto llamado `texto`**:
   ```
   mensajes (colección)
   ├── doc1  { texto: "¡Feliz Día de la Primavera, mi amor!" }
   ├── doc2  { texto: "Dicen que quien regala flores amarillas…" }
   └── doc3  { texto: "Eres el inicio de todas mis alegrías…" }
   ```
   *(El nombre del documento es libre: `doc1`, `carta1`, etc. Lo único que la app lee es el campo `texto`.)*
4. **Configuración del proyecto → Tus apps → Web (`</>`)** → copia el objeto de configuración y pégalo al inicio de `app.js`:
   ```js
   const firebaseConfig = {
     apiKey: "TU_API_KEY",
     authDomain: "TU_PROYECTO.firebaseapp.com",
     projectId: "TU_PROYECTO",
     storageBucket: "TU_PROYECTO.firebasestorage.app",
     messagingSenderId: "TU_SENDER_ID",
     appId: "TU_APP_ID"
   };
   ```
5. Apunta la CLI al proyecto:
   ```bash
   firebase use --add      # elige tu proyecto y ponle el alias "default"
   ```
6. Publica **las reglas** (una sola vez): `firebase deploy --only firestore`

> 🔐 **Nota de seguridad:** la `apiKey` de Firebase **no es un secreto** (está diseñada para ir en el cliente); lo que realmente protege tus datos son las **reglas** de Firestore. Aquí la colección `mensajes` es de **solo lectura pública**: cualquiera con la URL puede *leer* las dedicatorias, pero **nadie puede escribir ni borrar** nada desde el navegador. No guardes información sensible ahí.

---

## 🌐 Despliegue en Firebase Hosting

```bash
npm install -g firebase-tools   # 1. Instala la CLI (una sola vez)
firebase login                  # 2. Inicia sesión
cd flowers_yellow_ruthy         # 3. Entra a la carpeta del proyecto
firebase deploy --only hosting  # 4. ¡Publica!
```

Tu regalo quedará disponible en:

```
https://TU_PROYECTO.web.app
https://TU_PROYECTO.firebaseapp.com
```

**Configuración incluida en `firebase.json`:**

- `"public": "."` → publica la raíz del proyecto (no hay que mover archivos).
- `"ignore": ["**/.*", ...]` → **excluye** del sitio `.git/`, `.gitignore`, `.firebaserc` y `.vscode/`.
- **Caché inteligente:** imágenes y fuentes 7 días, `js`/`css` 1 hora y **HTML sin caché** → al re-desplegar, los cambios se ven al instante.
- `"cleanUrls": true` → permite abrir la URL sin escribir `index.html`.

> 📸 **Las fotos sí se suben al hosting.** El deploy publica la *carpeta local*, no el repositorio Git, así que tu página en Firebase se verá completa con las imágenes, aunque no estén en GitHub.
>
> ⚠️ **Ojo con el deploy automático desde GitHub** (GitHub Actions): como las fotos están ignoradas por Git, ese runner no las tendría y el sitio saldría sin imágenes. En ese escenario, súbelas a **Firebase Storage** y usa sus URLs en `nuestraHistoria`.

Después de cualquier cambio, vuelve a publicar con `firebase deploy --only hosting`.

---

## 🧯 Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| **La página se ve sin fotos** (íconos rotos) | Faltan `foto1.png` … `foto4.png` | Cópialas en la raíz del proyecto con esos nombres exactos |
| **No aparecen cartas y la pantalla está vacía** | Error de JavaScript | Abre la consola con `F12` y revisa el error |
| **La galería abre pero el texto está vacío** | `nuestraHistoria` mal formado | Verifica que cada objeto tenga las claves `foto` y `texto` |
| **Los emojis se ven como cuadritos** | Falta una fuente con emoji | Ya usa `"Segoe UI Emoji"`, `"Apple Color Emoji"` y `"Noto Color Emoji"` como respaldo; en Linux instala `fonts-noto-color-emoji` |
| **En el celular la historia se ve apretada** | Pantallas angostas | Ya viene resuelto con `clamp()`, `78vh` y la media query `@media (max-width: 700px)`; revisa ahí si cambiaste tamaños |
| **Los textos de Firestore no se ven** | Firestore deshabilitado, reglas cerradas o colección vacía | Habilita Firestore, publica `firestore.rules` (`firebase deploy --only firestore`) y crea la colección `mensajes` con el campo `texto`. Mientras tanto se usan los mensajes locales |
| **`firebase deploy` da error 403 / API no habilitada** | La API está apagada en el proyecto | Abre el enlace que muestra el error para habilitarla y vuelve a intentar |
| **Quiero que la historia empiece de nuevo** | — | Al terminar la última diapositiva, toca la pantalla: las cartas se reinician solas ♻️ |

---

## 📄 Licencia

Este proyecto se distribuye bajo la **Licencia MIT** — ver el archivo [LICENSE](./LICENSE).

En resumen: **puedes usarlo, copiarlo, modificarlo, publicarlo y regalarlo libremente** (incluso con fines comerciales), siempre que conserves el aviso de copyright y la licencia. Se entrega *"tal cual"*, sin garantías de ningún tipo.

> 💛 **Lo único que te pido:** si te sirvió para sorprender a alguien, cambia los textos y las fotos por los tuyos. Un regalo copiado pierde la magia. 😉

---

<div align="center">

### 🌻 Hecho con amor, CSS y un poquito de Firebase

*"Quien te regala flores amarillas, te promete un amor eterno."*

Si este proyecto te fue útil, ¡regálale una ⭐ al repositorio!

</div>

