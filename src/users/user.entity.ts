import { type } from 'os';
import { Address } from 'src/addresses/entities/address.entity';
import { Order } from 'src/orders/order.entity';
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

  @Column({ default: false })
  isStaff: boolean;

  @OneToMany(type => Address, address => address.user)
  addresses: Address[];

  @Column({nullable: true})
  selectedAddress: number;

  @OneToMany(type => Order, order => order.user)
  orders: Order[];
}