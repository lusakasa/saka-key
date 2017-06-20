import { mouseEvent } from 'lib/dom';

let timers = [];

/**
 * Repeatedly issues hover events to video elements so that their controls
 * stay shown
 */
export function showVideoControls () {
  document.querySelectorAll('video').forEach((video) => {
    // TODO: come up with a fix for youtube and netflix so that controlss
    // consistently appear when link hints are rendered, esp. in fullscreen

    // const rect = video.getBoundingClientRect();
    // const bottomBar = document.elementFromPoint(
    //   rect.left + rect.width / 2, rect.top + rect.height - 10
    // );
    // console.log('bottomBar', bottomBar);

    mouseEvent(video, 'hover');
    timers.push(setInterval(() => mouseEvent(video, 'hover'), 200));
  });
}

/**
 * Cleans up hover event dispatchers from showVideoControls()
 */
export function hideVideoControls () {
  timers.forEach((timer) => clearInterval(timer));
  timers = [];
  document.querySelectorAll('video').forEach((video) => {
    mouseEvent(video, 'unhover');
  });
}
