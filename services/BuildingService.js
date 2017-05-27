function BuildingService(ApiService) {
  var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/building_dir.json';
  var updateBuildingEndpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/update.building.json';

  this.getBuildingData = () => {
    return fetch(endpoint).then(r => r.json()).then(r => r.buildings);
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
}

application.service('BuildingService', BuildingService);