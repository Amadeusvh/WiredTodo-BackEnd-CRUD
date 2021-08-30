import { Todo } from "../entities/Todo";
import { Request, Response } from "express";
import { getConnection } from "typeorm";

//função para a remoção de uma tarefa da lista
const deleteTodo = async (req: Request, res: Response) => {
  //um id é enviado para achar qual tarefa deva ser removida
  const {
    id,
  } = req.params;

  //usando QueryBuilder para fazer a remoção
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Todo)
    .where("id = :id", { id: id })
    .execute();

  //resposta para mostrar que foi efetivo o request
  return res.status(200).send(
    {
      message: "Todo Deleted"
    }     
  )
}

export default deleteTodo;