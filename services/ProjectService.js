function ProjectService(ApiService) {
  var maxProjectId = 2;
  var endpoint = 'https://happybuildings.sim.vuw.ac.nz/api/' + ApiService.username + '/project.{id}.json';

  var resolvedProjects = [];
  var projectPromises = [];

  // Enumerate all projects :/
  for(var a = 0;a < maxProjectId; a++) projectPromises.push(fetch(endpoint.replace(/{id}/gi, a)).then(r => r.json).then((project) => resolvedProjects.push(project)));

  this.getProjectsForBuilding = (buildingId) => {
    return Promise
        .all(projectPromises)
        .then(() => resolvedProjects.filter(p => p.BuildingID == buildingId))
        .then((projects) => Array.isArray(projects) ? projects : []);
  };
}

application.service('ProjectService', ProjectService);