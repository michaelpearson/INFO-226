function UserService($scope) {
  this.mockUserData = {"users":	[{	"LoginName":	"bloggsjoe1", "Password":	"mypassword1",	"UserType":	"staff" },{	"LoginName":	"a", "Password":	"a",	"UserType":	"staff" },{	"LoginName":	"smithsally1", "Password":	"mypassword2",	"UserType":	"staff	" }]};

  this.isInvalid = (username, password) => {
    return !username || !password || username == '' || password == '';
  };

  this.validateLogin = (username, password, $scope) => {
    return new Promise((resolve, reject) => {
      if(this.mockUserData.users.some((user) => user.LoginName == username && user.Password == password)) {
        setTimeout(resolve, 1000);
      } else {
        setTimeout(reject, 500);
      }
    }).finally($scope.applyAsync);
  };

}

application.service('UserService', UserService);