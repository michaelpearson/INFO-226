function LoginController(UserService, AuthenticationService, $state, $scope) {
  this.loginFailed = false;
  this.loggingIn = false;
  this.username = '';
  this.password = '';

  this.submit = () => {
    this.loggingIn = true;
    this.loginFailed = false;
    UserService.validateLogin(this.username, this.password)
      .then((userType) => AuthenticationService.setLoggedIn(userType))
      .then(() => $state.go('buildings'))
      .catch(this.setFailedLogin);
  };

  this.setFailedLogin = () => {
    this.loggingIn = false;
    this.loginFailed = true;
    $scope.$applyAsync();
  }

}