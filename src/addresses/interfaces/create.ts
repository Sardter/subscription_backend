import { User } from "src/users/user.entity";
import { Country } from "../entities/country.entity";

export interface AddressCreateData {
    country: Country;
    city: string;
    zipcode: string;
    addressLine1: string;
    addressLine2: string;
    phone: string;
    user: User;
}

export interface CountryCreateData {

}

export interface StateCreateData {

}