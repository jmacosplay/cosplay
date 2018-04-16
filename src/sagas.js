import {fetchImages, fetchSize} from './flickr';
import {put} from 'redux-saga/effects';

var images = [];
var slash = [];
var under = [];
var photoid = [];

export function* loadImages() {
  const myimages = yield fetchImages();

  var mysrc = setCustomSrc(myimages);
  var mythumb = setCustomThumb(myimages);

  for (var i=0; i<myimages.length; i++)
  {
    var ele =
    {
      src: "",
      thumbnail: "",
      thumbnailWidth: 271,
      thumbnailHeight: 320,
      tags: [],
      caption: ""
    }
    /*var size = [];
    slash[i] = getPosition(myimages[i],"/",4)
    under[i] = getPosition(myimages[i],"_",1)
    photoid[i] = myimages[i].slice(slash[i]+1, under[i])
    size = fetchSize(photoid[i]);
    size.then(function(result) {
      console.log(result);
      setCustomSize(result);
    });*/
    ele.src = mysrc[i];
    ele.thumbnail = mythumb[i];
    images.push(ele);
  }
  yield put({type: 'IMAGES_LOADED', images})
}

function setCustomSrc (org) {
  var copy = [];
  for (var c=0; c<org.length;c++){
      copy[c] = org[c];
      copy[c] = copy[c].replace(/(\.[\w\d_-]+)$/i, '_b$1');
    }
  return copy
}

function setCustomThumb (org) {
  var copy = [];
  for (var c=0; c<org.length;c++){
    copy[c] = org[c];
    copy[c] = copy[c].replace(/(\.[\w\d_-]+)$/i, '_n$1');
  }
  return copy
}

function setCustomSize (org) {
  var copy = [];
  for (var c=0; c<org.length;c++){
    copy.push(org[c][2])
  }
  console.log(copy)
  return copy
}

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}