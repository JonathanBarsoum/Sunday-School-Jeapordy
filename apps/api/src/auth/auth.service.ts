import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(data: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    } 
 
    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  
  async signin(data: SigninDto) {
      const user = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user || !user.passwordHash) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const passwordMatches = await bcrypt.compare(
        data.password,
        user.passwordHash,
      );

      if (!passwordMatches) {
        throw new UnauthorizedException('Invalid email or password');
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
  }
}
