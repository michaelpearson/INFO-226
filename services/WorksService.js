function WorksService(ProjectService) {

    var clone = (o) => JSON.parse(JSON.stringify(o));

    this.getWorksByProject = (projectId) => {
      return ProjectService.getProject(projectId)
        .then(p => {
            var works = clone(p.Works);
            for (var a = 0; a < works.length; a++) {
                works[a].Index = a;
                works[a].ProjectID = projectId;
            }
            return works;
        });
    };

    this.getWorkByProjectAndIndex = (projectId, workIndex) => {
      return this.getWorksByProject(projectId)
        .then(works => works[workIndex]);
    };

    this.save = (work) => {
      var projectId = work.ProjectID;
      var workIndex = work.Index;
      return this.getWorkByProjectAndIndex(projectId, workIndex)
        .then(w => {
          if(this.equals(w, work)) {
              return Promise.resolve();
          }
          return ProjectService.getProject(projectId)
            .then(p => {
              p.Works[workIndex] = {
                TypeOfWork: work.TypeOfWork,
                Status: work.Status
              };
              return ProjectService.save(p);
            });
        });
    };

    this.equals = (a, b) => {
        return a.TypeOfWork === b.TypeOfWork && a.Status === b.Status;
    };
}

application.service('WorksService', WorksService);