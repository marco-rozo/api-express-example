import express from 'express';

import routes from './routes';

const app = express();

app.use(express.json());
// Adicionando rotas
app.use(routes);

// Iniciando o servidor
app.listen(3000, () => console.log('Server started at http://localhost:3000'));
