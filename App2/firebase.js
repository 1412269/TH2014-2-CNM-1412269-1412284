var config = {
	apiKey: "AIzaSyCtXcuOUw97zE4Ry-YKl3MP62Ugag5udVw",
	authDomain: "uber-dac16.firebaseapp.com",
	databaseURL: "https://uber-dac16.firebaseio.com",
	projectId: "uber-dac16",
	storageBucket: "uber-dac16.appspot.com",
	messagingSenderId: "978750955877"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref("book-list/").on("value", function(snapshot) {
	var data = {
		customers: []
	};
	for(x in snapshot.val()){
		if((snapshot.val()[x].state=='chưa định vị')||(snapshot.val()[x].state=='bị từ chối')){
			data.customers.push(snapshot.val()[x]);
		}
	}
	$(function(){
		$("#data-table").html(template(data));
	});
}, function (error) {
	console.log("Error: " + error.code);
});

var xe = [];

database.ref("cars/").on("value", function(snapshot) {
	for(x in snapshot.val()){
		xe.push(snapshot.val()[x]);
	}
}, function (error) {
	console.log("Error: " + error.code);
});