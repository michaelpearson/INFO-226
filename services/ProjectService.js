function ProjectService(ApiService) {
  var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/project.{id}.json';
  var endpointUpdate = 'https://happybuildings.sim.vuw.ac.nz/api/pearsomich2/update.project.json';

  this.projectCache = [];

  this.minProjectId = 0;
  this.maxProjectId = this.minProjectId;

  this.resolveLoading = () => {};
  this.projectResolver = new Promise((resolve, reject) => this.resolveLoading = resolve);

  this.resolveNextProject = () => {
    fetch(endpoint.replace(/{id}/gi, this.maxProjectId))
      .then(r => {
        if(r.ok) {
          this.maxProjectId++;
          return r;
        }
        throw "Last project";
      })
      .then(r => r.json())
      .then((project) => this.projectCache.push(project))
      .then(() => this.resolveNextProject())
      .catch(() => this.resolveLoading());
  };

  this.resolveNextProject();

  this.getNextProjectId = () => {
    return this.maxProjectId;
  };

  this.templateProject = () => {
    return {
      "ProjectID": "new",
      "Name": "Untitled project",
      "BuildingID": "",
      "Status": "ready",
      "StartDate": new Date(),
      "EndDate": new Date(),
      "ContactPerson": "",
      "ProjectManager": "",
      "Contractor": "",
      "Works": [],
      "Comments": []
    }
  };

  this.getProjectsForBuilding = (buildingId, includeArchived) => {
    return this.projectResolver.then(() => {
      includeArchived = includeArchived || false;
      var projects = [];
      for(var a = 0; a < this.projectCache.length;a++) {
        if(this.projectCache[a].BuildingID == buildingId) {
          if(!includeArchived && this.projectCache[a].Status == 'archived') {
            continue;
          }
          projects.push(this.parseProject(this.projectCache[a]));
        }
      }
      return projects;
    });
  };

  this.getProject = (id) => {
    if(id == 'new') {
      return this.templateProject();
    }
    return this.projectResolver.then(() => {
      for(var a = 0; a < this.projectCache.length;a++) {
        if(this.projectCache[a].ProjectID == id) {
          return Promise.resolve(this.parseProject(this.projectCache[a]));
        }
      }
      throw "Could not find project!";
    });
  };

  this.parseProject = (projectObject) => {
    projectObject.StartDate = new Date(projectObject.StartDate);
    projectObject.EndDate = new Date(projectObject.EndDate);
    return projectObject;
  };

  this.save = (project) => {
    return this.projectResolver.then(() => {
      if (project.ProjectID == 'new') {
        project.ProjectID = this.getNextProjectId();
        this.projectCache.push(project);
      } else {
        for (var a = 0; a < this.projectCache.length; a++) {
          if (this.projectCache[a].ProjectID == project.ProjectID) {
            this.projectCache[a] = project;
          }
        }
      }
      return fetch(endpointUpdate, {
        method: "POST",
        body: JSON.stringify(project),
        headers: {
          'content-type': 'application/json'
        }
      });
    });
  }
}

application.service('ProjectService', ProjectService);