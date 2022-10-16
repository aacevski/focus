import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Note } from "./note.entity";
import { Todo } from "./todo.entity";
import { User } from "./user.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Todo, (todo) => todo.group)
  todos: Todo[];

  @OneToMany(() => Note, (note) => note.group)
  notes: Note[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.groups)
  owner: User;
}
