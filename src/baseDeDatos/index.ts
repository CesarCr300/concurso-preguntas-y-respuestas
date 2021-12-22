import { db } from "./models/index";
import { seeder } from "./seeders/index";
export async function connectDB(force: boolean = false) {
  await db.sequelize.sync({ force });
  if (force) {
    seeder();
  }
}
