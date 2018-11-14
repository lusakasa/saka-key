# Blacklist

Sometimes you may perfer to use a website's default shortcuts without having to first enter [pass mode](https://key.saka.io/tutorial/pass_keys); if this is the case you can blacklist the website. When a url is blacklisted the page will behave as though Saka Key is disabled.

## Navigating to Blacklist
To define your blacklist, first navigate to Saka Key's options panel. Blacklist is below "Appearance" in the options list: click "Blacklist". To the right of the options list you will be presented with the Blacklist's control panel. In the panel there is a single textbox labeled "Comma-Separated Regex Blacklist": this is where you define your blacklist.

##Defining Blacklist
The blacklist works by taking a list of comma-separated regular expressions, if the url of a webpage matches any of the regular expressions in list the page will be blacklisted. For example, "^https://www.google.com, g|Github" would block "https://www.google.com/", "https://www.google.com/maps", "github.com" and "https://en.wikipedia.org/wiki/GitHub", but not "https://developer.mozilla.org/en-US/"

##Basics of Regular Expressions
 If you don't know how to write regular expressions please read [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions). If all you want to do is block a single webpage, just copy the whole url to the list. If you want to block a whole domain, copy the beginning of the URL until the end of the domain name, being sure to also include the extension (.com, .org, ect).

