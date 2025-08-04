import { SessionModel } from "@contexts/user/domain/models/session-model.struct";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AccountEntity } from "./account-entity";

@Entity("sessions")
export class SessionEntity implements SessionModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  accountId: string;

  @OneToOne(() => AccountEntity, account => account.id)
  @JoinColumn({ name: "accountId" })
  account: AccountEntity;

  @Column()
  sessionToken: string;

  @Column()
  refreshToken: string;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
