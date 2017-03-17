function LoginController(UserService, AuthenticationService, $state, $scope) {
  this.loginFailed = false;
  this.loggingIn = false;
  this.username = '';
  this.password = '';

  this.submit = () => {
    this.loggingIn = true;
    this.loginFailed = false;
    var username = this.username;
    var password =this.password;

    UserService.validateLogin(username, password)
      .then((user) => AuthenticationService.setLoggedIn(user.UserType, user.LoginName))
      .then(() => $state.go('buildings'))
      .catch(this.setFailedLogin);
  };

  this.setFailedLogin = () => {
    this.loggingIn = false;
    this.loginFailed = true;
    $scope.$applyAsync();
  }

}