import { type } from 'os';
import { Order } from 'src/orders/order.entity';
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, OneToMany } from 'typeorm';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Country, country => country.states)
  country: Country
}

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => State, state => state.country)
  states: State[];

  @OneToMany(type => Address, address => address.country)
  addresses: Address[];
}

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
