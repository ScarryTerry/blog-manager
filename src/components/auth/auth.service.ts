import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

import { CreateuserTokenDto } from 'src/dtos/token.dto';
import { CreateUserBodyDto, LoginUserDto } from 'src/dtos/user.dto';
import { Token } from 'src/schemas/token.schema';
import { RolesService } from '../roles/roles.service';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userServise: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async login(dto: LoginUserDto): Promise<void> {
    const existingUser = await this.userServise.getUserByEmail(dto['email']);

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  public async registration(dto: CreateUserBodyDto): Promise<string> {
    const existingUser = await this.userServise.getUserByEmail(dto['email']);

    if (existingUser) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const newUser = await this.userServise.createUser(dto);
    const token = await this.createToken({
      email: newUser.email,
      roles: newUser.roles,
    });
    await this.saveToken({
      email: newUser.email,
      token,
      createdDate: new Date(),
    });

    return token;
  }

  private async createToken(data, options?: SignOptions): Promise<string> {
    return this.jwtService.sign({ ...data }, options);
  }

  private async saveToken(dto: CreateuserTokenDto): Promise<Token> {
    return this.tokenService.saveToken(dto);
  }
}
