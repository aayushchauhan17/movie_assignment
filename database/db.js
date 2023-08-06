const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  playlist: {
    type: Array,
    required: false,
  },
});

const user = mongoose.model("user", userSchema);

const connectionDb = async (username, password) => {
  const URL = `mongodb+srv://aayushchauhan17:m7S4ytBr95qTcgoT@cluster0.cbodhcr.mongodb.net/userData?retryWrites=true&w=majority`;

  mongoose
    .connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Database connected Successfully");
    })
    .catch((error) => {
      console.log("while error is connecting with database : ", error.message);
    });
};

module.exports = connectionDb;
