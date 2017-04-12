function ProjectService(ApiService) {
    				this.mockData = {"ProjectID":	"1",
    						"Name":	"Scaffolding	and	painting.",
    						"BuildingID":	"1",
    						"Status":	"closed",
    						"StartDate":	"2016-12-12T00:00:00",
    						"EndDate":	"2016-12-14T00:00:00",
    						"ContactPerson":	"Joe	Bloggs",
    						"ProjectManager":	"Sally	Smith",
    						"Contractor":	"ABC	Company",
    						"Works":	[
    {"TypeOfWork":	"scaffolding",	"Status":	"done"},
    {"TypeOfWork":	"painting",	"Status":	"on-going"}
    						],
    					"Comments":	[
    {"Author":	"Johnny	Guitar",	"Text":	"Work	completed."},
    {"Author":	"John	Doe",	"Text":	"Problem	detected."}
    						]
    };

  var maxProjectId = 2;
  var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/project.{id}.json';

  var resolvedProjects = []; //
  var projectPromises = []; //

  // Enumerate all projects :/
  for(var a = 0;a < maxProjectId; a++)
    projectPromises.push(fetch(endpoint.replace(/{id}/gi, a)).then(r => r.json).then((project) => resolvedProjects.push(project)));

  this.getProjectsForBuilding = (buildingId) => {
    return Promise
        .all(projectPromises)
        .then(() => resolvedProjects.filter(p => p.BuildingID == buildingId))
        .then((projects) => Array.isArray(projects) ? projects : []);
  };

  this.getProjects = () => {
    return Promise
        .all(projectPromises)
        .then((projects) => Array.isArray(projects) ? projects : []) //
  }

  this.getProject = () => {
    console.log('here');
    return this.mockData;
  }

}

application.service('ProjectService', ProjectService);