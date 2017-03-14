function ProjectService($timeout) {
  this.mockProjectData = [{"ProjectID": "1", "Name": "Scaffolding and painting.", "BuildingID": "1", "Status": "closed", "StartDate": "2016-12-12T00:00:00", "EndDate": "2016-12-14T00:00:00", "ContactPerson": "Joe Bloggs", "ProjectManager": "Sally Smith", "Contractor": "ABC Company", "Works": [ {"TypeOfWork": "scaffolding", "Status": "done"}, {"TypeOfWork": "painting", "Status": "on-going"} ], "Comments": [ {"Author": "Johnny Guitar", "Text": "Work completed."}, {"Author": "John Doe", "Text": "Problem detected."} ]}];
  
  this.getProjectsForBuilding = (buildingId) => {
    return new Promise((resolve, reject) => {
      $timeout(() => resolve(this.mockProjectData), 500);
    });
  };
}

application.service('ProjectService', ProjectService);