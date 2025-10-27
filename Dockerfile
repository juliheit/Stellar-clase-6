
FROM node:22-alpine

# Instalar Python, herramientas de compilación y headers de Linux
RUN apk add --no-cache python3 make g++ linux-headers eudev-dev

WORKDIR /app

# Copiar package.json y package-lock.json primero para caché
COPY package*.json ./

# Instalar dependencias (linkea workspaces)
RUN npm install

# Copiar el resto del proyecto (incluye packages/token_bdb generado)
COPY . .

EXPOSE 5173

# Arrancar sólo Vite dentro del container
CMD ["npm", "run", "start:docker"]

