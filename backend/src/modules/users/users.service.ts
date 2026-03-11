import { Injectable, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/database/entities/user.entity";
import { users } from "src/database/seed/sample-data";

@Injectable()
export class UsersService {
  findAll() {
    return users;
  }

  findOne(id: string): UserEntity {
    const user = users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  update(id: string, payload: Partial<UserEntity>): UserEntity {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException(`User ${id} not found`);
    users[index] = { ...users[index], ...payload, id };
    return users[index];
  }
}
