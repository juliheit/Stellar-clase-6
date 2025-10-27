# Token BDB Frontend

Aplicación frontend para interactuar con tokens en la blockchain de Stellar.

## 📋 Requisitos

- Node.js 22 o superior
- Docker (para contenerización)
- npm

## 🚀 Instalación Local

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd token-bdb-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador: `http://localhost:5173`

## 🐳 Uso con Docker

### Construir la imagen

```bash
docker build -t token-bdb-frontend .
```

### Ejecutar el contenedor

```bash
docker run -p 5173:5173 token-bdb-frontend
```

### Acceder a la aplicación

Abrir en el navegador: `http://localhost:5173`

### Detener el contenedor

Presionar `Ctrl + C` en la terminal donde está corriendo.

## 📁 Estructura del Proyecto

```
token-bdb-frontend/
├── packages/
│   └── token_bdb/           # Paquete generado con Stellar CLI
├── src/                     # Código fuente del frontend
├── Dockerfile               # Configuración de Docker
├── .dockerignore           # Archivos excluidos de Docker
├── package.json            # Dependencias del proyecto
└── README.md               # Este archivo
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start:docker` - Inicia Vite con host habilitado (para Docker)

## ⚠️ Notas Importantes

- Al correr en Docker, puede aparecer el error "Error al obtener balance" al conectar la wallet. Esto es normal porque el contenedor no tiene acceso directo a servicios locales o externos que requiera la aplicación.
- La aplicación se visualiza correctamente en el navegador, pero la funcionalidad completa requiere configuración adicional de red.

## 🔧 Tecnologías

- Vite
- Node.js 22
- Docker
- Stellar SDK



