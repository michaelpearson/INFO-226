function ProjectService(ApiService) {
  this.mockData = [
    {"ProjectID": "1", "Name": "Scaffolding and painting.", "BuildingID": "123", "Status": "open", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."}]},
    {"ProjectID": "2", "Name": "Scaffolding and painting.", "BuildingID": "123", "Status": "ready", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."}]},
    {"ProjectID": "3", "Name": "Scaffolding and painting.", "BuildingID": "123", "Status": "closed", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."}]},
    {"ProjectID": "4", "Name": "Scaffolding and painting.", "BuildingID": "123", "Status": "closed", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."}]}
  ];

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
  }

  // var maxProjectId = 2;
  // var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/project.{id}.json';
  //
  // var resolvedProjects = [];
  // var projectPromises = [];

  // Enumerate all projects :/
  // for(var a = 0;a < maxProjectId; a++) {
  //   projectPromises.push(fetch(endpoint.replace(/{id}/gi, a)).then(r => r.json).then((project) => resolvedProjects.push(project)));
  // }


  this.getProjectsForBuilding = (buildingId, includeArchived) => {
    includeArchived = includeArchived || false;
    var projects = [];
    for(var a = 0; a < this.mockData.length;a++) {
      if(this.mockData[a].BuildingID == buildingId) {
        if(!includeArchived && this.mockData[a].Status == 'archived') {
          continue;
        }
        projects.push(this.parseProject(this.mockData[a]));
      }
    }
    return Promise.resolve(projects);

    // return Promise
    //     .all(projectPromises)
    //     .then(() => resolvedProjects.filter(p => p.BuildingID == buildingId))
    //     .then((projects) => Array.isArray(projects) ? projects : []);
  };

  this.getProject = (id) => {
    if(id == 'new') {
      return this.templateProject();
    }
    for(var a = 0; a < this.mockData.length;a++) {
      if(this.mockData[a].ProjectID == id) {
        return Promise.resolve(this.parseProject(this.mockData[a]));
      }
    }
    return Promise.reject();
  };

  this.parseProject = (projectObject) => {
    projectObject.StartDate = new Date(projectObject.StartDate);
    projectObject.EndDate = new Date(projectObject.EndDate);
    return projectObject;
  };

  this.getNextProjectId = () => {
    return Math.max.apply(null, this.mockData.map(p => parseInt(p.ProjectID))) + 1;
  }

  this.save = (project) => {
    if(project.ProjectID == 'new') {
      project.ProjectID = this.getNextProjectId();
      this.mockData.push(project);
    }
    for(var a = 0;a < this.mockData.length;a++) {
      if(this.mockData[a].ProjectID == project.ProjectID) {
        this.mockData[a] = project;
      }
    }
  }
}

application.service('ProjectService', ProjectService);