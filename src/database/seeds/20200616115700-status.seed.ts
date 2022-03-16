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

    const countPending = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: 'Pending',
      })
      .getCount();
    if (countPending === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: 'Pending' }])
        .execute();
    }
    const countApproved = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: 'Approved',
      })
      .getCount();

    if (countApproved === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: 'Approved' }])
        .execute();
    }
    const countCancelled = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: 'Cancelled',
      })
      .getCount();

    if (countCancelled === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: 'Cancelled' }])
        .execute();
    }
    const countDisabled = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: 'Disabled',
      })
      .getCount();

    if (countDisabled === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: 'Disabled' }])
        .execute();
    }

    const countRejected = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: 'Rejected',
      })
      .getCount();

    if (countRejected === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: 'Rejected' }])
        .execute();
    }

    const countCompleted = await connection
    .createQueryBuilder()
    .select()
    .from(Status, 'Status')
    .where('"Status"."status_name" = :status_name', {
      status_name: 'Completed',
    })
    .getCount();

  if (countCompleted === 0) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Status)
      .values([{ status_name: 'Completed' }])
      .execute();
  }
  }
}
