// Importar las dependencias necesarias
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Configurar las variables de entorno definidas en el archivo .env
dotenv.config();

// Crear una instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'mysql',                 // Tipo de base de datos que se utilizará (MySQL en este caso)
  host: process.env.DB_HOST,        // Obtener la dirección del host desde las variables de entorno
  database: process.env.DB_NAME,    // Obtener el nombre de la base de datos desde las variables de entorno
  username: process.env.DB_USER,    // Obtener el nombre de usuario de la base de datos desde las variables de entorno
  password: process.env.DB_PASSWORD,// Obtener la contraseña de la base de datos desde las variables de entorno
});

// Sincronizar automáticamente las definiciones de modelo con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Tablas sincronizadas con la base de datos');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

// Exportar la instancia de Sequelize configurada para su uso en otras partes de la aplicación
export default sequelize;
