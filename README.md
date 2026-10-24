# Money Way Empire

Proyecto final del Bootcamp Full Stack Web de KeepCoding.

## Descripcion
Plataforma web para la industria musical con servicios creativos, portfolio, musica, eventos y tienda de merchandising.

## Tecnologias
- Frontend: Next.js 16, React 19, TypeScript y Tailwind CSS.
- Backend: Node.js, Express y TypeScript.
- Base de datos: PostgreSQL y Prisma ORM.
- Autenticacion: JWT y bcrypt.
- Pagos: Stripe Checkout en modo de pruebas.
- Despliegue: Vercel y Render.

## Funcionalidades
- Paginas de servicios, proyectos, musica y eventos.
- Registro e inicio de sesion.
- Roles de usuario y administrador.
- Gestion de productos mediante CRUD.
- Productos con tallas, colores y fabricacion bajo demanda.
- Carrito de compra e historial de pedidos.
- Integracion de pagos de prueba con Stripe.
- Panel de administracion de productos, pedidos, inventario y usuarios.

## Estructura
- frontend/: aplicacion Next.js.
- backend/: API REST Express.
- backend/prisma/: esquema y migraciones.

## Instalacion local
Se requiere Node.js, npm y PostgreSQL.

Backend (desde backend/):
1. npm install
2. npx prisma generate
3. npx prisma migrate deploy
4. npm run dev

Frontend (desde frontend/):
1. npm install
2. npm run dev

## Variables de entorno
Backend: DATABASE_URL, JWT_SECRET, FRONTEND_URL y STRIPE_SECRET_KEY.
Para webhooks de Stripe: STRIPE_WEBHOOK_SECRET.
Frontend: NEXT_PUBLIC_API_URL.
No se incluyen claves privadas ni credenciales.

## Enlaces
- Web: https://money-way-empire.vercel.app
- API: https://money-way-empire-api.onrender.com

## Autor
Angel Eladio Velaz Sanchez
