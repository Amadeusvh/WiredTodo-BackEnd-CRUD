import { Todo } from "../entities/Todo";
import { Request, Response } from "express";
import { getConnection } from "typeorm";

//função usada para a atualização de tarefas
const updateTodo = async (req: Request, res: Response) => {
  //aqui recebemos 3 parametros:
  //id da tarefa para ser mudada
  //descrição nova
  //status da tarefa
  const {
    id,
    description,
    status,
  } = req.body;
  //é checado se a descrição nova é vazia 
  if(description.replace(/\s+/g, '') !== '') {
    await getConnection()
      .createQueryBuilder()
      .update(Todo)
      //nota, na pratica, o status da tarefa é mudada no front, logo
      //se o usuário não mudar o status da tarefa, aqui só vai ocorrer
      //a sobreposição do mesmo valor booleano
      .set({description, status})
      .where("id = :id", { id })
      .execute();
  
      //resposta para o request
    return res.json(Todo);
    
  } else {
    return console.log("Error, description cannot be empty");
  }
}


export default updateTodo;