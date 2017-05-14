function BuildingDirectoryController(buildings) {
  this.buildings = buildings;
  this.filter = '';

  this.filteredBuildings = () => {
    return this.buildings.filter(e => (e.ID + e.Owner + e.Address).toLowerCase().indexOf(this.filter.toLowerCase()) >= 0);
  };

}
