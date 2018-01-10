var phone;

var typeCar;

var inforCustomer;

var zxz = 0;

$(function(){
	var address;
	var rowSelected = null;
	$("#data-table").on("click", "#table tr[id='data-row']", function(){
		rowSelected = $(this);
		$(this).addClass("selected").siblings().removeClass("selected");
		address = $(this).find("td:eq(0)").text();
		phone = $(this).find("td:eq(1)").text();
		typeCar = $(this).find("td:eq(2)").text();

		database.ref("book-list/").orderByChild("phoneNumber").on("child_added", function(data) {
			if(data.val().phoneNumber == phone) {
				inforCustomer = data.val();
			}
		});
		// if($(this).find("td:eq(3)>span").text() != 'Located'){
		// 	$("#dinh-vi").css("display", "inline");
		// }
		$("#btn-app-control").css("display", "inline");
	});
	$(window).click(function(e){
		if($("#body-content").has(event.target).length == 0 && !$("#body-content").is(event.target)){
			$("#btn-app-control").css("display", "none");
			if(rowSelected != null){
				rowSelected.removeClass("selected");
			}
		}
	});
	// $("#data-table").on("click", "#dinh-vi", function(){
	// 	initMap();
	// 	geocodeAddress(geocoder, address, map);

	// 	database.ref("book-list/").orderByChild("phoneNumber").on("child_added", function(data) {
	// 		if(data.val().phoneNumber == phone) {
	// 			var update_table = "book-list/" + data.key + "/";
	// 			database.ref(update_table).update({
	// 				"state": false
	// 			});
	// 			return;
	// 		}
	// 	});
	// });

	$("#dinh-vi").click(function(){
		zxz = 1;
		initMap();
		geocodeAddress(geocoder, address, map);

		// database.ref("book-list/").orderByChild("phoneNumber").on("child_added", function(data) {
		// 	if(data.val().phoneNumber == phone) {
		// 		var update_table = "book-list/" + data.key + "/";
		// 		database.ref(update_table).update({
		// 			"state": "Đã định vị xong"
		// 		});
		// 		return;
		// 	}
		// });
	});

	$("#tim-xe").click(function(){
		labelCar = [];
		xeSanSang = [];
		var temp=0;
		var choice = 0;
		for(i=0; i<xe.length; i++){
			if(xe[i].State==0){
				getDistance(xe[i], 300, typeCar, function(){
					temp++;
					if((temp==xe.length) && ((xeSanSang.length==0) || (xeSanSang.length<10))){
						console.log("Không tìm thấy xe trong 300m");
						setTimeout(function(){
							console.log("Tìm xe tiếp theo");
							labelCar = [];
							xeSanSang = [];
							temp=0;
							for(i=0; i<xe.length; i++){
								if(xe[i].State==0){
									getDistance(xe[i], 600, typeCar, function(){
										temp++;
										if((temp==xe.length) && ((xeSanSang.length==0) || (xeSanSang.length<10))){
											console.log("Không tìm thấy xe trong 600m");
											setTimeout(function(){
												console.log("Tìm xe tiếp theo");
												labelCar = [];
												xeSanSang = [];
												temp=0;
												for(i=0; i<xe.length; i++){
													if(xe[i].State==0){
														getDistance(xe[i], 1000, typeCar, function(){
															temp++;
															if((temp==xe.length) && (xeSanSang.length==0)){
																setTimeout(function(){
																	alert("Không tìm thấy xe");
																},3000);
																choice=1;
															}
															if((temp==xe.length) && (xeSanSang.length!=0)){
																if(xeSanSang.length>=10){
																	xeSanSang.sort(function(a,b){
																		return a.distance-b.distance;
																	});
																	for(j=0;j<10; j++){
																		addMarker(xeSanSang[j].LocationCar, xeSanSang[j].desAddresses, xeSanSang[j].ID);
																	}
																	console.log(xeSanSang);
																	console.log(xeSanSang[0]);
																	var directionsService = new google.maps.DirectionsService;
																	var directionsDisplay = new google.maps.DirectionsRenderer;
																	directionsDisplay.setMap(map);
																	calculateAndDisplayRoute(directionsService, directionsDisplay, xeSanSang[0].LocationCar, positionCustomer);
																	database.ref("book-list/").orderByChild("phoneNumber").on("child_added", function(data) {
																		if(data.val().phoneNumber == phone) {
																			var update_table = "book-list/" + data.key + "/";
																			database.ref(update_table).update({
																				"driverNumber": xeSanSang[0].ID
																			});
																			return;
																		}
																	});
																} else {
																	xeSanSang.sort(function(a,b){
																		return a.distance-b.distance;
																	});
																	for(j=0;j<xeSanSang.length;j++){
																		addMarker(xeSanSang[j].LocationCar, xeSanSang[j].desAddresses, xeSanSang[j].ID);
																	}
																	console.log(xeSanSang);
																	console.log(xeSanSang[0]);
																	var directionsService = new google.maps.DirectionsService;
																	var directionsDisplay = new google.maps.DirectionsRenderer;
																	directionsDisplay.setMap(map);
																	calculateAndDisplayRoute(directionsService, directionsDisplay, xeSanSang[0].LocationCar, positionCustomer);
																	database.ref("book-list/").orderByChild("phoneNumber").on("child_added", function(data) {
																		if(data.val().phoneNumber == phone) {
																			var update_table = "book-list/" + data.key + "/";
																			database.ref(update_table).update({
																				"driverNumber": xeSanSang[0].ID
																			});
																			return;
																		}
																	});
																}
															}
														});
													} else {
														temp++;
													}
												}
											},5000);
										}
										if((temp==xe.length) && (xeSanSang.length>=10)){
											xeSanSang.sort(function(a,b){
												return a.distance-b.distance;
											});
											for(j=0;j<10; j++){
												addMarker(xeSanSang[j].LocationCar, xeSanSang[j].desAddresses, xeSanSang[j].ID);
											}
											console.log(xeSanSang);
											console.log(labelCar);
											database.ref("book-list/").orderByChild("phoneNumber").on("child_added", function(data) {
												if(data.val().phoneNumber == phone) {
													var update_table = "book-list/" + data.key + "/";
													database.ref(update_table).update({
														"driverNumber": xeSanSang[0].ID
													});
													return;
												}
											});
										}
									});
} else {
	temp++;
}
}
},5000);
}
if((temp==xe.length) && (xeSanSang.length>=10)){
	xeSanSang.sort(function(a,b){
		return a.distance-b.distance;
	});
	for(j=0;j<10; j++){
		addMarker(xeSanSang[j].LocationCar, xeSanSang[j].desAddresses, xeSanSang[j].ID);
	}
	console.log(xeSanSang);
	database.ref("book-list/").orderByChild("phoneNumber").on("child_added", function(data) {
		if(data.val().phoneNumber == phone) {
			var update_table = "book-list/" + data.key + "/";
			database.ref(update_table).update({
				"driverNumber": xeSanSang[0].ID
			});
			return;
		}
	});
}
});
} else {
	temp++;
}
if(choice==1){
	break;
}
}
});



$("#hoan-thanh").click(function(){
	if(zxz==0){
		alert("Vui lòng định vị trước");
	}else{
		if(phone==null){
			alert("Vui lòng định vị lại");
		}
		if((phone!=null)&&((inforCustomer.state=='chưa định vị')||(inforCustomer.state=='bị từ chối'))){
			console.log("aaa");
			database.ref("book-list/").orderByChild("phoneNumber").on("child_added", function(data) {
				if(data.val().phoneNumber == phone) {
					var update_table = "book-list/" + data.key + "/";
					database.ref(update_table).update({
						"state": "đã định vị"
					});
					return;
				}
			});
		}
		if((phone==null)&&(inforCustomer.state=='bị từ chối')){
			alert("Vui lòng định vị lại");
		}
	}
	$("#btn-app-control").css("display", "none");
	initMap();
});

});
