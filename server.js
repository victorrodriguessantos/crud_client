import express from 'express';
import routes from './routes/routes.js';
import mysql from 'mysql2';

const app = express();
const port = 1500;

// Middleware para analisar o corpo das requisições JSON
app.use(express.json());

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadClient'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao MySQL!');
});

// Exportar a conexão (opcional, se você precisar usar essa conexão em outros módulos)
export { connection };

// Usar as rotas definidas em routes.js
app.use('/', routes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
