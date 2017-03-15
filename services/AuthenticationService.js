var GUEST = 0;
var MANAGER = 1;
var OWNER = 'Owner';
var CONTRACTOR = 3;

function AuthenticationService() {
    var loggedInType = GUEST;
    var username = '';

    this.setLoggedIn = (loginType, username) => {
        this.loggedInType = loginType;
        this.username = username;
    }

    this.getLoginStatus = () => {
        return this.loggedInType;
    }

    this.isLoggedIn = () => this.isLoggedIn;
}

application.service('AuthenticationService', AuthenticationService);