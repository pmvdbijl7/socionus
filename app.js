require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

// Get .env Variables
const hostURL = process.env.URL;
const hostPort = process.env.PORT || 3030;
const dbConnection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gettingstarted.35frc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Import Routes
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Set Templating Engine
app.set('view engine', 'ejs');

// Set Public Directory as a Static Directory
app.use(express.static('public'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// Connect to Database
mongoose.connect(
	dbConnection,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	},
	() => {
		console.log('Succesfully Connected to Database');
	}
);

// Route Middlewares
app.use(authRoutes);
app.use(homeRoutes);
app.use(profileRoutes);

// Show 404 Page if Page Doesn't Exist
app.use((req, res, next) => {
	res.status(404).send('This page does not exist!');
});

// Start Server at Given Host and Port
app.listen(hostPort, () => {
	console.log(`App Listening at ${hostURL}:${hostPort}`);
});
