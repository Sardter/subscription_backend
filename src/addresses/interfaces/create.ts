import { Prisma } from "@prisma/client";

export interface AddressCreateData {
    data: Prisma.AddressCreateInput
}

export interface CountryCreateData {
    data: Prisma.CountryCreateInput
}

export interface StateCreateData {
    data: Prisma.StateCreateInput
}