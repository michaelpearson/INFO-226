function ProjectEditController (project, ProjectService) {
  this.project = project;

   this.doUpdate = () =>{
    ProjectService.save(this.project);
   }
}