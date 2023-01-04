import { Controller, UseGuards, Request, Post, Body} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUser } from './dto/login.dto';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';

@ApiTags('Login')
@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
    ){ }
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any, @Body() data: LoginUser){
        return this.authService.login(req.user,data)
    }
}
