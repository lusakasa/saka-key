# Options

## Visibility Specification

Options visibility is specified in the "visible" property. If "visible" is missing or "visible" is true, then the option is always visible. If "visible" is false, then the option is never visible. If "visible" is a string it must be a conjunction of clauses. In that case the option is only visible of all clauses evaluate to true.

A clause is a condition that must be true for the element to be visible. A clause can take the following forms:

* key = value - true when value[key] === JSON.parse(value)
* key != value - true when value[key] !== JSON.parse(value)
* key is visible - true only if the option with the given key is visible
* key not visible - true only if the option with the given key is not visible

key must be the name of the key of some other option belonging to the mode. 

Clauses are combined with &&.

## Visibility Examples

{
  "type": "color",
  "label": "Border Color",
  "key": "borderColor",
  "visible": "customColors is visible && customColors = false"
},
{
  "type": "text",
  "label": "Font Size",
  "key": "fontSize",
  "visible": "useCustomCSS = false"
},
