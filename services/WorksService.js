function WorksService(ProjectService, AuthenticationService) {

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
      if(workIndex === 'new') {
        return Promise.resolve({
          Status: 'on-going',
          TypeOfWork: 'Untitled',
          Index: 'new',
          ProjectID: projectId
        });
      }
      return this.getWorksByProject(projectId)
        .then(works => works[workIndex]);
    };

    this.save = (work) => {
      var projectId = work.ProjectID;
      var workIndex = work.Index;
      return this.getWorkByProjectAndIndex(projectId, workIndex)
        .then(w => {
          if(this.equals(w, work) && w.Index !== 'new') {
              return Promise.resolve();
          }
          return ProjectService.getProject(projectId)
            .then(p => {
              if(workIndex === 'new') {
                workIndex = p.Works.length;
              }
              p.Works[workIndex] = {
                TypeOfWork: work.TypeOfWork,
                Status: work.Status
              };
              return ProjectService.save(p);
            });
        });
    };

    this.remove = (work) => {
      var projectId = work.ProjectID;
      var workIndex = work.Index;
      return ProjectService.getProject(projectId).then(p => {
        p.Works.splice(workIndex, 1);
        return ProjectService.save(p);
      });
    };

    this.equals = (a, b) => {
        return a.TypeOfWork === b.TypeOfWork && a.Status === b.Status;
    };
    this.canEditWorks = () => {
      var loginType = AuthenticationService.getLoginStatus();
      switch(loginType) {
        case CONTRACTOR:
        case MANAGER:
          return true;
        case OWNER:
          return false;
      }
    };
}

application.service('WorksService', WorksService);