## Mid Frontend Challenge - Nicolas Colombo

# Tecnologias Utilizadas
- React.js
- Vite.js

# Pasos para ejecutar la aplicación

1. Ejecutar el comando: npm install
2. Ejecutar el comando: npm run dev

# Enlace al proyecto desplegado

https://red-atlas-challenge-ncolombo.vercel.app/

# Resumen de mi solución

Disfrute mucho haciendo este challenge, para empezar primero me puse a pensar en como seria la UI, como es una aplicación inmobiliaria, me centre en que las tarjetas con la información de las propiedades sean lo mas visible y claras posible, ya que es lo que va a ver el usuario, tambien me asegure que los filtros sean claros y de opción multiple, ya que esto ahorra al usuario tener que aplcar filtros multiples veces. De igual forma realice los formularios de creación y edición, ademas de los mapas (general y por propiedad). 

En cuanto a lo tecnico me enfoque en componentizar lo mas posible, separando paginas y componentes individuales, realizando interfaces reutilizables, y utilizando css puro para un mejor control de los estilos.

Un desafio que tuve fue crear el componente de mapa con todos los requerimientos, tuve que investigar posibles soluciones y me decante por usar Leaflet, que es de codigo abierto y tiene muchas funcionalidades, ademas de asegurarme de que funcionara en base a las propiedades filtradas, tambien teniendo en cuenta las propiedades creadas (que manejan la latitud y longitud de manera dinamica utilizando la localizacion dada al componente y tranformandola en coordenadas).

Tambien he de mencionar que utilice como estado principal el archivo properties.json debido a un problema de CORS con la API que nos proporcionaron, de igual forma deje la implementaicion en el servicio.

# Extras Adicionales

- Utilice Local Storage para persistir la informacion nueva.
- Me asegure de que las propiedades en el mapa se carguen a medida que se visualicen en el mapa.
- Como mencione antes, las localizaciones de las nuevas propiedades que se creen seran en base a "Location Name" dandole al componente coordenadas de manera dinamica.


Esta fue mi solución al Challenge, espero que les guste!