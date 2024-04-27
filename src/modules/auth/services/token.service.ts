import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '../entities/tokenEntity';
import { Repository } from 'typeorm';
import { CreateTokenDto } from '../dto/create-token.dto';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class TokenService {
  public constructor(
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  public async findOneByTokenAndSource(
    refreshTokenHash: string,
    userEntity: UserEntity,
    source: string,
  ) {
    const tokenEntity = await this.tokenRepository.findOneBy({
      refreshTokenHash,
      user: userEntity,
      source,
    });

    if (!tokenEntity) {
      throw new NotFoundException();
    }

    return tokenEntity;
  }

  public async create(createAdminToken: CreateTokenDto) {
    return await this.tokenRepository.save(createAdminToken);
  }
}
