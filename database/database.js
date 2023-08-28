// Importar las dependencias necesarias
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Configurar las variables de entorno definidas en el archivo .env
dotenv.config();

// Crear una instancia de Sequelize para la conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'mysql',                 
  host: process.env.DB_HOST,       
  database: process.env.DB_NAME,    
  username: process.env.DB_USER,   
  password: process.env.DB_PASSWORD,
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
