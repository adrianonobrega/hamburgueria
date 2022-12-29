import { Body, Controller, Param, Put,Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/shared/jwt-auth.guard";
import { AddressService } from "./address.services";
import { UpdateAddressDto } from "./dto/update-address.dto";

@ApiTags('Users')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService,) { }

  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  async update(@Request() req, @Body() UpdateAdressDto: UpdateAddressDto) {
    return await this.addressService.update(req.user, UpdateAdressDto);
  }


}