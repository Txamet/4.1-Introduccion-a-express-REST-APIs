# 4.1-Introduccion a express-REST-APIs

Este proyecto es una introducción a la creación de REST APIs con Express y TypeScript.

La aplicación se conecta a una base de datos MySQL y ofrece funcionalidad básica de CRUD para gestionar contactos.

### Nivel 1 ⭐: Gestión de Contactos

Implementa las siguientes funcionalidades para gestionar contactos:

- **POST /contacts**: Añadir un nuevo contacto a la lista.
- **DELETE /contacts/:contactId**: Eliminar un contacto existente.
- **PUT /contacts/:contactId**: Actualizar la información de un contacto.
- **PATCH /contacts/:contactId/favorites**: Marcar o desmarcar un contacto como favorito.
- **PATCH /contacts/:contactId/recover**: Recuperar un contacto eliminado por error.
- **GET /contacts**: Mostrar la lista completa de contactos.

### Gestión de errores

Devuelve un mensaje personalizado si:

- Se intenta crear un contacto con un formato incorrecto.
- Se intenta buscar, actualizar o eliminar un contacto que no existe.

### Nivel 2 ⭐⭐: Gestión de Usuarios y Contactos Asociados

En este nivel, añadimos una entidad **Usuarios** a nuestra API, permitiendo que cada usuario gestione su propia lista de contactos.

### Funcionalidad:
- Cada usuario puede crear y gestionar varios contactos.
- Un contacto solo puede ser creado por un único usuario.

### Endpoints de la API:

- **POST /users** → Crear un usuario.
- **PATCH /users/{userId}** → Modificar el nombre de un usuario.
- **POST /contacts/{userId}** → Añadir un contacto a la lista de un usuario.
- **GET /contacts/{userId}** → Mostrar la lista de contactos de un usuario, ordenados alfabéticamente por nombre.
- **GET /contacts/{userId}/favorites** → Mostrar los contactos favoritos de un usuario.
- **GET /contacts/{userId}/deleted** → Mostrar los contactos eliminados de un usuario.

## Nivel 3 ⭐⭐⭐

Añadir pruebas (testing) para verificar el correcto funcionamiento de cada endpoint.


## 💻 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para la creación de APIs REST.
- **TypeScript**: Lenguaje de programación que añade tipado estático a JavaScript.
- **MySQL**: Base de datos relacional.
- **Prisma**: ORM para gestionar el acceso a la base de datos.
- **Nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.

## Requisitos

- Node.js
- Nodemon
- MySQL
- [Prisma](https://www.prisma.io/) para la gestión de base de datos
- Extensión REST Client para probar las APIs (opcional, pero recomendado para pruebas en VS Code)
- 

## 🛠️ Instalación
### 1. Clonar el repositorio

Clona el repositorio localmente usando el siguiente comando:


`git clone https://github.com/Txamet/4.1-Introduccion-a-express-REST-APIs.git`


### 2. Navegar a la carpeta del nivel deseado
Una vez clonado el repositorio, navega a la carpeta raíz del nivel que te interese ejecutar: por ejemplo para el nivel cero

`cd 4.1-Introduccion-a-express-REST-APIs\nivel-X`

Reemplaza NivelX por el nivel que desees: Nivel1 o Nivel2

### 3. Instalar dependencias

Instala todas las dependencias necesarias utilizando npm:

 `npm install`
### 4. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto.

Puedes copiar y pegar el contenido del archivo `env.example` y luego editarlo con los datos de tu base de datos `mySQL` y el puerto que prefieras usar.


### 5. Migrar el esquema a la base de datos MySQL
Aplica las migraciones a tu base de datos MySQL con Prisma:

`npx prisma migrate dev --name init`
## ▶️ Ejecución

#### Compila el proyecto de TypeScript a JavaScript:

`npx tsc`
### Iniciar el servidor
Usa Nodemon para iniciar el servidor en modo desarrollo:

`npm run nodemon`

O, para modo producción:

`npm run api`
Este comando sincroniza la base de datos con el esquema principal (prisma/schema.prisma) e inicia el servidor desde el archivo `dist/app.js`.

### Probar las solicitudes
Puedes usar la extensión `REST Client` en VS Code para probar los endpoints. 
Abre el archivo `requests.http` y haz clic en `Send Request`.
Si es necesario, edita el número de puerto para que coincida con el configurado en tu archivo `.env`

###  🧪  Testing
### Ejecutar pruebas
`npm run test`
Este comando reinicia la base de datos de pruebas y ejecuta los tests con Jest

Si necesitas reiniciar manualmente la base de datos de pruebas y sincronizar el esquema de la base de datos de test, puedes correr:

`npm run resetdb:test`

Esto forzará la reinicialización de la base de datos de pruebas usando el esquema `prisma/schema.test.prisma`


### Explicación:
- **`npm test`**: Este comando ejecuta las pruebas después de reiniciar la base de datos en el entorno de pruebas.
- **`npm run nodemon`**: Ejecuta el servidor con **Nodemon**, lo cual reinicia automáticamente el servidor cuando se detectan cambios.
- **`npm run resetdb:test`**: Reinicia manualmente la base de datos de pruebas.
- **`npm run api`**: Sincroniza la base de datos y ejecuta la API en modo producción.

## 🤝 Contribuciones

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza un commit con tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4. Envía un pull request para revisar tus cambios.