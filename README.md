# TCIT-challenge

# Posts App

Aplicación web para gestionar posts, desarrollada como prueba técnica.

La aplicación permite:

* Crear posts.
* Listar posts.
* Eliminar posts.
* Filtrar posts localmente por nombre.
* Persistir los posts en PostgreSQL.

## Tecnologías

### Frontend

* React
* Redux Toolkit
* Vite
* JavaScript

### Backend

* Node.js
* Express
* PostgreSQL
* `pg`

## Arquitectura

El proyecto está dividido en frontend y backend:

```text
posts-app/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── PostForm.jsx
│       │   ├── PostFilter.jsx
│       │   ├── PostItem.jsx
│       │   └── PostList.jsx
│       ├── services/
│       │   └── postsApi.js
│       ├── store/
│       │   ├── postsSlice.js
│       │   └── store.js
│       ├── App.jsx
│       └── main.jsx
│
└── backend/
    └── src/
        ├── controllers/
        │   └── postsController.js
        ├── routes/
        │   └── postsRoutes.js
        ├── services/
        │   └── postsService.js
        ├── db/
        │   └── database.js
        └── app.js
```

## Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm
* PostgreSQL

## Configuración de PostgreSQL

Crear una base de datos llamada `tcit_challenge`.

Desde `psql`:

```sql
CREATE DATABASE tcit_challenge;
```

Luego conectarse a la base de datos:

```sql
\c tcit_challenge
```

Crear la tabla:

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
```

## Configuración del backend

Entrar a la carpeta:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/posts_db
```

Reemplazar `YOUR_PASSWORD` por la contraseña del usuario de PostgreSQL.

Iniciar el backend:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

### API

Obtener todos los posts:

```http
GET /api/posts
```

Crear un post:

```http
POST /api/posts
Content-Type: application/json

{
    "name": "Mi post",
    "description": "Descripción de mi post"
}
```

Eliminar un post:

```http
DELETE /api/posts/:id
```

## Configuración del frontend

En otra terminal, entrar a:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Luego abrir la URL indicada por Vite, normalmente:

```text
http://localhost:5173
```

## Manejo del estado

Redux Toolkit se utiliza para mantener el estado de los posts.

El flujo principal es:

```text
API
 ↓
Redux
 ↓
React Components
```

Como fue solicitado, la aplicación realiza una única petición `GET /api/posts` al cargar la vista.

Las operaciones de creación y eliminación actualizan directamente el estado de Redux utilizando la respuesta entregada por el backend, evitando realizar nuevamente la petición de listado.

## Filtrado

El filtrado por nombre se realiza localmente en el frontend sobre los posts almacenados en Redux.

Por lo tanto, escribir en el buscador no genera nuevas peticiones al backend.

## Validaciones

El backend valida que:

* `name` no esté vacío.
* `description` no esté vacío.

Los valores son limpiados mediante `trim()` antes de ser almacenados.

## Decisiones de implementación

Se separó la aplicación en diferentes capas para mantener responsabilidades claras:

* **Components:** interfaz y eventos del usuario.
* **Redux:** estado global de los posts.
* **Services:** comunicación con la API.
* **Controllers:** manejo de las solicitudes HTTP.
* **Services (backend):** lógica de acceso a datos.
* **Database:** conexión con PostgreSQL.
