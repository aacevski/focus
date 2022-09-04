import * as bcrypt from "bcryptjs";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Todo } from "./todo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  firstName: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({
    nullable: true,
  })
  profilePicture: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.owner)
  todos: Todo[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  hashPassword(unecryptedPassword: string): void {
    this.password = bcrypt.hashSync(unecryptedPassword, 8);
  }

  isPasswordCorrect(unecryptedPassword: string): boolean {
    return bcrypt.compareSync(unecryptedPassword, this.password);
  }
}
