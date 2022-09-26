import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';

@Injectable()
export class TokenService {

  constructor(
    private readonly jwtService: JwtService,
  ) {
  }

  public async generateToken(user: User): Promise<any> {
    const token = await this.jwtService.signAsync({
      id: user.id,
    });
    return { token, user: user };
  }
}
