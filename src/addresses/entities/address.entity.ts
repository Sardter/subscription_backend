import { Order } from 'src/orders/order.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Country } from './country.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Country, country => country.addresses)
  country: Country;

  @Column()
  city: string

  @Column()
  zipcode: string

  @Column()
  addressLine1: string

  @Column({nullable: true})
  addressLine2: string

  @Column()
  phone: string

  @ManyToOne(type => User, user => user.addresses)
  user: User

  @OneToMany(type => Order, order => order.address)
  orders: Order[]
}
