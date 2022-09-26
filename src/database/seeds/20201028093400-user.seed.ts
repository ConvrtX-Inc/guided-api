import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/users/user.entity';
import { plainToClass } from 'class-transformer';
import { UserType } from '../../user-type/user-type.entity';
import { UserTypeName } from '../../user-type/enums/user-type-name.enum';
import { DEFAULT_ADMIN_USER } from '../constants/users.constant';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countUser = await connection
      .createQueryBuilder()
      .select()
      .from(User, 'User')
      .where('"User"."email" = :email', { email: DEFAULT_ADMIN_USER.email })
      .getCount();

    if (countUser === 0) {
      const adminUserTypeRaw: { id: string } = await connection
        .createQueryBuilder()
        .select()
        .from(UserType, 'UserType')
        .where('"UserType"."name" = :name', { name: UserTypeName.Admin })
        .getRawOne();

      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          plainToClass(User, {
            ...DEFAULT_ADMIN_USER,
            user_type_id: adminUserTypeRaw?.id,
          }),
        ])
        .execute();
    }
  }
}
