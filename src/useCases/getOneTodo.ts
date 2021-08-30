import { Todo } from "../entities/Todo";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

//função usada para pesquisar somente uma unica terafa
const getOneTodo = async (req: Request, res: Response) => {
  //é enviado o id da tarefa para a pesquisa
  const {
    id,
  } = req.params

  //usando QueryBuilder para fazer a pesquisa
  const todo = await getRepository(Todo)
    .createQueryBuilder("todos")
    .where('id = id', {id: id})
    .getOne();

  //resposdendo com a pesquisa feita
  return res.json(todo);
}

export default getOneTodo;
