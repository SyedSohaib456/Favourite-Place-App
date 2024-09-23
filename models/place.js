export class Place {
    constructor(title, imageUri, location,id,lat,lng) {
      this.title = title;
      this.imageUri = imageUri;
      // this.address = location.address;  
      this.location = location;  
      this.lat=location.lat,
      this.lng=location.lng,
      this.id = new Date().toString() + Math.random().toString();  
      this.id=id;
    }
  }
  
