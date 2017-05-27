function UserService(ApiService, $timeout) {
  var userListEndpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/user_list.json';
  var users = [];
  var userListPromise = fetch(userListEndpoint)
      .then(r => r.json())
      .then(r => users.push.apply(users, r.users));

  this.isInvalid = (username, password) => {
    return !username || !password || username == '' || password == '';
  };

  this.validateLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      $timeout(() => {
        var user = users.filter((user) => user.LoginName == username && user.Password == password);
        if(Array.isArray(user) && user.length) {
          resolve(user[0]);
        } else {
          reject();
        }
      }, 1000);
    });
  };

  var clone = (o) => {
    return JSON.parse(JSON.stringify(o));
  };

  this.getUserList = () => {
    if(users.length) {
      return Promise.resolve(clone(users));
    } else {
      return userListPromise.then(() => clone(users));
    }
  }
}

application.service('UserService', UserService);