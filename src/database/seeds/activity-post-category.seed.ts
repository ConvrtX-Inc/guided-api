import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ActivityPostCategory } from '../../activity-post-category/activity-post-category.entity';

export default class CreateActivityPostCategory implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(ActivityPostCategory, 'ActivityPostCategory')
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(ActivityPostCategory)
        .values([
          { name: 'Activity Package' },
          { name: 'Newsfeed' },
          { name: 'Event' },
          { name: 'Article' },
          { name: 'Advertisement' },
          { name: 'Outfitter' },
        ])
        .execute();
    }
  }
}
