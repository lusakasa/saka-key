import { msg } from 'mosi/client';
import { scrollParent } from './scrollParent';

// Notes: My computer can do 174,000 document.elementFromPoint() calls per second
// with a resolution of 1280x720 at 100% zoom, and sampling the top left of every 10th pixel,
// finding all elements takes (1280*720/100)/174000 or 50ms
// if i had a 4k monitor it would take (3840 * 2160 / 100)/174000 or 477 ms
// but if i sampled only every 20 pixels,
// it would take (3840 * 2160 / 400)/174000 120ms
function findAllElementsInViewport (step=10) {
  const candidates = new Set();
  for (let j = 0; j < window.innerHeight; j+=step) {
    for (let i = 0; i < window.innerWidth; i+=step) {
      candidates.add(document.elementFromPoint(i, j))
    }
  }
  return candidates;
}

function isInViewport (rect) {
  var html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
}

export function showHints () {

}

export function hideHints () {

}

export function showToolbar () {
  msg(1, 'modeAction', { mode: 'DEBUG', action: 'showToolbar' });
}

export function hideToolbar () {

}

export function showMousePosition () {

}

export function hideMousePosition () {

}

function renderAnchorBoxes () {
  try {
    document.querySelector('#mount').remove();
  } catch (e) {

  }

  const anchors = document.querySelectorAll('a');
  const mount = document.createElement('div');
  mount.id = 'mount';
  const fragment = document.createDocumentFragment();
  for (const a of anchors) {
    const rect = a.getBoundingClientRect();
    if (isInViewport(rect)) {
      const e = document.createElement('div');
      e.style = `
        position: absolute;
        background-color: rgba(0, 0, 255, 0.1);
        z-index: ${9999999999};
        width: ${rect.width}px;
        height: ${rect.height}px;
        left: ${rect.left}px;
        top: ${rect.top + document.scrollingElement.scrollTop}px;
      `;
      fragment.appendChild(e);
    }
  }
  document.scrollingElement.appendChild(mount);
  mount.appendChild(fragment);
  console.log('executed renderAnchorboxes');
}

function renderAnchorBoxesScrollParent () {
  try {
    document.querySelector('#mount').remove();
  } catch (e) {

  }

  const anchors = document.querySelectorAll('a');
  const mount = document.createElement('div');
  mount.id = 'mount';
  const mounts = new Map();
  for (const a of anchors) {
    const rect = a.getBoundingClientRect();
    if (isInViewport(rect)) {
      const sp = scrollParent(a);
      if (!mounts.has(sp)) {
        const mount = document.createElement('div')
        mount.className = 'mount';
        mounts.set(sp, mount);
      }
      const e = document.createElement('div');
      e.style = `
        position: absolute;
        cursor: pointer;
        background-color: rgba(0, 0, 255, 0.1);
        z-index: ${9999999999};
        width: ${rect.width}px;
        height: ${rect.height}px;
        left: ${rect.left}px;
        top: ${rect.top + sp.scrollTop}px;
      `;
      e.addEventListener('click', (event) => {
        console.log('element', e, 'scroll parent', sp);
      });
      mounts.get(sp).appendChild(e);
    }
  }
  mounts.forEach((mount, sp) => {
    sp.appendChild(mount);
  });
  console.log('executed renderAnchorboxes');
}

let initialized = false;
function renderAnchorBoxesParent () {
  if (!initialized) {
    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    const sheet = styleEl.sheet;
    sheet.insertRule('td { transform: scale(1, 1); }', sheet.cssRules.length);
    initialized = true;
  }

  const anchors = document.querySelectorAll('a');
  const anchorBoxes = new Map();
  for (const a of anchors) {
    const rect = a.getBoundingClientRect();
    if (isInViewport(rect)) {
      const anchorBox = document.createElement('div')
      anchorBox.className = 'mount';
      anchorBox.style = `
        position: absolute;
        cursor: pointer;
        background-color: rgba(0, 0, 255, 0.1);
        z-index: ${9999999999};
        width: ${a.offsetWidth}px;
        height: ${a.offsetHeight}px;
        left: ${a.offsetLeft}px;
        top: ${a.offsetTop}px;
      `;
      anchorBox.addEventListener('click', (event) => {
        console.log('element', anchorBox, 'anchor', a);
      });
      anchorBoxes.set(a, anchorBox);
    }
  }
  document.documentElement.style = 'none';
  anchorBoxes.forEach((anchorBox, anchor) => {
    (anchor.offsetParent || document.documentElement).appendChild(anchorBox);
  });
  document.documentElement.style = 'initial';
}

const dynamic = false;
let timeout;
export function showAnchors () {
  renderAnchorBoxesParent();
  if (dynamic) {
    window.addEventListener('scroll', renderAnchorBoxes);
    window.addEventListener('resize', renderAnchorBoxes);
  }
}

export function hideAnchors () {
  try {
    document.querySelector('#mount').remove();
  } catch (e) {}
  try {
    document.querySelectorAll('.mount').forEach((m) => { m.remove(); });
  } catch (e) {}
  if (dynamic) {
    window.removeEventListener('scroll', renderAnchorBoxes);
    window.removeEventListener('resize', renderAnchorBoxes);
  }
}
