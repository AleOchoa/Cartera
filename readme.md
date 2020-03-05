# Cartera

Es una aplicación para administrar la cartera de una financiera (contratos de créditos). Por el momento únicamente se pueden administrar usuarios, administrar clientes y crear contratos. En los contratos se genera una tabla de amortización de un crédito simple con los parámetros capturados.

Es un proyecto en desarrollo que te permitirá administrar los pagos de los clientes a los diferentes contratos, mandar recordatorios de las fechas próximas de pago a los clientes, aplicar prepagos hechos por los clientes, aministrar contratos quebrantados, entre otras cosas. Pero por el momento todavía no puedes realizar todas estas funcionalidades :( .

Puedes acceder a la plataforma dando click en [Cartera](https://carteraemisha.netlify.com/) .

## Instrucciones

Es una plataforma para uso interno por lo que no hay una página en la que te puedas registrar. Pero no te preocupes aquí te compartimos unos perfiles con los que podrás hacer pruebas:

Email: alejandra.ochoa@emisha.com.mx
Contraseña: E8DU0cHPgr
Rol: Admin

Email: alejandra_of1@hotmail.com
Password: pmaLooOSKT
Rol: Mesa

Por el momento solo hay dos roles: Admin y Mesa. Ambos pueden crear y editar clientes, crear y editar contratos y ver detalle de contratos. El Admin es el único que puede crear, editar y/o bloquear usuarios. Al crear usuarios nuevos se les envía un correo electrónico con la contraseña que se genera de manera aleatoria por lo que se deben ingresar correos válidos. Si hay alguna falla con el sistema de envío de correos se les asigna a los usuarios la contraseña "Em1$ha, por lo que si no recibes el correo y si lo ingresaste adecuadamente puedes intentar usar esta contraseña.

Tanto en la vista de contratos, como en la de clientes y en la de usuarios se tiene un botón en la parte superior para crear nuevos registros que al dar click te muestra los campos a llenar para llevar acabo el registro. Una vez llenados los formularios se debe dar clic para que se registre la información, este proceso tarda un poco pero en cuanto se genere se va a mostrar en el detalle.

En las tre vistas anteriores también se tiene un botón para editar que muestra el formulación con la información del registro que seleccionaste para que la edites. También se tiene un botón para borrar, pero debes tener cuidado de no borrar información por accidente.

En la vista de contrato puedes acceder al detalle del contrrato en donde se mostrará toda la información del contrato incluyendo su tabla de amortización. Si llegas a editar algún parámetro del contrato distinto a su estatus se actualiza dicha tabla de amortización, así como su mensualidad.

## Instalación 

Se usó el paquete de npm ironhack-generator-full como estructura inicial y se instalarón algunas otras dependencias. 

#### Backend
body-parser: 1.18.3,
cookie-parser: 1.4.3,
cors: 2.8.5,
dotenv: 6.0.0,
express: 4.16.3,
express-session: 1.16.2,
fs: 0.0.1-security,
hbs: 4.0.1,
mongoose: 5.9.2,
morgan: 1.9.0,
node-sass-middleware: 0.11.0,
nodemailer: 6.4.3,
passport: 0.4.0,
passport-local-mongoose: 5.0.1,
path: 0.12.7,
react-scripts: 3.4.0,
serve-favicon: 2.5."

### Frontend

@chakra-ui/core: 0.6.1,
@emotion/core: 10.0.27,
@emotion/styled: 10.0.27,
axios: 0.19.0,
emotion-theming: 10.0.27,
react: 16.10.0,
react-dom: 16.10.0,
react-icons: 3.9.0,
react-router-dom: 5.1.1,
react-scripts: 3.4.0