import { User } from "src/users/user.entity";
import { Country } from "../entities/country.entity";

export interface AddressFilter {
    country: Country | null;
    city: string | null;
    zipcode: string | null;
    addressLine1: string | null;
    addressLine2: string | null;
    phone: string | null;
    user: User | null;
}

export interface CountryFilter {

}

export interface StateFilter {

}