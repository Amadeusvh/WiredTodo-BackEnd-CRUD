import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm"
//criação da model/migration para o banco de dados
@Entity('todos')
export class Todo extends BaseEntity {
  //id para a tarefa, utilizando UUID
  @PrimaryGeneratedColumn("uuid")
  id: string;
  //descrição/nome da tarefa, 
  @Column()
  description: string;
  //Status se refere ao estado da tarefa
  //sendo false = incompleta, true = completa
  //por padrão o status sera false.
  @Column({
    default: false
  })
  status: boolean;

}
