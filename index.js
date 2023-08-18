const express = require("express");
const env = require("dotenv");
const cors = require("cors");
env.config();

const CharacterRouter = require("./routes/CharacterRouter.js");
const MovieRouter = require("./routes/MovieRouter.js");
const GenderRouter = require("./routes/GenderRouter.js")
const CharacterMovieGenderRouter = require("./routes/CharacterMovieGenderRouter.js");
const UserRouter = require("./routes/UserRouter.js");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerConfig = require("./swagger/swaggerConfig.js");

const app = express();
const PORT = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerConfig)));


//Routes
app.use('/api', CharacterRouter);
app.use('/api', MovieRouter);
app.use('/api', GenderRouter);
app.use('/api', CharacterMovieGenderRouter);
app.use('/api', UserRouter);


// port
app.listen(PORT, ()=> {
    console.log(`Server online on port ${PORT}`);
})