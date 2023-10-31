require("dotenv").config();
const cron = require("node-cron");
const RegisterToken = require("./registerToken");
const mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Automatically update registerToken's status
    async function updateExpiredStatus() {
      // get the current time
      const currentTime = new Date();

      try {
        // Find documents with expiresAt in the past and status not already "expired"
        // MongoDB queries don't support multiple conditions on the same field like this. It should use the $and operator to clarify the intent.
        const expiredTokens = await RegisterToken.find({
          // $lte is less than or equal to
          expiresAt: { $lte: currentTime },
          $and: [
            // $ne is not equal to
            { status: { $ne: "expired" } },
            { status: { $ne: "activated" } },
          ],
        });

        // If there are any expired tokens
        if (expiredTokens.length > 0) {
          // Update status to "expired" for each expired token
          // for each token in the expiredTokens array, calls the updateONE method to update the status to "expired"
          // Promise.all() method returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects.
          // Promise.all() ensures that all the individual update operations are completed.
          // Since updateOne returns a promise, using Promise.all with await ensures that the function waits for all updates to finish before continuing.
          await Promise.all(
            expiredTokens.map((token) => token.updateOne({ status: "expired" }))
          );
        }
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }

    // Schedule the task to run every minute
    // cron.schedule() create a cron job that runs every minute
    // cron timing pattern: * * * * *
    // * (Minute) - every minute
    // * (Hour) - every hour
    // * (Day of Month) - every day
    // * (Month) - every month
    // * (Day of Week) - every day of the week
    cron.schedule("* * * * *", () => {
      updateExpiredStatus();
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

module.exports = mongoose;
module.exports.Employee = require("./employee");
module.exports.Document = require("./document");
module.exports.RegisterToken = require("./registerToken");
