import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, Timestamp } from 'typeorm';
import { Status } from 'src/statuses/status.entity';

export default class CreateStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([
          {
            status_name: 'Active',
          },
          {
            status_name: 'Inactive',
          },
        ])
        .execute();
    }
  }
}
