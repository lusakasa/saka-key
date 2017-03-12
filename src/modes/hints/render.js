import { settings } from './settings';

let hintMarkers = [];
let hintMarkerContainingDiv = null;

export function hideHints () {
  console.log('hiding hints');
}

function logXOfBase (x, base) {
  return Math.log(x) / Math.log(base);
}

export function renderHints (hintDescriptors) {
  // Initialize the number used to generate the character hints to be as many digits as we need to
  // highlight all the links on the page; we don't want some link hints to have more chars than others.
  const digitsNeeded = Math.ceil(logXOfBase(hintDescriptors.length, settings.linkHintCharacters.length));

  for (let i = 0; i < hintDescriptors.length; i++) {
    hintMarkers.push(createMarkerFor(hintDescriptors[i], i, digitsNeeded));
  }

  hintMarkerContainingDiv = document.createElement('div');
  hintMarkerContainingDiv.id = 'vimiumHintMarkerContainer';
  hintMarkerContainingDiv.className = 'vimiumReset';
  for (var i = 0; i < hintMarkers.length; i++) {
    hintMarkerContainingDiv.appendChild(hintMarkers[i]);
  }
  document.body.appendChild(hintMarkerContainingDiv);
}

function createMarkerFor (link, linkHintNumber, linkHintDigits) {
  var hintString = numberToHintString(linkHintNumber, linkHintDigits);
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

/*
 * Converts a number like '8' into a hint string like 'JK'. This is used to sequentially generate all of
 * the hint text. The hint string will be 'padded with zeroes' to ensure its length is equal to numHintDigits.
 */
function numberToHintString (number, numHintDigits) {
  const base = settings.linkHintCharacters.length;
  const hintString = [];
  let remainder = 0;
  do {
    remainder = number % base;
    hintString.unshift(settings.linkHintCharacters[remainder]);
    number -= remainder;
    number /= Math.floor(base);
  } while (number > 0);

  // Pad the hint string we're returning so that it matches numHintDigits.
  var hintStringLength = hintString.length;
  for (var i = 0; i < numHintDigits - hintStringLength; i++) {
    hintString.unshift(settings.linkHintCharacters[0]);
  }
  return hintString.join('');
}
