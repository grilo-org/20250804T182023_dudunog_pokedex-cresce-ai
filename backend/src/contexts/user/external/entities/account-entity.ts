import { AccountModel } from "@contexts/user/domain/models/account-model.struct";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user-entity";

@Entity("accounts")
export class AccountEntity implements AccountModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  userId: string;

  @OneToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
