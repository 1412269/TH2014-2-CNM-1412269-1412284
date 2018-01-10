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
		customersCDV: [],
		customersDDV: [],
		customersDCXN: [],
		customersBTC: [],
		customersDHT: []
	};
	for(x in snapshot.val()){
		if(snapshot.val()[x].state=='chưa định vị'){
			var temp = new Date(snapshot.val()[x].timeBook);
			var dataa = snapshot.val()[x];
			dataa.timeBook = temp.toUTCString();
			console.log(dataa);
			data.customersCDV.push(dataa);
		}
		if(snapshot.val()[x].state=='đã định vị'){
			var temp = new Date(snapshot.val()[x].timeBook);
			var dataa = snapshot.val()[x];
			dataa.timeBook = temp.toUTCString();
			console.log(dataa);
			data.customersDDV.push(dataa);
		}
		if(snapshot.val()[x].state=='đã có xe nhận'){
			var temp = new Date(snapshot.val()[x].timeBook);
			var dataa = snapshot.val()[x];
			dataa.timeBook = temp.toUTCString();
			console.log(dataa);
			data.customersDCXN.push(dataa);
		}
		if(snapshot.val()[x].state=='bị từ chối'){
			var temp = new Date(snapshot.val()[x].timeBook);
			var dataa = snapshot.val()[x];
			dataa.timeBook = temp.toUTCString();
			console.log(dataa);
			data.customersDCXN.push(dataa);
		}
		if(snapshot.val()[x].state=='đã hoàn thành'){
			var temp = new Date(snapshot.val()[x].timeBook);
			var dataa = snapshot.val()[x];
			dataa.timeBook = temp.toUTCString();
			console.log(dataa);
			data.customersDHT.push(dataa);
		}
	}
	$(function(){
		$("#data-table").html(template(data));
	});
	data.customersCDV.sort(function(a, b){
		var x = new Date(a.timeBook).getTime()/1000;
		var y = new Date(b.timeBook).getTime()/1000;
			return y - x;
		});
}, function (error) {
	console.log("Error: " + error.code);
});