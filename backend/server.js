const express = require("express");
const app = express();

// Define port
const PORT = 3000;

// Route
app.get("/jenkins", (req, res) => {
    res.send(`Jenkins Server ⚙️ running on port ${PORT}`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});