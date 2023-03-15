import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class AddressFilter {
    @ApiProperty()
    orderBy?: {
        id?: "asc" | "desc";
        countryId?: "asc" | "desc";
        stateId?: "asc" | "desc";
        city?: "asc" | "desc";
    };

    @ApiProperty()
    take?: number;

    @ApiProperty()
    skip?: number;
}

export class CountryFilter {
    @ApiProperty()
    orderBy?: {
        id?: "asc" | "desc";
        name?: "asc" | "desc";
    };

    @ApiProperty()
    take?: number;

    @ApiProperty()
    skip?: number;
}

export class StateFilter {
    @ApiProperty()
    orderBy?: {
        id?: "asc" | "desc";
        name?: "asc" | "desc";
    };

    @ApiProperty()
    take?: number;

    @ApiProperty()
    skip?: number;
}