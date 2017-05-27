function BuildingDirectoryController(buildings, BuildingService) {
  this.buildings = buildings || [];
  this.canAddBuilding = BuildingService.canAddBuilding();
  this.filter = '';

  this.filteredBuildings = () => {
    return this.buildings.filter(e => (e.ID + e.Owner + e.Address).toLowerCase().indexOf(this.filter.toLowerCase()) >= 0);
  };

}
