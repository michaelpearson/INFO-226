function BuildingEditController(building, $state, BuildingService, users) {
  this.building = building;
  this.users = users.filter(u => u.UserType === OWNER);
  this.isNew = building.ID === 'new';

  this.save = () => {
    BuildingService.update(this.building).then((building) => {
      $state.go('buildings.view', {
        buildingId: building.ID
      });
    });
  };

}