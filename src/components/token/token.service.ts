import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateuserTokenDto } from 'src/dtos/token.dto';
import { Token, TokenDocument } from 'src/schemas/token.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private tokenModel: Model<TokenDocument>,
  ) {}

  public async createToken(dto: CreateuserTokenDto): Promise<Token> {
    const newToken = await this.tokenModel.create(dto);

    return newToken;
  }

  public async deleteToken(email: string): Promise<void> {
    return this.tokenModel.remove({ email });
  }

  public async checkToken(token: string): Promise<Token> {
    const existingToken = await this.tokenModel.findOne({ token });
    return existingToken;
  }
}
