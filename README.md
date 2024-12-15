# Mid-Frontend Challenge Agustin Policano

Este repositorio contiene dos aplicaciones:
1. **API Service**: Una API personalizada creada con **Node.js**
2. **Frontend con React**: Una aplicación **React** que consume la API y ofrece funcionalidades de filtros, ordenamiento, formularios y visualización de estadísticas.

---

## **Índice**
- [Mid-Frontend Challenge Agustin Policano](#mid-frontend-challenge-agustin-policano)
  - [**Índice**](#índice)
  - [**Características del proyecto**](#características-del-proyecto)
    - [**Backend - API Service**](#backend---api-service)
    - [**Frontend - React**](#frontend---react)
  - [**Instalación y ejecución**](#instalación-y-ejecución)
    - [**Backend - API Service**](#backend---api-service-1)
    - [**FrontEnd - React**](#frontend---react-1)
  - [**Links al deploy**](#links-al-deploy)
  - [**Resumen de la solución**](#resumen-de-la-solución)
  - [**Desafíos y decisiones técnicas**](#desafíos-y-decisiones-técnicas)
  - [**Fin del Readme**](#fin-del-readme)

---

## **Características del proyecto**

### **Backend - API Service**
- Creación de una API RESTful con Node.js
- Gestión de propiedades con filtros y ordenamiento (por precio, área, tipo, estado).
- Variables de entorno para configuraciones sensibles.

### **Frontend - React**
- Interfaz de usuario utilizando **Material UI**.
- Búsqueda y filtrado dinámico de propiedades.
- Ordenamiento de resultados (ascendente/descendente).
- Visualización de estadísticas con **Chart.js**.
- Formularios de creación/edición con validaciones (React Hook Form).
- Uso de **Redux** para controlar el estado de la aplicación
- Diseño responsive con CSS y hooks (useMobile)

---

## **Instalación y ejecución**
⚠️ **Requisito**: Versión de Node.js recomendada: `22.12.0` (Para evitar conflictos con dependencias).
### **Backend - API Service**
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/AgustinPolicano/mid-frontend-challenge/tree/agustin-policano
   cd /api-service 
     ```
2.   **Instalar dependencias**:
   ```bash 
       npm install
   ```
3. **Configurar variables de entorno**:
   ```env
   Crea un archivo .env en la carpeta de /api-service :
   PORT=5000 (O el puerto que gustes)
   EXTERNAL_API_URL = 'https://fake-api-listings.vercel.app/'
     ```
3.  **Ejecutar el servidor**:  
    ```env
     npm run dev
     ```
     
Tu servicio ya deberia estar corriendo en el puerto seleccionado 🚀

### **FrontEnd - React**
1. **Asumiendo que clonaste el repositorio en el paso previo**:
     ```env
    En la raiz del proyecto ejecutar npm install
     ```
2. **Configurar variables de entorno**:
      ```env
    Crea un archivo .env en la carpeta raíz con la URL de la API:
    REACT_APP_API=http://localhost:5000/api
     ```
3. **Ejecutar la aplicación**:
    ```env
    npm start
    ```
La aplicación estará disponible en http://localhost:3000.

Con estos pasos deberias tener el proyecto inicializado, tanto el servicio como el front. 🚀

---

## **Links al deploy**
- Front End React: https://challenge-red-atlas-front-end.vercel.app/
- Api Service: https://api-service-red-atlas.vercel.app/api/
---

## **Resumen de la solución**
- Decidi desde un primer momento hacer mi servicio custom ya que desligaria de realizar la lógica "pesada" en el front. El backend lo cree node.js aprovechando que podia también implementarle TS, fue un reto divertido ya que no tengo tanta experiencia en el desarrollo de servicios con Node.js (espero que no se note tanto 😂).
- Agregué algunos filtros cruzados, como area, precio, estado y que todo pueda filtrarse al mismo tiempo. Aprovechando así el servicio custom que cree.
- Implementé mapbox para el manejo del mapa. Tambien crei/creo que es mejor mostrar al usuario los marcadores
de las propiedades que esta viendo en el momento, tal vez este errado pero sentia que era mejor visualmente y con menos carga en el servidor.
- Para esto que menciono arriba use redux, se encargo de manejar el estado de las propiedades y aproveche para usar el snackbar de forma global también con Redux.
- Use la libreria react-hooks-form para el manejo de los formularios.
- Use Chart.js para mostrar las estadistícas de las propiedades, compara inactiva e activas, los precios, los estados y el tipo de propiedad.

---

## **Desafíos y decisiones técnicas**

El mayor desafío en el proyecto fue la creacion de la **Api Custom** . Ya que es algo que no tenía muy visto sinceramente y me llevo muchas horas. Pero también hubo 3 decisiones importantes que creo que tome en este proyecto.

1. **Separación del Backend y Frontend**  
   - Opté por separar el **API Service** y la aplicación **React** en dos proyectos independientes.  
   - Esta separación permite un desarrollo y despliegue modular, donde cada aplicación puede escalar o actualizarse de manera individual.

2. **No mostrar todas las propiedades en el mapa**  
    - Opté por mostrar las propiedades de forma dinámica en el mapa, sincronizando los marcadores con las     propiedades visibles en la lista según la paginación.  
   - Aunque podría no ser lo esperado inicialmente, considero que esta implementación mejora significativamente la experiencia visual y el rendimiento.  
   - Mostrar todas las propiedades en el mapa podría generar un exceso de marcadores, lo que saturaría la interfaz y afectaría negativamente la usabilidad y el rendimiento en dispositivos móviles. sino que muestra únicamente las 10 que se ven en la página actual del listado (para esto use **react-redux**) 
   
3. **Separar la lógica en los .tsx y crear hooks para manejar la misma**  
   - Implementé una estructura modular separando la lógica de negocio y las funcionalidades reutilizables en hooks personalizados.  
   - Esto permitió una mejor organización del código y facilitó la reutilización de funcionalidades comunes como la búsqueda, el filtrado y la paginación.  
   - Además, utilicé **React Hook Form** para la validación eficiente de formularios de creación y edición de propiedades, reduciendo renderizados innecesarios y simplificando las validaciones tanto en el frontend como en el backend.

---

## **Fin del Readme**

Espero que les guste mi desarrollo y mil gracias por la oportunidad. ¡Me divertí mucho haciéndolo! 🚀

