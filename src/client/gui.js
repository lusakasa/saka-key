export const guiRoot = document.createElement('div')
guiRoot.id = 'saka-gui-root'
guiRoot.className = 'saka-gui-root'
const style = `.saka-gui-root * {
all: revert;
}

div#saka-gui-root {
all: revert;
position: absolute;
left: 0;
top: 0;
width: 100%;
height: 100%;
z-index: 2147483647;
opacity: 1;
background-color: transparent;
pointer-events: none;
}`
const styleElem = document.createElement('style')
styleElem.textContent = style

document.documentElement.appendChild(styleElem)
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
