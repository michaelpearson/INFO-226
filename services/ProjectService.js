function ProjectService(ApiService) {
  this.mockData = {"ProjectID":	"1", "Name":	"Scaffolding	and	painting.", "BuildingID":	"1", "Status":	"closed", "StartDate":	"2016-12-12T00:00:00", "EndDate":	"2016-12-14T00:00:00", "ContactPerson":	"Joe	Bloggs", "ProjectManager":	"Sally	Smith", "Contractor":	"ABC	Company", "Works":	[ {"TypeOfWork":	"scaffolding",	"Status":	"done"}, {"TypeOfWork":	"painting",	"Status":	"on-going"} ], "Comments":	[ {"Author":	"Johnny	Guitar",	"Text":	"Work	completed."}, {"Author":	"John	Doe",	"Text":	"Problem	detected."}]};

  var maxProjectId = 2;
  var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/project.{id}.json';

  var resolvedProjects = [];
  var projectPromises = [];

  // Enumerate all projects :/
  for(var a = 0;a < maxProjectId; a++) {
    projectPromises.push(fetch(endpoint.replace(/{id}/gi, a)).then(r => r.json).then((project) => resolvedProjects.push(project)));
  }


  this.getProjectsForBuilding = (buildingId) => {
    return Promise
        .all(projectPromises)
        .then(() => resolvedProjects.filter(p => p.BuildingID == buildingId))
        .then((projects) => Array.isArray(projects) ? projects : []);
  };

  this.getProjects = () => {
    var mockProjectList = [];
    for(var a = 0; a < 5; a++) {
      var p = JSON.parse(JSON.stringify(this.parseProject(this.mockData)));
      p.ProjectID = a;
      mockProjectList.push(p);
    }
    return Promise.resolve(mockProjectList);
    // return Promise
    //   .all(projectPromises)
    //   .then((projects) => Array.isArray(projects) ? projects : []);
  };

  this.parseProject = (projectObject) => {
    projectObject.StartDate = new Date(projectObject.StartDate);
    projectObject.EndDate = new Date(projectObject.EndDate);
    return projectObject;
  };

  this.getProject = () => {
    return Promise.resolve(this.parseProject(this.mockData));
  }

}

application.service('ProjectService', ProjectService);