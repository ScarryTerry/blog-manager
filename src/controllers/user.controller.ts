import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userServise: UserService) {}
}