import { Address } from 'src/addresses/address.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => Address, address => address.user)
  addresses: Address[]

  @OneToMany(type => Subscription, subscription => subscription.user)
  subscriptions: Subscription[]
}