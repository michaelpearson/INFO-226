function LoginController(UserService, $state, $scope) {
  this.loginFailed = false;
  this.loggingIn = false;
  this.username = '';
  this.password = '';

  this.submit = () => {
    this.loggingIn = true;
    this.loginFailed = false;
    UserService.validateLogin(this.username, this.password)
      .then(() => $state.go('buildings'))
      .catch(this.setFailedLogin);
  };

  this.setFailedLogin = () => {
    this.loggingIn = false;
    this.loginFailed = true;
    $scope.$applyAsync();
  }

}