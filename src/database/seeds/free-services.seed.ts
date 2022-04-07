import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { FreeServices } from '../../free-services/free-services.entity';

export default class CreateFreeServices implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const count = await connection
      .createQueryBuilder()
      .select()
      .from(FreeServices, 'FreeServices')
      .getCount();

    if (count === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(FreeServices)
        .values([
            { name: 'Foods'},
            { name: 'Wifi'},
            { name: 'Transport'},
            { name: 'Snacks'},
            { name: 'Electricity'}            
        ])
        .execute();
    }
  }
}
