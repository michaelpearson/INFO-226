var GUEST = 'guest';
var MANAGER = 'manager';
var OWNER = 'owner';

function AuthenticationService() {
  this.setLoggedIn = (loginType, username) => {
    var loginInfo = {
      username: username,
      type: loginType
    };
    localStorage.setItem('login', JSON.stringify(loginInfo));
  };

  this.getLoginStatus = () => {
    var loginInfo = JSON.parse(localStorage.getItem('login')) || {};
    return loginInfo.type || GUEST;
  };

  this.getUsername = () => {
    var loginInfo = JSON.parse(localStorage.getItem('login')) || {};
    return loginInfo.username;
  }

  this.isLoggedIn = () => this.getLoginStatus() != GUEST;

  this.logout = () => {
    localStorage.removeItem('login');
  };
}

application.service('AuthenticationService', AuthenticationService);