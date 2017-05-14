const API_KEY = 'AIzaSyCq49a9vPAcqGO_AcUnFlWcCiDevCNtXiE';

function MapsService() {
  this.getIFrameUrl = (address) => {
    return `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(address)}"`;
  }
}

application.service('MapsService', MapsService);