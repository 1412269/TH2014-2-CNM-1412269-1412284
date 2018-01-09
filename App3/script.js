var phone;

var typeCar;

var carNumber;

$(function(){
	var address;
	var rowSelected = null;
	$("#data-table").on("click", "#table tr[id='data-row']", function(){
		rowSelected = $(this);
		$(this).addClass("selected").siblings().removeClass("selected");
		address = $(this).find("td:eq(0)").text();
		phone = $(this).find("td:eq(1)").text();
		typeCar = $(this).find("td:eq(2)").text();
		if($(this).find("td:eq(3)").text()=='đã có xe nhận'){
			carNumber = $(this).find("td:eq(4)").text();
			$("#btn-app-control").css("display", "inline");
		} else {
			$("#btn-app-control").css("display", "none");
		}
	});
	$(window).click(function(e){
		if($("#body-content").has(event.target).length == 0 && !$("#body-content").is(event.target)){
			$("#btn-app-control").css("display", "none");
			if(rowSelected != null){
				rowSelected.removeClass("selected");
			}
		}
	});

	$("#xem-dd-min").click(function(){
		initMap();
		geocodeAddress(geocoder, address, map);

		database.ref("cars/").orderByChild("ID").on("child_added", function(data) {
			if(data.val().ID == carNumber) {
				addMarker(data.val().LocationCar, data.val().ID, data.val().Type);
			}
		});

	});

});
