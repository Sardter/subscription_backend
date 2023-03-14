import { Address } from 'src/addresses/entities/address.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.orders)
  user: User;

  @ManyToOne(type => Address, address => address.orders)
  address: Address;

  @Column({type: 'time with time zone'})
  date: Date; 
}