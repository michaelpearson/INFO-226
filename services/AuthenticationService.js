var GUEST = 'guest';
var MANAGER = 'manager';
var OWNER = 'owner';

function AuthenticationService() {
  var loggedInType = GUEST;
  var username = '';

  this.setLoggedIn = (loginType, username) => {
    loggedInType = loginType;
    //localStorage.setItem('login')
    this.username = username;
  };

  this.getLoginStatus = () => {
    return loggedInType;
  };

  this.isLoggedIn = () => this.isLoggedIn;
}

application.service('AuthenticationService', AuthenticationService);