import { Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    readonly userServise: UserService,
    private roleService: RolesService,
  ) {}

  async login(): Promise<void> {}

  async registration(): Promise<void> {}
}
