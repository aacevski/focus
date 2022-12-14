import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  due_date: Date;

  @ManyToOne(() => User, (user) => user.todos)
  owner: User;

  @ManyToOne(() => Group, (group) => group.todos)
  group: Group;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
