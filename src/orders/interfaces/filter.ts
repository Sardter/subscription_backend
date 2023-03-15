import { Prisma } from "@prisma/client";

export interface OrderFilter {
    select?: Prisma.OrderSelect;
    include?: Prisma.OrderInclude;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.Enumerable<Prisma.OrderOrderByWithRelationInput>;
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
}