# Disabled Mode

All pages start in disabled mode by default until client options are received.

If the "enabled" option is true, then the client switches to Command mode (or Text mode if a text element is focused). Otherwise, the client stays in disabled mode and the user interacts with the page as if Saka Key isn't installed.

This mode may be reentered if new client options are received and "enabled" is set to false.

