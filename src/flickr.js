const API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const USER_ID = '156990471@N07';
const API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${API_KEY}&user_id=${USER_ID}&format=json&nojsoncallback=1`;

var myid = 0;

export const fetchImages = () => {
  return fetch(API_ENDPOINT).then(function (response) {
    return response.json().then(function (json) {
      return json.photos.photo.map(
        ({farm, server, id, secret}) => `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
      );
    })
  })
};

export const fetchSize = (myid) => {
  var array = [];
  const API_SIZE = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${myid}&format=json&nojsoncallback=1`;
    return fetch(API_SIZE).then((response) => {
        return response.json().then((json) => {
          return json.sizes.size.map(({label, width, height}) => `${label},${width},${height}`);//{ 
            /*if (label == 'Thumbnail') {
              return [width,height];
            }*/
          //})
        })
      })
};

export const fetchDesc = () => {
  var str="";
  const API_SIZE = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${API_KEY}&photo_id=${myid}&format=json&nojsoncallback=1`;
    fetch(API_SIZE).then((response) => {
        return response.json().then((json) => {
          str = JSON.stringify(json.photo.description);
          str = str.slice(12);
          str = str.slice(1,-2);
      })
  })
};