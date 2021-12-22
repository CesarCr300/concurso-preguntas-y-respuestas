import { db } from "./models/index";

export async function connectDB(force: boolean = false) {
  await db.sequelize.sync({ force });
  if (force) {
  }
}
