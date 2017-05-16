function ProjectDirectoryController(projects, $stateParams) {
  this.filter = 'all';
  this.projects = projects;
  this.buildingId = $stateParams.buildingId;

  this.getProjects = () => {
    if(this.filter == 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.Status == this.filter);
  }


  this.getStatusTypes = () => {
    var statuses = {};
    for(var a = 0; a < this.projects.length; a++) {
      statuses[this.projects[a].Status] = true;
    }
    var types = ['all'];
    for(statusType in statuses) {
      types.push(statusType);
    }
    return types;
  }

}
