import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from 'src/dtos/roles.dto';
import { Roles, RolesDocument } from 'src/schemas/roles.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name)
    private rolesModel: Model<RolesDocument>,
  ) {}

  public async createRole(dto: CreateRoleDto): Promise<Roles> {
    const role = await this.rolesModel.create(dto);
    return role;
  }

  public async getRoleByValue(value: string): Promise<string> {
    const role = await this.rolesModel.findOne({ role: value });
    return role['role'];
  }

  public async addUserToRole(roleName: string, userId: any): Promise<any> {
    const usersWithRoles = await this.rolesModel.findOne({ role: roleName });
    usersWithRoles['usersWithRole'].push(userId);
    return this.rolesModel.updateOne(
      { role: roleName },
      { usersWithRole: usersWithRoles['usersWithRole'] },
    );
  }
}
