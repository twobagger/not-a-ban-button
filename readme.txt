Notes:
Please note that this uses local storage to store a string used by the NS servers to verify that you are able to ban someone. If you do not store this string locally first (by following the directions in the next section), you will fail security checks when you try to ban people, and the tool will not tell you about it. This is the full extent of what this permission is used for.

How to Use:
First, go to the nation page of another nation in your region. It doesn't matter who; you just need to be able to see a ban button. (As I'm writing this, I'm realizing I should add support for going to the admin page instead.) This stores a verification string on your computer.

Then, go to your region page. Under any regional happening that appears on your page and indicates that a nation has joined, the tool will create a button that says "Ban <nation>". Clicking this does all of the following, in this order:

- Locks all other generated buttons
- Sends a ban request with your security check value to the server - hopefully you got it from the appropriate page!
- Waits for a response from the server
- Waits for one second after the response completes (note: I could probably get away with making this shorter! Maybe 1s - half the response time???)
- Unlocks all other generated buttons. 

Included:
manifest.json
nationpage.js, which grabs the security check value from another nation page with a ban button
regionpage.js, which populates the regional happenings with ban buttons and submits requests when they are clicked

Known issues, possibly with solutions:

Issue: visiting a subpage of the nation page with buttons that redirect you to a similar page will trigger an alert (but not kill the extension)
Example: https://www.nationstates.net/nation=twobagger/detail=trend/censusid=13 (the buttons here have an action that redirects to another version of the same page, which also has "/nation=")
Solution: TBA, but for now, users may put the extension in click-to-use mode instead of always-on mode.

Issue: if a user attempts to ban a nation, but their most recent chk value was with a different nation (or even on a different day with the same nation), the bans may fail in a non-obvious way.
Solution: TBA. May implement a button that the user can trigger to display the current chk value, the nation used to store that value, and the date/time when the user stored this value. (Of course, the tool would have to store all of these!)

