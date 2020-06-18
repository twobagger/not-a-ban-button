navigator.__defineGetter__('userAgent', function () {
    return "nation " + document.getElementById("loggedin").attributes[1].nodeValue + " using ban button tool - Please send inquiries to Twobagger, perhaps at julian.nationstates@gmail.com"
});

var valueToStore = "";
var hereBeForms = document.forms;

for (var list_element of hereBeForms) 
{
	// The ban buttons are stored in a form that redirects users to the nation page.
	// So the action is going to be the nation page.
	if (list_element.getAttribute("action").includes("nation=")) 
	{
		// right now, there is one "input" element. it stores the "chk" value used for validation I think?
		// The same value is also present on the administration page.
		var inputs = list_element.getElementsByTagName("input")
		
		try
		{
			valueToStore = inputs[0].getAttribute("value")
		}
		catch (e)
		{
			alert("Error finding the chk value! Please tell Twobagger (or another technical person) what nation page you visited to find this alert.")
			console.log(e.message)
		}
		console.log(valueToStore)
		
		
		if (valueToStore) // maybe I should put something in for when this fails?
		{
			// handles the actual local storage.
			try
			{
				chrome.storage.local.set({'myValue': valueToStore}, function()
				{
					console.log('Setting value: ' + valueToStore);
					console.log('You should be ready to kick them now!');
				});
			}
			catch (e)
			{
				alert("Error storing the chk value! Please tell Twobagger (or another technical person) what nation page you visited to find this alert.")
				console.log(e.message)
			}
		}
		
	} // end list_element.getAttribute... 
	
} // end for