import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Status } from 'src/statuses/status.entity';
import { StatusName } from '../../statuses/enums/status-name.enum';

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
            status_name: StatusName.Active,
          },
          {
            status_name: StatusName.Inactive,
          },
          {
            status_name: StatusName.Refunded,
          },
        ])
        .execute();
    }

    const countPending = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: StatusName.Pending,
      })
      .getCount();
    if (countPending === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: StatusName.Pending }])
        .execute();
    }
    const countApproved = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: StatusName.Approved,
      })
      .getCount();

    if (countApproved === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: StatusName.Approved }])
        .execute();
    }
    const countCancelled = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: StatusName.Cancelled,
      })
      .getCount();

    if (countCancelled === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: StatusName.Cancelled }])
        .execute();
    }
    const countDisabled = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: StatusName.Disabled,
      })
      .getCount();

    if (countDisabled === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: StatusName.Disabled }])
        .execute();
    }

    const countRejected = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: StatusName.Rejected,
      })
      .getCount();

    if (countRejected === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: StatusName.Rejected }])
        .execute();
    }

    const countCompleted = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: StatusName.Completed,
      })
      .getCount();

    if (countCompleted === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: StatusName.Completed }])
        .execute();
    }

    const countRefunded = await connection
      .createQueryBuilder()
      .select()
      .from(Status, 'Status')
      .where('"Status"."status_name" = :status_name', {
        status_name: StatusName.Refunded,
      })
      .getCount();

    if (countRefunded === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Status)
        .values([{ status_name: StatusName.Refunded }])
        .execute();
    }
  }
}
