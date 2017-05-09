function ProjectEditController ($stateParams, ProjectService){
  this.$onInit = () => {
    console.log($stateParams);
    var projectId = $stateParams.projectId;
    ProjectService.getProject(projectId).then(p => this.project = p);
  }

}