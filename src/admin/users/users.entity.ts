import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  Generated,
} from 'typeorm';
import { Role } from 'src/decorators';
@Entity({ name: 'admin-user' })
export default class UsersEntity {
  @PrimaryColumn({ type: 'varchar', length: 50, unique: true })
  @Generated('uuid')
  uid: string;

  @Column({ type: 'varchar', length: 254, nullable: false, unique: true })
  username: string;

  @Column({
    type: 'set',
    enum: Role,
    default: [Role.Visitor],
  })
  roles: Role[];

  @CreateDateColumn()
  createTime: string;
}
