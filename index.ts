import Express from 'express';
import { createConnection } from 'typeorm';
import TodoRouter from './src/router/TodoRouter';
import { Todo } from './src/entities/Todo';
import cors from 'cors';
//definição do app express
const app = Express();
//configuração padrão do backend, se for necessário mudar alguma opções dentro do "CreateConnection"
//tenha em mente que esta api foi feita utilizando Postgresql
const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "todo",
      //declaração da migration
      entities: [Todo],
      synchronize: true
    })

    console.log('Connected to Postgres')
    //middleware do CORS para evitar erro de requizição
    app.use(cors());
    //definição do uso de JSON
    app.use(Express.json());
    //Definindo para o app as rotas
    app.use(TodoRouter);

    //definição da porta padrão do backend
    app.listen(3030, () => {
      console.log("Listen on port 3030");
    });

  } catch (error) {
    console.error(error)
    throw new Error("Unable to connect to Postgres")
    
  }
}

main();
