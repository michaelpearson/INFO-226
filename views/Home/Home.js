function HomeController(AuthenticationService) {
  this.loggedIn = AuthenticationService.isLoggedIn();

}