import { Order } from 'src/orders/order.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.subscriptions)
  user: User;

  @OneToMany(type => Order, order => order.subscription)
  orders: Order[];

  @Column({type: 'time with time zone'})
  nextOrderDate: Date; 
}