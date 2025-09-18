const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Cinema");
    console.log("✅ Connect successfully!!!!!!!");
  } catch (error) {
    console.error("❌ Connect fail: ", error);
  }
}

module.exports = { connect };
