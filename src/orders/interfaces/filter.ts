import { ApiProperty } from "@nestjs/swagger";

export class OrderFilter {
    @ApiProperty()
    orderById?: "asc" | "desc";

    @ApiProperty()
    orderByDate?: "asc" | "desc";

    @ApiProperty()
    take?: number;

    @ApiProperty()
    skip?: number;
}