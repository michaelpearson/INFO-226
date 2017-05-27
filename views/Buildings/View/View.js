function BuildingViewController(building, projects, MapsService, $sce, BuildingService, ProjectService) {
  this.projects = projects;
  this.building = building;
  this.hasBuildingWriteAccess = BuildingService.hasWritePermission(this.building);
  this.canAddProject = ProjectService.canAddProject();

  this.mapAddress = $sce.trustAsResourceUrl(MapsService.getIFrameUrl(building.Address));
}