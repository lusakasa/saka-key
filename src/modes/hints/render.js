import { settings } from './settings';

let hintMarkers = [];
let hintMarkerContainingDiv = null;

export function hideHints () {
  console.log('hiding hints');
}

export function renderHints (hintDescriptors) {

  const hintStrings = generateHintStrings(settings.hintCharacters, hintDescriptors.length);
  for (let i = 0; i < hintDescriptors.length; i++) {
    hintMarkers.push(createMarkerFor(hintDescriptors[i], hintStrings[i]));
  }

  hintMarkerContainingDiv = document.createElement('div');
  hintMarkerContainingDiv.id = 'vimiumHintMarkerContainer';
  hintMarkerContainingDiv.className = 'vimiumReset';
  for (var i = 0; i < hintMarkers.length; i++) {
    hintMarkerContainingDiv.appendChild(hintMarkers[i]);
  }
  document.body.appendChild(hintMarkerContainingDiv);
}

function createMarkerFor (link, hintString) {
  var marker = document.createElement('div');
  marker.className = 'internalVimiumHintMarker vimiumReset';
  var innerHTML = [];
  // Make each hint character a span, so that we can highlight the typed characters as you type them.
  for (var i = 0; i < hintString.length; i++) {
    innerHTML.push('<span class="vimiumReset">' + hintString[i].toUpperCase() + '</span>');
  }
  marker.innerHTML = innerHTML.join('');
  marker.setAttribute('hintString', hintString);

  // Note: this call will be expensive if we modify the DOM in between calls.
  var clientRect = link.rect;
  // The coordinates given by the window do not have the zoom factor included since the zoom is set only on
  // the document node.
  var zoomFactor = 1.0;
  marker.style.left = clientRect.left + window.scrollX / zoomFactor + 'px';
  marker.style.top = clientRect.top + window.scrollY / zoomFactor + 'px';
  marker.style.position = 'absolute';

  marker.clickableItem = link.element;
  return marker;
}

function generateHintStrings (characters, count) {
  const hints = [''];
  let offset = 0;
  while (hints.length - offset < count || hints.length === 1) {
    const hint = hints[offset++];
    for (const c of characters) {
      hints.push(hint + c);
    }
  }
  return hints.slice(offset, offset + count);
}
