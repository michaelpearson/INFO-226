function EditBuildingsController(building, BuildingService, $state) {
  this.building = building;
  this.isNew = this.building.ID == 'new';

  this.save = () => {
    BuildingService.update(this.building).then(b => $state.go('buildingInfo.view', {id: b.ID }));
  }
}