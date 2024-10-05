# 4.1-Introduccion a express-REST-APIs

Este proyecto es una introducción a la creación de REST APIs con Express y TypeScript.

La aplicación se conecta a una base de datos MySQL y ofrece funcionalidad básica de CRUD para gestionar contactos.

## Nivel 1 ⭐: Funcionalidades

Implementa las siguientes funcionalidades para la gestión de contactos:

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




## 💻 Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para la creación de APIs REST.
- **TypeScript**: Lenguaje de programación que añade tipado estático a JavaScript.
- **MySQL**: Base de datos relacional.
- **Prisma**: ORM para gestionar el acceso a la base de datos.
- **Nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo.
- **REST Client**: Para probar las APIs en VS Code (opcional, pero recomendado).

## Requisitos

- Node.js
- Nodemon
- MySQL
- [Prisma](https://www.prisma.io/) para la gestión de base de datos
- Extensión REST Client para probar las APIs (opcional, pero recomendado)
- 

## 🛠️ Instalación
### 1. Clonar el repositorio

Clona el repositorio localmente usando el siguiente comando:


`git clone https://github.com/Txamet/4.1-Introduccion-a-express-REST-APIs.git`


### 2. Seleccionar la carpeta raíz del proyecto
Una vez clonado el repositorio, navega a la carpeta raíz:

`cd 4.1-Introduccion-a-express-REST-APIs\Nivel2`

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

Compila el proyecto de TypeScript a JavaScript:

`npx tsc`
### 1. Cambiar a la carpeta dist
El código compilado estará en la carpeta dist. Cambia a esa carpeta:

`cd dist`
### 2. Inicializar el servidor
Inicia el servidor utilizando nodemon:

`nodemon app`
### 3. Probar las solicitudes (requests)
Para probar las diferentes solicitudes de la API, te recomendamos utilizar la extensión `REST Client` en tu editor de código (por ejemplo, VS Code).

Abre el archivo `requests.http` en el editor.
Si es necesario, edita el número de puerto para que coincida con el configurado en tu archivo `.env`

Haz clic en `Send Request` que aparece en la parte superior de cada una de las solicitudes para verificar su funcionalidad.

*Nota sobre la actualización de contactos

Al utilizar el endpoint de actualización de contactos, puede aparecer un error relacionado con el campo `phone_number`. Asegúrate de que este campo esté en formato numérico en lugar de cadena (`string`).

## 🤝 Contribuciones

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza un commit con tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
4. Envía un pull request para revisar tus cambios.
