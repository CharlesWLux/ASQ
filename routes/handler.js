var lib     = require('../lib') 
  , utils     = lib.utils.form
  , appLogger = lib.logger.appLogger;

function getHomePage(req, res) {
  res.send(200, 'This is where the home page will be.');
}

function getRegister(req, res) {
  //TODO Code a real sign up page.
  res.render('index', {
        'fromsignup': true
      });
}

function postRegister(req, res) {
  //TODO change those horrible signup...
  var username        = req.body.signupusername;
  var email           = req.body.signupemail;
  var password        = req.body.signuppassword;
  var passwordConfirm = req.body.signuppasswordconfirm

  var validUserForm = utils.isValidUserForm(username,
      email, password, passwordConfirm);

  if (validUserForm === null) { //TODO handle errors
     // Username availability and saving
    var User = db.model('User', schemas.userSchema);
    User.findOne({ name : username },
      function(err, user) {
        if (user) {
          res.render('index', { //TODO render proper register page
            message    : 'Username ' + user + ' already taken',
            fromsignup : true
          });
        } else {
        var newUser = new User({
          name     : username,
          password : password,
          email    : email
        });
        newUser.save(function(err) {
          if (err) {
            appLogger.error('Registration - ' + err.toString());
            res.render('index', {
              message : 'Something went wrong. The great ASQ Server said: '
                  + err.toString()
            });
          }
          req.login(newUser, function(err) {
            if (err) {
              appLogger.error('First login - ' + err.toString());
              res.render('index', {
              message : 'Something went wrong. The great ASQ Server said: '
                  + err.toString()
              });
            }
            res.redirect('/' + username
                + '/?alert=Registration Succesful&type=success');
          });
        });
      }
    });
  }else{
    console.log(validUserForm)
    res.render('index', {
      message : 'Something went wrong. The great ASQ Server said: You specified wrong data',
       // + validUserForm.toString(),
      fromsignup : true
      });
  }
} 

function getSignIn(req, res) {
  res.render('index', {
      fromsignup : false
    });
}

function postSignIn(req, res) {
  var redirect_to = req.session.redirect_to ? 
      req.session.redirect_to : '/' + req.body.username + '/' ;
  res.redirect(redirect_to);
}

function signOut(req, res) {
  appLogger.debug('Sign out');
  req.logout();
  res.redirect('/');
}

function getUploadForm(req, res) {
  res.render('upload', { username: req.user.name });
}

module.exports = {
  getHomePage   : getHomePage,
  getRegister   : getRegister,
  postRegister  : postRegister,
  getSignIn     : getSignIn,
  postSignIn    : postSignIn,
  signOut       : signOut,
  getUploadForm : getUploadForm
}