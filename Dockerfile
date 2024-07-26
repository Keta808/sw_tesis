# Imagen base oficial para node 20.15.1
FROM node:20.15.1


# Establece el directorio de trabajo para el backend
WORKDIR /app/backend

# Copia los archivos package del backend e instala las dependencias
COPY backend/package*.json ./
RUN npm install

# Copia el código fuente del backend
COPY backend ./

# Expone el puerto 3000 para el backend y el 5173 para el frontend
EXPOSE 3000

# Comando para ejecutar el backend y el frontend
CMD ["sh", "-c", " cd /app/backend && npm start"]