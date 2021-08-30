import { Router, Request, Response } from "express";
import createTodo from '../useCases/createTodo';
import getTodo from '../useCases/getTodo';
import deleteTodo from '../useCases/deleteTodo';
import updateTodo from '../useCases/updateTodo';
import getOneTodo from '../useCases/getOneTodo';

//Rotas da API, todas as funções usadas se encontram
//dentro da pasta "UseCases"
const todoRouter = Router();

//rota para enviar a lista de tarefas para o front, contendo pesquisas
todoRouter.get('/todos', getTodo);
//rota para a pesquisa para somente uma tarefa, utilizando id
todoRouter.get('/todo/:id', getOneTodo);
//rota para a criação de novas tarefas
todoRouter.post('/todo', createTodo);
//rota para a atualização de uma determinada tarefa
todoRouter.put('/todo', updateTodo);
//rota para a remoção de uma tarefa da lista
todoRouter.delete('/:id', deleteTodo)

export default todoRouter;
