import {fetchImages} from './flickr';
import {put} from 'redux-saga/effects';

var images = [];
var slash = [];
var under = [];
var photoid = [];

export function* loadImages() {
  const myimages = yield fetchImages();

  var mysrc = setCustomSrc(myimages);
  var mythumb = setCustomThumb(myimages);
  /*for (var c=0; c<myimages.length;c++){
    slash[c] = getPosition(myimages[c],"/",4)
    under[c] = getPosition(myimages[c],"_",1)
    photoid[c] = myimages[c].slice(slash[c]+1, under[c])
  }*/

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

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}