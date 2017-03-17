function UserService(ApiService, $timeout) {
  var userListEndpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/user_list.json';
  var users = [];

  fetch(userListEndpoint)
      .then(r => r.json())
      .then(r => users = r.users);

  this.isInvalid = (username, password) => {
    return !username || !password || username == '' || password == '';
  };

  this.validateLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      var user = users.filter((user) => user.LoginName == username && user.Password == password);
      if(Array.isArray(user) && user.length) {
        resolve(user[0]);
      } else {
        reject();
      }
    });
  };

}

application.service('UserService', UserService);