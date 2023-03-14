import { Address } from "src/addresses/entities/address.entity";
import { User } from "src/users/user.entity";

export interface OrderCreateData {
    date: Date;
    user: User;
    address: Address;
}