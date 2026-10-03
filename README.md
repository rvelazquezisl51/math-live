# Math Live V5.8.4 — Fondo limpio verificado

Versión de prueba corregida.

## Corrección principal
- Nuevo fondo `assets/math-live-world-v584.png` creado SIN panel, formularios, avatares ni botones incrustados.
- El único panel de estudiante es el HTML funcional.
- Cache-busting actualizado a V5.8.4 (`v=584`).

## Se conserva
- 18 avatares gráficos.
- Vistas separadas Estudiante / Maestro / TV.
- TV: orden de entrada + avatar + nombre en lobby; progreso público sin exponer aciertos/errores durante Modo Integrado.
- Maestro: progreso privado con aciertos/errores.
- Entrada bloqueada al comenzar.
- Temporizador global y tratamiento de preguntas sin responder.
- Firebase/Auth/Firestore y motor matemático sin cambios de arquitectura.
