import { Todo } from "../entities/Todo";
import { Router, Request, Response } from "express";

//função para a crianção de uma nova tarefa
const createTodo = async (req: Request, res: Response) => {
  //recebendo do front a descrição que devera ser usada na nova tarefa
  const {
    description,
  } = req.body;

  //usando REGEX para evitar que o usuário mande uma string vazia ou com
  //espaços antes do começo da descrição, caso exista espaço antes da descrição,
  //estes serão apagados
  const sanitizedDescription = description.replace(/^\s+/g, '');

  //condicional para ver se a string é vazia
  if (sanitizedDescription === "" )
    return res.status(400).send(
      {
        message: "Todo Description cannot be empty"
      }
    );
  
  //criação da tarefa usando a "limpeza" do REGEX
  const todo = Todo.create({
    description: sanitizedDescription,
  });
  
  //salvando no banco de dados e enviando uma resposta
  await todo.save();
  return res.json(todo);
}

export default createTodo;