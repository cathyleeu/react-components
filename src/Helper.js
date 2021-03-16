import imagesLoaded from 'imagesloaded';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const getMousePos = e => {
  return { 
      x : e.clientX, 
      y : e.clientY 
  };
};

const calcWinsize = () => {
  return {width: window.innerWidth, height: window.innerHeight};
};

// Preload images
const preloadImages = (selector = 'img') => {
  return new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll(selector), resolve);
  });
};

const getSiblings = (e) => {
  // for collecting siblings
  let siblings = [];
  // if no parent, return no sibling
  if (!e.parentNode) {
    return siblings;
  }
  // first child of the parent node
  let sibling = e.parentNode.firstChild;
  // collecting siblings
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

// Preload images 
// NOTE: for google font api

// const preloadFonts = (id) => {
//   return new Promise((resolve) => {
//       WebFont.load({
//           typekit: {
//               id: id
//           },
//           active: resolve
//       });
//   });
// };

export {
  uuidv4,
  getMousePos,
  calcWinsize,
  preloadImages,
  lerp,
  getSiblings
}