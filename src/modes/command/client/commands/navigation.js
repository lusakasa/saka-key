import { isURL } from '../../../../lib/url'

export function goBack () {
  window.history.go(-1)
}

export function goForward () {
  window.history.go(1)
}

/* Goes to the next page (as in 2nd page of a google search) */
export function nextPage () {
  const nextPageURL = document.querySelector('[rel="next"]').href

  if (isURL(nextPageURL)) {
    window.location.href = document.querySelector('[rel="next"]').href
  } else if (SAKA_DEBUG) {
    console.log(
      'Element with next link does not have a valid URL. Element found: ',
      document.querySelector('[rel="next"]')
    )
  }
}

export function previousPage () {
  const previousPageURL = document.querySelector('[rel="prev"]').href

  if (isURL(previousPageURL)) {
    window.location.href = document.querySelector('[rel="prev"]').href
  } else if (SAKA_DEBUG) {
    console.log(
      'Element with next link does not have a valid URL. Element found: ',
      document.querySelector('[rel="prev"]')
    )
  }
}

/* Goes up URL hierarchy (from /cookie_recipes/3 to /cookie_recipes) */
export function goUp () {
  const rawURL = window.location.href
  const url = rawURL.endsWith('/')
    ? rawURL.substring(0, rawURL.length - 1)
    : rawURL
  const urlSplit = url.split('/')
  // make sure we haven't hit the base domain yet
  if (urlSplit.length > 3) {
    window.location.href = urlSplit
      .slice(0, Math.max(3, urlSplit.length - 1))
      .join('/')
  }
}

export function goToRoot () {
  window.location.href = window.location.origin
}
