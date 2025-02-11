//
// This is the entry point of the seeding process
//

import dbConfigSeeding from 'src/config/db.config.seeding';
import { MainSeeder } from './main.seeder';
import { PropertyFactory } from './property.factory';
import { PropertyFeatureFactory } from './propertyFeature.factory';
import { UserFactory } from './user.factory';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

// create an option that includes both datasource option and seeding option
const options: DataSourceOptions & SeederOptions = {
  ...dbConfigSeeding(),
  factories: [PropertyFactory, UserFactory, PropertyFeatureFactory],
  seeds: [MainSeeder],
};

const datasource = new DataSource(options);
datasource.initialize().then(async () => {
  await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});
