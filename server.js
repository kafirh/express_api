const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();

const corsOptions ={
    origin: "*"
};

// Register cors middleware
app.use(cors(corsOptions));
app.use(express.json());

// Konek ke database
const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

db.mongoose.connect(db.url, mongooseConfig)
    .then(() => console.log("Database connected"))
    .catch(err => {
        console.log(`Gagal konek ${err.message}`);
        process.exit(1); // Gunakan process.exit(1) untuk menandakan ada kesalahan dalam koneksi
    });

// Memanggil routes mahasiswa
require("./app/routes/mahasiswa.route")(app);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
