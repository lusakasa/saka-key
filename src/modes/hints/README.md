# Hints Mode

Hints mode lets you activate links, text inputs, and select menus using your keyboard.

The basic flow is as follows:

1. User activates Hints mode from Command Mode
2. onEnter sends messages to gather hints in all frames
3. all frames receive mesage and calculate hintable elements
4. all frames send background page their hint count
5. background page calculates hint strings
6. background page sends each frame its hint strings
7. Each frame renders its hints

--

8. keypresses are sent to background page.
9. background page forwards keypress to all frames
10. each frame advances its state and messages back its status
11. background page triggers exit if every frame messages that its hints are filtered out

