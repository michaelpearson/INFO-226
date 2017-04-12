function ProjectInfoController(ProjectService, $scope) {
  this.projects = [];

   this.$onInit = () => {
    console.log('here');
     ProjectService.getProject().then((projects) => this.projects = projects).then(() => $scope.$applyAsync())
   }
}
