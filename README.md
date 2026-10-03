# Math Live V5.7 — Accesos separados + seguridad del maestro

© 2026 Rene M. Velazquez Avila · Espacio de Aprendizaje · Todos los derechos reservados.

## Rutas
- `index.html` — acceso exclusivo del estudiante. No contiene botones ni controles de maestro.
- `teacher.html` — panel privado del maestro con inicio de sesión Firebase Email/Password.
- `present.html?code=XXXXXX` — pantalla TV; debe abrirse desde el mismo navegador donde el maestro inició sesión.

## Antes de publicar V5.7
1. En Firebase Console > Authentication > Sign-in method, habilitar **Email/Password**.
2. Crear la cuenta de maestro en Firebase Authentication > Users.
3. Publicar el contenido de `firestore.rules` en Firestore > Rules.
4. Subir todos los archivos de este paquete a la raíz del repositorio `math-live`.
5. Probar en tres vistas: maestro (`teacher.html`), estudiante (`index.html`) y TV abierta desde el panel del maestro.

## Seguridad aplicada
- Crear/modificar una partida requiere una cuenta Firebase no anónima y ser el `teacherUid` de la partida.
- El estudiante usa autenticación anónima y solo puede crear su propio registro mientras la partida esté en `lobby`.
- Al pasar a `playing`, Firestore rechaza nuevas inscripciones.
- Un estudiante solo puede actualizar su propio progreso y no puede cambiar nombre/avatar/UID desde el juego.
- La lista completa de estudiantes solo puede leerla el maestro propietario de la partida; la TV hereda esa sesión del maestro.
- La seguridad no depende de ocultar botones: está reforzada por reglas de Firestore.

## Pendiente antes de producción definitiva
- Crear/habilitar la cuenta real del maestro en Firebase (acción manual en Firebase Console).
- Desplegar las reglas nuevas (GitHub Pages no despliega reglas Firestore).
- Prueba real multidispositivo y prueba de intentos no autorizados.
- Los modos Memoria, Crucigrama y Construye siguen reservados hasta que tengan mecánica propia completa.
