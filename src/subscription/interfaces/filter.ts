import { ApiProperty } from "@nestjs/swagger";


export class SubscriptionFilter {
    @ApiProperty()
    take?: number;

    @ApiProperty()
    skip?: number;
}