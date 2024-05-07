require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const database = require("./config/database.js")
const app = express();

const userRoutes = require("./routes/userRoute.js")
const profileRoutes = require("./routes/profileRoute.js");
const productRoutes = require("./routes/productRoute.js")
const paymentRoutes = require("./routes/paymentRoute.js")
const contactUsRoute = require("./routes/contactRoute.js")
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary.js");

const PORT = process.env.PORT || 4000;

// Connection
database.connect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
)

app.use(
  fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
  })
)

// cloudinary Connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/reach", contactUsRoute)


app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is up And Running...."
  })
})

//Server is runing
app.listen(PORT, () => console.log(`Server start at ${PORT}`));
