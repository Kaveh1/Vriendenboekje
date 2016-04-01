function add() {
	//Retrieve the entered form data
	var name = $('[name="name"]').val();
	var number = $('[name="number"]').val();
	var email = $('[name="email"]').val();

	//Fetch the existing objects
	var objects = getObjects();

	objects.push({
		a : name,
		b : number,
		c : email
	})
	saveObjects(objects);
}

function getObjects() {
	//See if objects is inside localStorage
	if (localStorage.getItem("objects")) {
		//If yes, then load the objects
		objects = JSON.parse(localStorage.getItem("objects"));
	} else {
		//Make a new array of objects
		objects = new Array();
	}
	return objects;
}

function saveObjects(objects) {
	//Save the list into localStorage
	localStorage.setItem("objects", JSON.stringify(objects));
}

function homepage() {
	//Fetch the existing objects
	objects = getObjects();

	//Clear the list
	$('#items').find('li').remove();

	//Add every object to the objects list
	$.each(objects, function(index, item) {
		element = '<li onclick="getValues(this)">' + item.a + '</li>';

		$('#items').append(element);
	});

	$('#items').listview();
	$('#items').listview("refresh");
}

function getValues(element) {
	//Get the clicked element
	//console.log($(element).html());
	array_number = $(element).prevAll().length + 1;
	item_found = objects[--array_number];

	var d = item_found.a;
	var e = item_found.b;
	var f = item_found.c;

	//Checks if the values get through
	console.log(d + " " + e + " " + f);

	localStorage.setItem("edit_values", JSON.stringify({
		d : d.valueOf(),
		e : e.valueOf(),
		f : f.valueOf(),
		id : $(element).index()
	}));
	window.location.href = "http://127.0.0.1:8020/Vriendenboekje/bewerkVriend.html";
}

function updateObjects() {
	//Fetch the existing objects
	var objects = getObjects();

	//Initializes id and edit the elements 
	var id = JSON.parse(localStorage.getItem("edit_values")).id;
	objects[id] = {
		a : $('[name="name_edit"]').val(),
		b : $('[name="number_edit"]').val(),
		c : $('[name="email_edit"]').val()
	};

	localStorage.setItem("objects", JSON.stringify(objects));
	homepage();

	window.location.href = "http://127.0.0.1:8020/Vriendenboekje/home.html";
};

function deleteObjects() {
	//Delete the last element from the array
	objects.pop();
	//Store the new list
	saveObjects(objects);
	//Reload the page to show the new objects
	window.location.reload();
}

function deleteObject() {
	//Fetch the existing objects
	var objects = getObjects();
	
	//Initializes id of the element and deletes that element from objects
	var id = JSON.parse(localStorage.getItem("edit_values")).id;
	objects.splice(id, 1);
	localStorage["objects"] = JSON.stringify(objects);
	
	//Returns to the homescreen
	window.location.href = "http://127.0.0.1:8020/Vriendenboekje/home.html";
}


$(document).on('pagebeforeshow', '#home', function(event) {
	homepage();
});

