* document.body
  the <body> element within <html>
* document.documentElement
  the root <html> element
* document.scrollingElement
  the scrollable element (document.documentElement in standard mode, document.body in quirks mode)
* document.activeElement
  the currently focused element

* document.createElement()

* document.createDocumentFragment()
  creates a virtual element that's not mounted to the dom, when mounted, its children are mounted instead, efficient rendering

* document.createEvent()

* document.createTreeWalker()

* document.elementFromPoint(x, y)
  returns topmost element at x, y

* document.elementsFromPoint(x, y)
  returns array of elements at x, y

* document.hasFocus()
  returns true if the focus is currently located anywhere inside the specified document.


* element.clientHeight
  (integer = css height + css padding - scrollbar) zero for elements with no CSS or inline layout boxes, otherwise it's  the inner height of an element in pixels, including padding but not the horizontal scrollbar height, border, or margin.

* element.clientWidth
  (integer = css width + css padding - scrollbar)

* element.clientLeft/clientRight/clientTop/clientBottom
  (integer = width of border (inner height for top and bottom))

* element.scrollheight
  the total height in pixels an element would take if it would all fit in the viewport without vertical scrollbars, includes padding but not borders or margins
  https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight

* element.scrollTop
  gets/sets the number of pixels an element has been scrolled from the top (always 0 for nonscrollable elements)

Determine if an element has been totally scrolled
  element.scrollHeight - element.scrollTop === element.clientHeight