import cron from "node-cron";
import User from "../models/user.model.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const result = await User.updateMany({}, { resetAttemptsToday: 0 });
    console.log(
      `Reset password attemps for all users at 12:00am - ${result.modifiedCount} users updated.`
    );
  } catch (error) {
    console.log("Errors resetting attemps: ", error);
  }
});
