function LoginController($scope, UserService, $state) {
  this.loginFailed = false;
  this.loggingIn = false;
  this.username = '';
  this.password = '';

  this.submit = () => {
    this.loggingIn = true;
    UserService.validateLogin(this.username, this.password, $scope)
      .then(() => $state.go('buildings'))
      .catch(() => this.loginFailed = true);
  }
}

application.component('login', {
  templateUrl: 'views/Login/Login.html',
  controller: LoginController,
  controllerAs: '$ctrl'
});