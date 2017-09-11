export const guiRoot = document.createElement('div')
guiRoot.id = 'saka-gui-root'
guiRoot.style = `position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
z-index: 2147483647;
opacity: 1;
pointer-events: none;`

document.documentElement.appendChild(guiRoot)

export function handleFullscreenChange (event) {
  if (SAKA_DEBUG) console.log('fullscreenElement changed')
  if (document.webkitIsFullScreen) {
    const fsElement = document.webkitFullscreenElement
    if (fsElement) {
      fsElement.appendChild(guiRoot)
    }
  } else {
    document.documentElement.appendChild(guiRoot)
  }
}
