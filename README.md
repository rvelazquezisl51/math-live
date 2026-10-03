# Math Live V4

Proyecto educativo de Rene M. Velazquez Avila.

## Qué cambia en V4
- Autenticación anónima de Firebase: estudiantes sin correo ni contraseña.
- El maestro queda identificado como propietario de la partida.
- Cada estudiante usa su propio UID y solo puede actualizar sus resultados.
- Lobby en tiempo real con código de 6 dígitos.
- 2.º grado: forma estándar, desarrollada, unitaria, escrita y valor posicional hasta centenas.
- K y 1.º conservan motores visuales iniciales con conteo/puntos.
- Arquitectura preparada para ampliar 3.º–5.º.

## Para conectar tu proyecto Firebase
1. Abre `firebase-config.js` con Bloc de notas o VS Code.
2. Copia en él los seis valores de la configuración de tu Web App de Firebase.
3. En Firebase > Firestore > Reglas, reemplaza las reglas actuales por el contenido de `firestore.rules` y publica.
4. Publica estos archivos juntos en un servidor web (por ejemplo, GitHub Pages). No abras `index.html` mediante `file://` para la prueba final entre dispositivos.

## Primera prueba
- Maestro: crea una partida y comparte el código.
- Estudiante: abre la misma URL desde otro dispositivo, escribe código + nombre.
- El nombre debe aparecer en el lobby del maestro.
- Maestro pulsa COMENZAR JUEGO.
- El estudiante recibe la partida y sus resultados aparecen en el lobby.

© 2026 Rene M. Velazquez Avila · Todos los derechos reservados.

## V5 — Integración Engine V2.2.0
- Motor K–5 auditado incluido en `math-engine-v2.js`.
- El maestro crea un blueprint común de 15 desafíos.
- Cada estudiante recibe variantes propias del mismo plan de habilidades.
- Registro de CORE / REVIEW / APPLICATION y evidencia diagnóstica.
- El generador matemático V4 fue retirado del flujo de juego.

## V5.1 — Ajuste técnico y visual
- Modo Integrado es ahora el modo real y predeterminado; ya no depende de seleccionar Reto rápido.
- K aparece primero, seguido de 1.º a 5.º.
- Tarjetas y botones tienen respuesta táctil: elevación al pasar el cursor y presión al hacer clic/tocar.
- Se respeta `prefers-reduced-motion` por accesibilidad.
- Los formatos especializados aparecen como parte del sistema, pero no se presentan falsamente como implementados si todavía están en desarrollo.
- Se completaron todos los identificadores conocidos del proyecto Firebase. Falta únicamente pegar la API key exacta del proyecto.
