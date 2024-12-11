<<<<<<< HEAD
# Front-End Challenge - Mid-Level 🚀

## Descripción

El objetivo de este desafío es crear una aplicación para listar, gestionar y localizar propiedades inmobiliarias. Este reto evaluará tus habilidades para consumir APIs, manejo de estado, integración de herramientas externas como mapas y aplicar buenas prácticas de desarrollo.

¡Confía en tu talento y diviértete mientras lo haces! 🌟

---

## Requisitos Técnicos

- **Framework**: React + TypeScript.
- **Estilos**: Tecnología a libre elección. Puedes usar frameworks o bibliotecas como:

  - CSS puro o preprocesadores como SASS o LESS.
  - CSS-in-JS (por ejemplo, Styled Components, Emotion).
  - Frameworks de diseño (por ejemplo, Tailwind CSS, Material-UI, Chakra UI).
  - Bootstrap o cualquier sistema de diseño que prefieras.

  Valoramos si el diseño se adapta al estilo de Red Atlas (https://atlas.red/).

- **Diseño Responsive**: Debe adaptarse correctamente a dispositivos móviles, tablets y desktops.
- **Estado**: Implementar manejo de estado global (Context API, Redux Toolkit, etc.).
- **Enrutamiento**: Implementar las rutas que consideres necesarias para los requisitos del proyecto.

## Requisitos del Proyecto

1. **Pantalla de Listado de Propiedades**:

   - Mostrar una lista de propiedades con:
     - Título.
     - Imagen.
     - Dirección.
     - Tipo de propiedad (`Apartment`, `House`, etc.).
     - Precio.
     - Estado (`En venta`, `En alquiler`).
     - Disponibilidad (`Activo`, `Inactivo`).
     - Area
     - Fecha de publicación
   - Funcionalidades:
     - **Búsqueda**: Filtrar propiedades por titulo o dirección.
     - **Filtros**: Por tipo de propiedad y estado. Si decides implementar filtros avanzados (combinados), será considerado como un punto a favor 😉
     - **Ordenar por precio** (ascendente/descendente).
     - **Paginación**: Mostrar un número limitado de propiedades por página.

2. **Vista de Detalle de Propiedad**:

   - Al hacer click en una propiedad, abrir una pantalla que muestre todos los datos de la propiedad.
   - Incluir botón para regresar al listado.

3. **Mapa Interactivo**:

   - Incluir un mapa en la pantalla principal que:
     - Localice las propiedades en un mapa interactivo.
     - Permita hacer click en un marcador para mostrar un resumen de la propiedad.
   - Usar **Mapbox**, **Google Maps** o cualquier librería de mapas.

4. **Formulario de Creación/Edición de Propiedades**:
   - Permitir crear una nueva propiedad o editar una existente.
   - Agregar validaciones para campos obligatorios como título, dirección, precio y tipo.
   - Mostrar mensajes de error claros y accesibles.

## Extras Opcionales ✨

- **Optimización del mapa**:
  - **Lazy Loading de Marcadores**: Cargar y mostrar solo las propiedades visibles en el viewport del mapa en lugar de precargar todos los datos.
  - **Clusterización de Marcadores**: Agrupar marcadores cercanos para evitar la superposición y facilitar la navegación en áreas densas.
  - **Actualización Dinámica**: Actualizar automáticamente los marcadores al cambiar el nivel de zoom o al desplazarse en el mapa.
- Implementar gráficos con estadísticas (por ejemplo, número de propiedades por estado o tipo).
- Manejo avanzado de errores (mostrar mensajes claros si la API falla).

## API Fake

La API estará disponible en:

- **Base URL**: https://fake-api-listings.vercel.app/api-docs/
- **Endpoints**:
  - `GET /properties`: Lista de propiedades.
  - `GET /properties/:id`: Detalles de una propiedad.
  - `POST /properties`: Crear una propiedad.
  - `PUT /properties/:id`: Editar una propiedad.
  - `DELETE /properties/:id`: Eliminar una propiedad.

**Nota:**

Esta API es pública y compartida entre todos los candidatos. Para evitar problemas, realiza cambios solo en las propiedades que tú mismo crees. **Si deseas usar tu propia API, ¡será valorado!**

En caso de que la API tenga problemas, proporcionamos un archivo JSON con datos de ejemplo que puedes utilizar localmente. Este archivo incluye un conjunto básico de propiedades para ayudarte a cumplir con los requisitos del proyecto.
El archivo se encuentra disponible en este repositorio bajo el nombre `properties.json`.

**Ejemplo de propiedad:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "title": "Moderna Casa Familiar",
  "address": "Calle Secundaria 456",
  "description": "Amplia y luminosa casa ideal para familias...",
  "location": {
    "lat": -34.6037,
    "lng": -58.3816
  },
  "images": ["https://via.placeholder.com/150"],
  "type": "house",
  "status": "sale",
  "isActive": true,
  "price": 120000,
  "area": 250,
  "createdAt": "2024-05-15T10:00:00.000Z",
  "updatedAt": "2024-11-20T15:45:00.000Z",
  "owner": {
    "name": "John Doe",
    "contact": "johndoe@example.com"
  }
}
```

## Instrucciones de Entrega

- Realiza un fork de este repositorio: `Red-Atlas/mid-frontend-challenge`.
- Crea un branch con tu nombre completo en el formato: nombre-apellido.
- Sube tu código al branch correspondiente.
- Desplegar la aplicación en un servicio gratuito como **Vercel** o **Netlify**.

- Incluye en el README del fork:
  - instrucciones en el `README.md` para instalar y ejecutar la aplicación.
  - El enlace al proyecto desplegado.
  - Un resumen de tu solución (enfoque, desafíos, decisiones técnicas).
  - Realiza un pull request a este repositorio.

## Criterios de Evaluación

1. **Funcionalidad**: Cumplimiento de los requisitos principales.
2. **Código**: Limpieza, modularidad y buenas prácticas.
3. **Diseño**: Interfaz funcional y clara.
4. **Extras Opcionales**: Implementación correcta si decides incluirlos.

---

### 🚀 ¡Buena suerte!
