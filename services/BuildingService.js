function BuildingService($timeout, ApiService) {
  var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/building_dir.json';



  this.getBuildingData = () => {
    return fetch(endpoint).then(r => r.json()).then(r => r.buildings);
  };

  this.getBuilding = (id) => {
    return this.getBuildingData().then((buildings) => {
      var building = buildings.filter((b) => b.ID == id);
      if(Array.isArray(building) && building.length) {
        return building[0];
      } else {
        throw "Building not found";
      }
    });
  }
}

application.service('BuildingService', BuildingService);