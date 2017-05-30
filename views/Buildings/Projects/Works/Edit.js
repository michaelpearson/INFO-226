function WorkEditController (project, work, WorkService, $stateParams, $state) {
  this.project = project;
  this.work = work;

  /**if($stateParams.buildingId) {
    this.project.BuildingID = $stateParams.buildingId;
  }**/

  this.doUpdate = () => {
    WorkService.save(this.work).then(() => {
      $state.go('buildings.projects.view', {
        projectId: this.project.ProjectID
      });
    });
  };

  this.doRemove = () =>{
    WorkService.remove(this.work).then(() => {
       $state.go('buildings.projects.view', {
         projectId: this.project.ProjectID
       });
     });
  };

  /**this.managers = () => {
    return users.filter(u => u.UserType === MANAGER);
  };

  this.contractors = () => {
    return users.filter(u => u.UserType === CONTRACTOR);
  };**/
}