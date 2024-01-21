const express = require("express");
const cron = require("node-cron");
const fs = require("fs");

const app = express();

cron.schedule("* * * * * *", () => {
  // Read the current counter value from the JSON file
  const rawData = fs.readFileSync("counter.json");
  const data = JSON.parse(rawData);

  // Increment the counter
  data.counter += 1;

  // Write the updated counter value back to the JSON file
  fs.writeFileSync("counter.json", JSON.stringify(data));

  console.log("Counter incremented:", data.counter);
});

// Your Express routes and middleware go here...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
