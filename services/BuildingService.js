function BuildingService(ApiService, AuthenticationService, ProjectService) {
  var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/building_dir.json';
  var updateBuildingEndpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/update.building.json';

  this.getBuildingData = () => {
    var tempBuildings;
    return fetch(endpoint)
      .then(r => r.json())
      .then(r => r.buildings)
      .then(buildings => {
        // Save a local copy of all of the results
        tempBuildings = buildings;
        // Return an array of permission values
        return Promise.all(buildings.map(b => this.hasReadPermission(b)));
      })
      // Filter to only take the elements which have permission
      .then(results => tempBuildings.filter((b, i) => results[i]));
  };

  this.getBuilding = (id) => {
    if(id === 'new') {
      return new Promise((resolve, reject) => resolve({Address:'', ID: 'new', Owner: ''}));
    }

    return this.getBuildingData().then((buildings) => {
      var building = buildings.filter((b) => b.ID == id);
      if(Array.isArray(building) && building.length) {
        return building[0];
      } else {
        throw "Building not found";
      }
    });
  };

  this.update = (building) => {
    if(!building.ID || building.ID == 'new') {
      return this.getBuildingData().then(buildings => {
        building.ID = Math.max.apply(null, buildings.map(b => b.ID)) + 1;
        return this.update(building);
      });
    }
    return fetch(updateBuildingEndpoint, {
      method: 'POST',
      body: JSON.stringify(building),
      headers: {
        "Content-Type": 'application/json'
      }
    }).then(r => building);
  };

  this.hasReadPermission = (building) => {
    var loginType = AuthenticationService.getLoginStatus();
    if(loginType === MANAGER) {
      return Promise.resolve(true);
    }
    if(loginType === OWNER) {
      return Promise.resolve(building.Owner === AuthenticationService.getUsername());
    }
    if(loginType === CONTRACTOR) {
      return ProjectService.getProjectsForBuilding(building.ID).then(projects => projects.length > 0);
    }
  };

  this.hasWritePermission = (building) => {
    var loginType = AuthenticationService.getLoginStatus();
    switch(loginType) {
      case MANAGER:
        return true;
      case OWNER:
      case CONTRACTOR:
        return false;
    }
  };

  this.canAddBuilding = () => {
    var loginType = AuthenticationService.getLoginStatus();
    switch(loginType) {
      case MANAGER:
        return true;
      case OWNER:
      case CONTRACTOR:
        return false;
    }
  }
}

application.service('BuildingService', BuildingService);