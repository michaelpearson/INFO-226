function EditBuildingsController(building, BuildingService) {
  this.building = building;
  this.isNew = this.building.ID == 'new';

  this.save = () => {
    BuildingService.update(this.building);
  }
}