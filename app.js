const express = require("express");
const app = express();
const databaseSwitcher = require("./middleware/databaseSwitcher");

// ...existing code...

app.use(databaseSwitcher);

// ...existing code...

app.listen(3000, () => {
  console.log("Server is running on port 7777");
});
