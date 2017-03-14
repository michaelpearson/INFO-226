function BuildingService($timeout) {
  this.mockBuildingData = {"buildings":	[{	"ID":	"1",	"Owner":	"Joe	Bloggs",	"Address":	"123	Some	Street" },{	"ID":	"2",	"Owner":	"Sally	Smith",	"Address":	"456	Some	Street" }]};

  this.getBuildingData = () => {
    return new Promise((resolve, reject) => {
      $timeout(() => resolve(this.mockBuildingData), 500);
    });
  };

  this.getBuilding = (id) => {
    return new Promise((resolve, reject) => {
      var building = this.mockBuildingData.buildings.filter((b) => b.ID == id);
      if(Array.isArray(building) && building.length) {
        $timeout(() => resolve(building[0]), 500);
      } else {
        $timeout(reject, 500);
      }
    });
  }
}

application.service('BuildingService', BuildingService);