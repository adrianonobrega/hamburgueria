import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './createOrder.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @ApiProperty({example: 'Aguardando pagamento',})
    status?:string

    @ApiProperty({example: 15,})
    total?: number
}
