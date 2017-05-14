function BuildingViewController(building, projects, MapsService, $sce) {
  this.projects = projects;
  this.building = building;
  this.mapAddress = $sce.trustAsResourceUrl(MapsService.getIFrameUrl(building.Address));
}