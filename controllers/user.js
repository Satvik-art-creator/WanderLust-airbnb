const User = require("../models/user.js");

module.exports.renderSignUp = async (req, res) => {
    res.render("users/signup");
}

module.exports.submitSignUp = async (req,res) => {
    try{
        let {name, username, email, password} = req.body;
        const newUser = new User({name, email, username});
        const regUser = await User.register(newUser, password);
        // console.log(regUser);    
        // console.log(name);

       req.login(regUser, (err) => {
        if(err) return next(err);
        req.flash("success", `Hey ${name}, Welcome to the WanderLust!!`);
        res.redirect("/listings");
       });
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.submitLogin = async (req, res) => {
    req.flash("success", "Welcome back to the WanderLust!!");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You are Logged Out!!");
    res.redirect("/listings");
  });
}