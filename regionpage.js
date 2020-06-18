// Note: document.getElementById("loggedin") returns the body element. Currently has two fields: id (hopefully "loggedin") and data-nname (nation name).
// For some reason, document.body.data-nname wasn't working for me.
// TODO: make this deprecated, garbage code better :)
navigator.__defineGetter__('userAgent', function () {
    return "nation " + document.getElementById("loggedin").attributes[1].nodeValue + " using ban button tool - Please send inquiries to Twobagger, perhaps at julian.nationstates@gmail.com"
});

// Stores the buttons created by this tool.
var buttonArray = new Array();

// Wrapping everything in this so I have access to the stored chk value everywhere.
var thisValue = chrome.storage.local.get('myValue', function(result)
{
		var page = document.getElementById("content");
		var thatOne = page.querySelectorAll("ul")[0];  // the first ul element happens to be the regional happenings; this will need to be updated if the page layout changes. 
		var lis = thatOne.querySelectorAll("li"); // each of these correspond to lines in the regional happenings
		for (var li of lis) 
		{	
			thisText = li.textContent;
			if (thisText.indexOf("arrived") > -1) // if "arrived" is present in the happenings line...
			{
				// TODO: check and see if something dumb like Vinny's nation pretitle breaks this.
				// It appears that it does not; the "The " prefix appears to always hold the first link (to the nation page)
				var link_thing = li.getElementsByTagName('a')[0].href; //this grabs the first link in the line. should be to the nation page. 
				var nationName = link_thing.replace(/.*nation=(.*)/i,'$1'); 
				var displayName = nationName.replace(/_/g,' '); 
				
				// This creates a button and generally puts it underneath the happenings line.
				// I wanted to make it easy so the user could just move their mouse in a straight line down the page.
				// Obviously I can change it if needed.
				var buttonOnPage = document.createElement("button");
				var text = document.createTextNode("Ban " + displayName); 
				var banForm = document.createElement("form");
				theLastP = document.createElement("p")
				theActualButton = document.createElement("button")
				theActualButton.type = "submit"
				theActualButton.className += "button icon remove danger"
				theActualButton.appendChild(text)
				
				// These lines are needed to pass important information to later functions.
				theActualButton.name = nationName; 
				theActualButton.value = result.myValue;
				
				// These lines handle putting the button on the page and organizing the buttons.
				theLastP.appendChild(theActualButton)
				banForm.appendChild(theLastP)
				li.appendChild(banForm);
				buttonArray.push(theActualButton)
				
				
				// This is needed for the simultaneous execution rule. I'm using this thread as a model:
				// https://forum.nationstates.net/viewtopic.php?f=15&t=481693
				theActualButton.addEventListener("click", function(e)
				{
					e.preventDefault(); 
					
					// Turns off all the buttons.
					buttonArray.map(button=>button.disabled = true);
					
					// Creates a new XHR
					var xhr = new XMLHttpRequest();
					
					// This will fire when the request enters a new state.
					xhr.onreadystatechange = function() 
					{
						// readyState == 4 is the "Done" state.
						if(xhr.readyState==4) 
						{
							setTimeout(function()
							{
								// TODO: add option to remove 1s delay.
								// maybe a clickable button?
								buttonArray.map(button=>button.disabled = false);
							}, 1000); // end setTimeout
						}
					} // end onreadystatechange
					
					// These lines send the needed information in the request
					// Right now, it mimics what you'd send if you clicked the ban button from the nation page
					xhr.open("POST","/nation=" + e.target.name,true);
					data = new FormData();
					data.set("chk",e.target.value)
					data.set("ban",1)
					console.log("Sending request to ban nation " + e.target.name)
					
					// TODO: Implement a way to check what *nation* stored the data.
					// Perhaps also on what date?
					// If I store something for one nation on an op, and then come back a month later
					// but forget to store anything then, I'll have the wrong chk value and get screwed.
					if (!e.target.value)
					{
						alert("No chk value found! Please visit a nation page promptly.")
					}
					
					xhr.send(data);	
					
				}); // end addEventListener
				
			} // end if "arrived"...
			
		} //end for li in lis...
		
}); // end storage wrapper



