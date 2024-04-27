import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreatedUserDto } from '../dto/created-user.dto';
import { genSalt, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    if (
      await this.userRepository.exists({
        where: { email: createUserDto.email },
      })
    ) {
      throw new ConflictException('Account already exists');
    }

    const { passwordHash, salt } = await this.hashPassword(
      createUserDto.password,
    );

    const createdUser = await this.userRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash,
      salt,
      isActive: createUserDto.isActive ? createUserDto.isActive : false,
    });

    return CreatedUserDto.from(createdUser);
  }

  private async hashPassword(plaintextPassword: string) {
    const saltRounds = Math.round(Math.random() * 10);
    const salt = await genSalt(saltRounds);
    const pepper = this.configService.getOrThrow<string>('bcrypt_password');
    const passwordHash = await hash(plaintextPassword + pepper, salt);

    return { passwordHash, salt };
  }

  public async findAll() {
    return await this.userRepository.find();
  }

  public async findOne(id: number) {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (!userEntity) {
      throw new NotFoundException(`no user found with id ${id}`);
    }

    return userEntity;
  }

  public async update(
    id: number,
    { password, ...updateUserDto }: UpdateUserDto,
  ) {
    if (password) {
      updateUserDto = Object.assign(
        updateUserDto,
        await this.hashPassword(password),
      );
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  public async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  public async findOneByEmail(email: string) {
    const userEntity = await this.userRepository.findOneBy({ email });

    if (!userEntity) {
      throw new NotFoundException(`no user found with mail ${email}`);
    }

    return userEntity;
  }

  public async findOneGallery(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['gallery'],
      select: {
        gallery: {
          photoPath: true,
        },
      },
    });
  }
}
