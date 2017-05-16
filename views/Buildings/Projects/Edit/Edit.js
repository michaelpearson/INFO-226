function ProjectEditController (project, ProjectService, $stateParams, $state) {
  this.project = project;

  if($stateParams.buildingId) {
    this.project.BuildingID = $stateParams.buildingId;
  }

   this.doUpdate = () => {
      ProjectService.save(this.project).then(() => {
        $state.go('buildings.projects.view', {
          projectId: this.project.ProjectID
        });
      });
   }
}