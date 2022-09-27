import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserBodyDto } from 'src/dtos/user.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserBodyDto) {
    return this.authService.login();
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserBodyDto) {
    return this.authService.registration();
  }
}
