navigator.__defineGetter__('userAgent', function () {
    return "nation " + document.getElementById("loggedin").attributes[1].nodeValue + " using ban button tool - Please send inquiries to Twobagger, perhaps at julian.nationstates@gmail.com"
});

var valueToStore = "nothing yet"
var hereBeForms = document.forms

for (var list_element of hereBeForms) 
{
	// The ban buttons are stored in a form that redirects users to the nation page.
	// So the action is going to be the nation page.
	if (list_element.getAttribute("action").includes("nation=")) 
	{
		// right now, there is one "input" element. it stores the "chk" value used for validation I think?
		// The same value is also present on the administration page.
		var inputs = list_element.getElementsByTagName("input")
		valueToStore = inputs[0].getAttribute("value")
		
		if (valueToStore != "nothing yet") // maybe I should put something in for when this fails?
		{
			// handles the actual local storage.
			chrome.storage.local.set({'myValue': valueToStore}, function()
			{
				console.log('Setting value: ' + valueToStore);
				console.log('You should be ready to kick them now!');
			});
		}
		
	} // end list_element.getAttribute... 
	
} // end for