import { Todo } from "../entities/Todo";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

//função para a pesquisa e entrega da lista
const getTodo = async (req: Request, res: Response) => {
  //recebendo os dois parametros para a pesquisa
  //search, uma string com o nome a ser pesquisado
  //searchStatus, uma string que contem o "valor booleano"
  //que condiz se o usuário quer ver ou não as tarefas completadas
  const {
    search,
    searchStatus
  } = req.query
  //const usada para a pesquisa do status no banco
  const statusComplete = true;

  console.log(req.query)

  //condicional vendo se o usuário quer ver as tarefas completadas
  if (!search && searchStatus ==='true'){
    //print para ver em qual modo de pesquisa a rota esta indo
    console.log('Entrei no search vazio')
    const todo = await getRepository(Todo)
      .createQueryBuilder("todos")
      .where('status', {statusComplete})
      //orderBy é usado em todas as operações de Query para
      //haver uma listagem melhor de acordo com o ID
      .orderBy('id', 'ASC')
      .getMany();

      return res.json(todo);
  }

  //condicional para mandar a lista sem nenhum filtro
  if (!search){
    console.log('Entrei no search vazio')
    const todo = await getRepository(Todo)
      .createQueryBuilder("todos")
      .orderBy('id', 'ASC')
      .getMany();

      return res.json(todo);
    //caso Search não for vazio, é testado para ver se o usuário quer ver 
    //a pesquisa com o filtro de tarefas completas
  } else {
    //sem filtro de tarefa completa
    if (searchStatus === 'false') {
      console.log('Entrei no search, todos os status')
      const todo = await getRepository(Todo)
        .createQueryBuilder()
        //ILIKE é usado para melhorar a pesquisa dentro do SQL
        .where('description ILIKE :search', {search: `%${search}%`})
        .orderBy('id', 'ASC')
        .getMany();
  
        return res.json(todo);
      //pesquisa usando o filtro de tarefa completa
    } else {
      console.log('Entrei no search, Status completo')
      const todo = await getRepository(Todo)
        .createQueryBuilder()
        .where('description ILIKE :search', {search: `%${search}%`})
        .andWhere('status', {statusComplete})
        .orderBy('id', 'ASC')
        .getMany();
  
        return res.json(todo);
    }
  }
}

export default getTodo;
