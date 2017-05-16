function ProjectService(ApiService) {
  this.mockData = [
    {"ProjectID": "1", "Name": "Scaffolding and painting.", "BuildingID": "123", "Status": "open", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."}]},
    {"ProjectID": "2", "Name": "Scaffolding and painting.", "BuildingID": "123", "Status": "ready", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."}]},
    {"ProjectID": "3", "Name": "Scaffolding and painting.", "BuildingID": "123", "Status": "closed", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."}]},
    {"ProjectID": "4", "Name": "Scaffolding and painting.", "BuildingID": "123", "Status": "closed", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."}]}
  ];

  // var maxProjectId = 2;
  // var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/project.{id}.json';
  //
  // var resolvedProjects = [];
  // var projectPromises = [];

  // Enumerate all projects :/
  // for(var a = 0;a < maxProjectId; a++) {
  //   projectPromises.push(fetch(endpoint.replace(/{id}/gi, a)).then(r => r.json).then((project) => resolvedProjects.push(project)));
  // }


  this.getProjectsForBuilding = (buildingId) => {
    var projects = [];
    for(var a = 0; a < this.mockData.length;a++) {
      if(this.mockData[a].BuildingID == buildingId) {
        projects.push(this.parseProject(this.mockData[a]));
      }
    }
    return Promise.resolve(projects);

    // return Promise
    //     .all(projectPromises)
    //     .then(() => resolvedProjects.filter(p => p.BuildingID == buildingId))
    //     .then((projects) => Array.isArray(projects) ? projects : []);
  };

  this.getWorksForProject = (projectID) =>{
    //var works = [];
    var project = this.getProject(projectID);
    if(project.$$state.status === 0){
        return Promise.resolve(project.Works);
    }
    return Promise.reject();
  };

  this.getProject = (id) => {
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

  this.save = (project) => {
    for(var a = 0;a < this.mockData.length;a++) {
      if(this.mockData[a].ProjectID == project.ProjectID) {
        this.mockData[a] = project;
      }
    }
  }
}

application.service('ProjectService', ProjectService);