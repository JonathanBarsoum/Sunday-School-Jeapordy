import { Body, Controller, Post, Res, Req, Get, UnauthorizedException } from '@nestjs/common';
import type { Response, Request } from 'express';
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
  async signin(@Body() data: SigninDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.signin(data);

    response.cookie('access_token', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return result.user;
  }

  @Get('me')
  async me(@Req() request: Request) {
    const token = request.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException('Not signed in');
    }

    return this.authService.me(token);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');

    return {
      message: 'Logged out',
    };
  }

}
