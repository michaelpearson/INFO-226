function UserService($timeout) {
  this.mockUserData = {"users":	[{	"LoginName":	"bloggsjoe1", "Password":	"mypassword1",	"UserType":	"staff" },{	"LoginName":	"a", "Password":	"a",	"UserType":	"staff" },{	"LoginName":	"smithsally1", "Password":	"mypassword2",	"UserType":	"staff	" }]};

  this.isInvalid = (username, password) => {
    return !username || !password || username == '' || password == '';
  };

  this.validateLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      if(this.mockUserData.users.some((user) => user.LoginName == username && user.Password == password)) {
        $timeout(resolve, 1000);
      } else {
        $timeout(reject, 500);
      }
    });
  };

}

application.service('UserService', UserService);