import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserType } from 'src/user-type/user-type.entity';
import { UserTypeName } from '../../user-type/enums/user-type-name.enum';

export default class CreateUserType implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countGuide = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: UserTypeName.Guide })
      .getCount();

    //update to Tourist Guide
    if (countGuide > 0) {
      await connection
        .createQueryBuilder()
        .update(UserType)
        .set({ name: UserTypeName.TouristGuide })
        .where([{ name: UserTypeName.Guide }])
        .execute();
    }

    const countTouristGuide = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: UserTypeName.TouristGuide })
      .getCount();

    if (countTouristGuide === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserType)
        .values([{ name: UserTypeName.TouristGuide }])
        .execute();
    }
    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: UserTypeName.Admin })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserType)
        .values([{ name: UserTypeName.Admin }])
        .execute();
    }
    const countTourist = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: UserTypeName.Tourist })
      .getCount();

    //update to Traveller
    if (countTourist > 0) {
      await connection
        .createQueryBuilder()
        .update(UserType)
        .set({ name: UserTypeName.Traveller })
        .where([{ name: UserTypeName.Tourist }])
        .execute();
    }

    const countTraveller = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: UserTypeName.Traveller })
      .getCount();

    if (countTraveller === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserType)
        .values([{ name: UserTypeName.Traveller }])
        .execute();
    }

    const countSubAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(UserType, 'UserType')
      .where('"UserType"."name" = :name', { name: UserTypeName.SubAdmin })
      .getCount();

    if (countSubAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(UserType)
        .values([{ name: UserTypeName.SubAdmin }])
        .execute();
    }
  }
}
