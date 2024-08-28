# API Node.js con MongoDB en la Nube

Este proyecto tiene como objetivo desarrollar una API robusta utilizando Node.js y Express.js, diseñada para gestionar de manera eficiente una colección de recetas culinarias. La API permite realizar operaciones CRUD para manejar recetas, proporcionando un servicio escalable y bien estructurado para aplicaciones gastronómicas.

## Estructura de la Receta

Cada receta registrada en la API incluirá la siguiente información:

- **Título (title)**: Nombre de la receta.
- **Descripción (description)**: Breve resumen de la receta.
- **Preparación (preparation)**:
  - **Ingredientes (ingredients)**: Tiempo de preparación de los ingredientes (en minutos).
  - **Cocción (cooking)**: Tiempo de cocción (en minutos).
  - **Total (total)**: Tiempo total requerido (en minutos).
- **Instrucciones (instructions)**: Pasos detallados que describen el proceso completo de preparación de la receta.
- **Ingredientes (ingredients)**: Lista detallada de los ingredientes necesarios, incluyendo cantidades.
- **Valores Nutricionales (nutritionalValues)**:
  - **Calorías (calories)**: Contenido calórico de la receta.
  - **Carbohidratos (carbohydrates)**: Cantidad de carbohidratos.
  - **Proteínas (protein)**: Cantidad de proteínas.
  - **Grasas (fat)**: Cantidad de grasas.

## Requisitos de la API

La API permite las siguientes operaciones CRUD:

- **GET**: Obtener el listado completo de recetas.
- **GET**: Obtener una receta específica por su ID.
- **POST**: Crear una nueva receta.
- **PATCH**: Editar una receta existente por su ID.
- **DELETE**: Eliminar una receta por su ID.

## Validaciones

Para asegurar la integridad de los datos ingresados, se implementan las siguientes validaciones:

- **Título (title)**: Obligatorio, debe ser una cadena de texto (string).
- **Descripción (description)**: Obligatorio, debe ser una cadena de texto (string).

## Ejemplo de Solicitud POST

Aquí se muestra un ejemplo del cuerpo de la solicitud (body) para crear una nueva receta:

```json
{
  "title": "Guacamole",
  "description": "El guacamole es una receta clásica mexicana, perfecta como aperitivo o guarnición. Hecho con aguacates maduros, tomate, cebolla y cilantro, es una opción deliciosa y saludable para cualquier ocasión.",
  "preparation": {
    "ingredients": "10 minutos",
    "cooking": "0 minutos",
    "total": "10 minutos"
  },
  "instructions": [
    "Corta los aguacates por la mitad, retira el hueso y extrae la pulpa con una cuchara. Coloca la pulpa en un tazón grande.",
    "Usa un tenedor para machacar el aguacate hasta alcanzar la textura deseada (puedes dejar algunos trozos más grandes si lo prefieres).",
    "Agrega el tomate picado, la cebolla, el cilantro y el jugo de limón al tazón.",
    "Mezcla bien todos los ingredientes y sazona con sal y pimienta al gusto.",
    "Sirve inmediatamente con totopos, tortillas o como guarnición con otras comidas."
  ],
  "ingredients": [
    "3 aguacates maduros",
    "1 tomate, picado",
    "1/2 cebolla, picada",
    "1/4 taza de cilantro fresco, picado",
    "Jugo de 1 limón",
    "Sal y pimienta al gusto"
  ],
  "nutritionalValues": {
    "calories": 150,
    "carbohydrates": "12g",
    "protein": "2g",
    "fat": "11g"
  }
}
