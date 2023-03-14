import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { State } from "./state.entity";


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