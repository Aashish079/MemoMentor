require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express();

const authMiddleware = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRoute = require("./routes/auth");
const assignmentRoute = require("./routes/assignments");
const revisionRoute = require("./routes/revisions")

const connectDB = require("./db/connect");

app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
app.set("trust proxy", 1);
const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000,
	max: 100,
});
app.use(limiter);
// routes
app.get("/", (req, res) => {
	res.send("Memo Mentor API");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/assignments", authMiddleware, assignmentRoute);
app.use("/api/v1/revisions", authMiddleware, revisionRoute)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		setInterval(async () => {
			const Assignment = require('./models/Revision')
			const revisions = await Assignment.find({})
			for (const revision of revisions) {
				revision.currentCount += 1
				await Assignment.findByIdAndUpdate({ _id: revision._id }, revision, { new: true, runValidators: true })
			}
		}, 24 * 60 * 60 * 1000)
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
