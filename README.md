# RUTAS

## HOME 

- `/ (GET)`  | plantilla de inicio con datos de las sesión.

## PRODUCTOS

- `/api/products (GET)`| devuelve todos los productos
- `/api/products/:id (GET)`| devuelve un producto según su id
- `/api/products (POST)` | recibe y agrega un producto, y lo devuelve con su id asignado. (body: {title, brand, price, stock, thumbnail})
- `/api/products/:id (PUT)` | recibe y actualiza un producto según su id.
- `/api/products/:id (DELETE)` | elimina un producto según su id.

## CARRITOS

- `/api/cart (GET)` | Crea un carrito y devuelve su id.
- `/api/cart/:userID (POST)`| Si el usuario no tiene un ID de carrito asignado, se crea uno y se le asigna.
- `/api/cart/:id/user/:userID (DELETE)` | Vacía un carrito, lo elimina y le borra el cartID asignado al usuario para que se le cree uno nuevo.
- `/api/cart/:idCart/products (GET)` | Me permite listar todos los productos que tiene el carrito con dicho id.
- `/api/cart/:idCart/products/:idProd (POST)` | Para incorporar productos al carrito.
- `/api/cart/:idCart/products/:idProd (DELETE)` | Eliminar un producto del carrito por su id de carrito y de producto.

## ORDERS

- `/orders/:idCart/neworder/:idUser (POST)`| Crea una nueva orden de compra y notifica al admin y al user.
- `/orders/:idUser (GET)`| Trae el historial de ordenes del usuario.

## SESION

- `/session/login (GET)`| Renderiza el formulario de inicio de sesión.
- `/session/login (POST)`| Envia el formulario de login y verifica autenticación.
- `/session/register (GET)`| Renderiza el formulario de registro.
- `/session/register (POST)`| Envia el formulario de registro y autentica.
- `/session/faillogin (GET)`| Renderiza una vista al fallar el inicio de sesión.
- `/session/failregister (GET)`| Renderiza una vista al fallar el registro.
- `/session/logout (GET)`| Destruye la sesión y desconecta la base de datos.

## MENSAJES

- `/chat (GET)` | Redirige a la vista del chat general, en donde entra la lógica de WebSocket.
- `/chat/:email (GET)` | Lista los mensajes coincidentes a un email en especifico.

## INFO

- `/info` | Nos permite ver la configuración del servidor.


# SERVIDOR:
## CLUSTER O FORK:
- `node server.js -m` | Se ejecuta, dependiendo del valor del argumento "-m" (CLUSTER O FORK), en modo CLUSTER o FORK:
- `node server.js -m cluster` | modo cluster con los máximos procesos posibles.
- `node server.js -m fork` | modo fork.
- `node server.js` | Se ejecuta el servidor en modo FORK por default.
- `kill (PID)` | EN MODO CLUSTER (Si se mata una terminal se levanta una nueva).

## FOREVER:
(fork)
- `forever start server.js`.
- `forever list` | listo todos los procesos.
- `forever stopall` | detendo todos los procesos.

## PM2:
- `pm2 start --watch server.js` | Ejecuto en modo fork.
- `pm2 start server.js --watch -i max` | ejecuto en modo cluster con con los máximos procesos posibles.
- `pm2 list` | listo los procesos.
- `pm2 stop 1` | detengo el proceso con id "1".
- `pm2 delete 1` | elimino el proceso con id "1".
- `pm2 delete all o server` | elimino todos los procesos.

## DEPENDENCIAS:

- `bcrypt`: "^5.1.0". 
- `compression`: "^1.7.4". 
- `connect-mongo`: "^5.0.0". 
- `cookie-parser`: "^1.4.6". 
- `dotenv`: "^16.0.3". 
- `express`: "^4.18.2". 
- `express-handlebars`: "^6.0.6". 
- `express-session`: "^1.17.3". 
- `jsonwebtoken`: "^9.0.0". 
- `minimist`: "^1.2.8". 
- `mongodb`: "^5.5.0". 
- `mongoose`: "^7.2.1". 
- `multer`: "^1.4.5-lts.1". 
- `nodemailer`: "^6.9.2". 
- `passport`: "^0.6.0". 
- `passport-local`: "^1.0.0". 
- `socket.io`: "^4.6.2". 
- `twilio`: "^4.11.1". 
- `winston`: "^3.8.2". 

## NOTAS: 

- `express-handlebars` utiliza la versión 6.0.6 para el optimo funcionamiento de la aplicación.
