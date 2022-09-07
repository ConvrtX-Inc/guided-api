import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from 'src/users/user.entity';
import { plainToClass } from 'class-transformer';
import { UserType } from '../../user-type/user-type.entity';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countUser = await connection
      .createQueryBuilder()
      .select()
      .from(User, 'User')
      .where('"User"."email" = :email', { email: 'john.doe@example.com' })
      .getCount();

    if (countUser === 0) {
      const adminUserTypeRaw: {id: string} = await connection
          .createQueryBuilder()
          .select()
          .from(UserType, 'UserType')
          .where('"UserType"."name" = :name', { name: 'Admin' })
          .getRawOne();

      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          plainToClass(User, {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'secret',
            status: {
              name: 'Active',
            },
            user_type_id: adminUserTypeRaw?.id,
          }),
        ])
        .execute();
    }
  }
}
