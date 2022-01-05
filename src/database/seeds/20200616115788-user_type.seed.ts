import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserType } from 'src/user-type/user-type.entity';

export default class CreateUserType implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countGuide = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: 'Guide' })
      .getCount();

    if (countGuide === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserType)
        .values([{ name: 'Guide' }])
        .execute();
    }
    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: 'Admin' })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserType)
        .values([{ name: 'Admin' }])
        .execute();
    }
    const countTourist = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: 'Tourist' })
      .getCount();

    if (countTourist === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserType)
        .values([{ name: 'Tourist' }])
        .execute();
    }
  }
}
