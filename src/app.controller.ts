import { Body, Controller, Get, Post, Redirect, Render } from "@nestjs/common";
import { UserService } from './modules/user/services/user.service';
import { CreateUserDto } from './modules/user/dto/create-user.dto';
import { UserEntity } from "./modules/user/entities/user.entity";

@Controller()
export class AppController {
  public constructor(private readonly userService: UserService) {}

  @Get()
  @Render('index')
  public async index() {
    return {
      users: await this.userService.findAll(),
    };
  }

  @Get('signup')
  @Render('signup')
  public signup() {
    return {
      method: true,
    };
  }

  @Post('signup')
  @Redirect('/')
  public async postSignup(@Body() createUserDto: CreateUserDto) {
    const user = (await this.userService.create(createUserDto)) as any;

    if (user.error && user.statusCode == 400) {
      return {
        message: user.message,
      };
    }
  }
}
