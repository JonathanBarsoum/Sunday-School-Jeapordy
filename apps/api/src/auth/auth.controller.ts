import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  signin(@Body() data: SigninDto) {
    return this.authService.signin(data);
  }
}
