# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a .env

3. Reemplazar las variables de entorno

4. Vas a ejecutas un npm install

5. ejecutar el comando npm run dev

6. Ejecutar los comandos de prisma:

## Nota: Usuario por defecto

**usuario**: test1@google.com
** password**: 1234567

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate

```

7. Vas a ejecutar el seed para crear la base de datos local: http://localhost:3000/api/seed
