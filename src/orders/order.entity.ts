import { Address } from 'src/addresses/address.entity';
import { Subscription } from 'src/subscription/subscription.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Subscription, subscription => subscription.orders)
  subscription: Subscription;

  @ManyToOne(type => Address, address => address.orders)
  address: Address;

  @Column({type: 'time with time zone'})
  date: Date; 
}