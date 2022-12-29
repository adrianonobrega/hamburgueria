import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { Order } from "../entities/order.entity";

export class CreateOrderDto extends Order {

    @ApiProperty({example: 'Pedido do Adriano',})
    @IsString()
    name: string;

    @ApiProperty({example: 1,})
    @IsInt()
    table: number;
}
