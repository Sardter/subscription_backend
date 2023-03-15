import { Prisma } from "@prisma/client";

export interface AddressFilter {
    select?: Prisma.AddressSelect;
    include?: Prisma.AddressInclude;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.Enumerable<Prisma.AddressOrderByWithRelationInput>;
    cursor?: Prisma.AddressWhereUniqueInput;
    take?: number;
    skip?: number;
}

export interface CountryFilter {
    select?: Prisma.CountrySelect;
    include?: Prisma.CountryInclude;
    where?: Prisma.CountryWhereInput;
    orderBy?: Prisma.Enumerable<Prisma.CountryOrderByWithRelationInput>;
    cursor?: Prisma.CountryWhereUniqueInput;
    take?: number;
    skip?: number;
}

export interface StateFilter {
    select?: Prisma.StateSelect;
    include?: Prisma.StateInclude;
    where?: Prisma.StateWhereInput;
    orderBy?: Prisma.Enumerable<Prisma.StateOrderByWithRelationInput>;
    cursor?: Prisma.StateWhereUniqueInput;
    take?: number;
    skip?: number;
}