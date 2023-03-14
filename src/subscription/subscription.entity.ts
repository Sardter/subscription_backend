import { Order } from 'src/orders/order.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => User)
  @JoinTable()
  users: User;

  @OneToMany(type => Order, order => order.subscription)
  orders: Order[];

  @Column({type: 'time with time zone', nullable: true})
  nextOrderDate: Date; 
}