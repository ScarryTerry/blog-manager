import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, mongo } from 'mongoose';
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

  public async getRoleByValue(value: string): Promise<mongoose.Types.ObjectId> {
    const role = await this.rolesModel.findOne({ role: value });
    return role['_id'];
  }

  public async addUserToRole(
    roleId: mongoose.Types.ObjectId,
    userId: any,
  ): Promise<any> {
    const role = await this.rolesModel.findOne({ _id: roleId });
    role['usersWithRole'].push(userId);
    return this.rolesModel.updateOne(
      { _id: roleId },
      { usersWithRole: role['usersWithRole'] },
    );
  }
}
