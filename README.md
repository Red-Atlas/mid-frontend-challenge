## Mid Frontend Challenge - Nicolás Colombo

# Tecnologías Utilizadas
- React.js
- Vite.js

# Pasos para ejecutar la aplicación

1. Ejecutar el comando: `npm install`.
2. Ejecutar el comando: `npm run dev`.

# Enlace al proyecto

[Ver Proyecto Desplegado](https://red-atlas-challenge-ncolombo.vercel.app/)

# Resumen de mi solución

Disfruté mucho haciendo este challenge. Para empezar, primero pensé en cómo sería la UI. Como se trata de una aplicación inmobiliaria, me centré en que las tarjetas con la información de las propiedades fueran lo más visibles y claras posible, ya que es lo que el usuario verá. También me aseguré de que los filtros fueran claros y de opción múltiple, ya que esto ahorra al usuario tener que aplicar filtros múltiples veces. Asimismo, realicé los formularios de creación y edición, además de los mapas (general y por propiedad). 

En cuanto a lo técnico, me enfoqué en componentizar lo más posible, separando páginas y componentes individuales, creando interfaces reutilizables y utilizando CSS puro para un mejor control de los estilos.

Un desafío que tuve fue crear el componente de mapa con todos los requerimientos. Tuve que investigar posibles soluciones y me decanté por usar Leaflet, que es de código abierto y tiene muchas funcionalidades. Además, me aseguré de que funcionara en base a las propiedades filtradas, también considerando las propiedades creadas (que manejan la latitud y longitud de manera dinámica, utilizando la localización proporcionada al componente y transformándola en coordenadas).

También cabe mencionar que utilicé como estado principal el archivo `properties.json` debido a un problema de CORS con la API que nos proporcionaron. Sin embargo, dejé la implementación en el servicio.

# Extras Adicionales

- Utilicé Local Storage para persistir la información nueva.
- Me aseguré de que las propiedades en el mapa se carguen a medida que se visualicen en el mapa.
- Como mencioné antes, las localizaciones de las nuevas propiedades que se creen serán en base a "Location Name", asignando coordenadas al componente de manera dinámica.

Esta fue mi solución al challenge. ¡Espero que les guste!
