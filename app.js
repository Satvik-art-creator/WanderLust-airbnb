const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("express-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oidc");

if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const ExpError = require("./utils/expError.js");
const User = require("./models/user.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

const port = 8080;

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

let db_url=process.env.ATLASDB_URL;

async function main(){
    await mongoose.connect(db_url);
}

main()
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log(`Database not connected to server. Error: ${err}`));

app.listen(port, () => console.log(`server is running on port ${port}`));

const store= MongoStore.create({
  mongoUrl: db_url,
  collectionName: "sessions",
  crypto:{
    secret: process.env.SECRET
  },
  touchAfter: 24*3600
});

store.on("error", ()=>{
  console.log("Error on mongodb store ", err);
})

const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/oauth2/redirect/google',
  scope: [ 'openid', 'profile', 'email' ]
}, async function verify(issuer, profile, cb) {
    try {
      // console.log("OIDC profile:", profile);
      const email = profile.emails?.[0]?.value;
      const name = profile.displayName || profile.name?.givenName || "Google User";

      // 1️⃣ Try to find user by Google ID
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return cb(null, user);
      }

      // 2️⃣ Try to find existing local user by email
      if (email) {
        user = await User.findOne({ email });

        if (user) {
          // 🔗 Link Google account
          user.googleId = profile.id;
          await user.save();
          return cb(null, user);
        }
      }

      // 3️⃣ Create brand new user
      const newUser = new User({
        name,
        email,
        googleId: profile.id,
        username: `${googleid.slice(0, 7)}`
      });

      await newUser.save();
      return cb(null, newUser);

    } catch (err) {
      // console.error("OIDC verify error:", err);
      return cb(err);
    }
}));

app.use((req, res, next) => {
    res.locals.succMsg = req.flash("success");
    res.locals.errMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// for PageNotFound
app.all("*", (req,res,next)=>{
    next(new ExpError(404, "Page Not Found!")); 
});

//for error handling
app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something Went Wrong!!"} = err;
    res.status(statusCode).render("error", {message});
});