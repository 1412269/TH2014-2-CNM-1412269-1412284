var config = {
    apiKey: "AIzaSyCtXcuOUw97zE4Ry-YKl3MP62Ugag5udVw",
    authDomain: "uber-dac16.firebaseapp.com",
    databaseURL: "https://uber-dac16.firebaseio.com",
    projectId: "uber-dac16",
    storageBucket: "",
    messagingSenderId: "978750955877"
};
firebase.initializeApp(config);
var database = firebase.database();
var defaultDatabaseRef = database.ref();
function writeUserData(name) {
    firebase.database().ref('Users/').set({
        username: name
    });
}
function writeOneDriver(_id,_phoneNumber,_address,_name) {

    console.log("entry");
    // A post entry.
    var playersRef =  firebase.database().ref("driver-list");
    playersRef.push ({
        ID: _id,
        driverPhone: _phoneNumber,
        driverAddress: _address,
        driverName: _name
    });
}


var result1;
function data(str1,str2) {
    str1 += str2;

}
var datatable = firebase.database().ref('HistoryUser/');

datatable.on("value", function(snapshot) {
    var result = '<table class="table table-fixed">' +

                    '<tbody>';
    console.log(snapshot.val());
    for(i in snapshot.val()) {
        console.log(i.name);
        result += '<tr>' +
                    '<td class="col-xs-1">' + "STT"+ '</td>' +
                    '<td class="col-xs-2">' + snapshot.val()[i].name + '</td>' +
                    '<td class="col-xs-2">' + snapshot.val()[i].phone + '</td>' +
                    '<td class="col-xs-2">' + snapshot.val()[i].location + '</td>' +
                    '<td class="col-xs-2">' + snapshot.val()[i].type + '</td>' +
                    '<td class="col-xs-2">' + snapshot.val()[i].note + '</td>' +
                    '</tr>';
        data(result1,result);
    }
    result += '</tbody>' +
        '</table>';
    $(function () {
        auth.currentUser.link(credential).then(function(user) {
            console.log("Anonymous account successfully upgraded", user);
            $('#signin1').hide();
            $('#book-car').show();
            //$('#table1').html(result);
        }, function(error) {

            console.log("Error upgrading anonymous account", error);
        });
    });

}, function (error) {
    console.log("Error: " + error.code);
});

$(function () {
    //$('#signin1').hide();
    $('#book').click(function () {
        //alert(result1);
     //    writeOneDriver(0,"01649209301","Đường số 8, Linh Trung, Thủ Đức, Linh Trung, Việt Nam","Le Van A");
	// writeOneDriver(1,"01633909021","2 Lê Văn Chí, Linh Trung, Hồ Chí Minh, Việt Nam","Đoàn Huệ");
	// writeOneDriver(2,"01660902930","so 9, Xa lộ Hà Nội, Hiệp Phú, Quận 9, Hồ Chí Minh, Việt Nam","Lê Thị Ý Nhi");
	// writeOneDriver(3,"01679892392","48 Lê Văn Chí, Linh Trung, Thủ Đức, Hồ Chí Minh, Việt Nam","Cao Ý Ly");
	// writeOneDriver(4,"01689203909","Suối Tiên - Biển Tiên Đồng - Ngọc Nữ","Nguyễn Thanh Long");
	// writeOneDriver(5,"01690023345","Trường Đại học Công nghệ Thông tin","Miu Lê");
	// writeOneDriver(6,"01664342321","Trường Đại học Khoa học Xã hội và Nhân văn (cơ sở 2)- Đại học Quốc gia TP. HCM","Vương Anh Tú");
	// writeOneDriver(7,"01689090900","Trung tâm Huấn luyện Thể Thao Quốc Gia II","Nguyễn Công Thành");
	// writeOneDriver(8,"09989822324","Thư viện Trung tâm ĐHQG - HCM","Nguyễn Thanh Hà");
	// writeOneDriver(9,"09528502814","Trường đại học Nông Lâm Thành phố Hồ Chí Minh","Lê Thị Mai Anh");
     //    writeOneDriver(10,"01249276301","Đường số 9, Linh Trung, Thủ Đức, Linh Trung, Việt Nam","Le Van liem");
     //    writeOneDriver(11,"01633909081","9 Lê Văn Chí, Linh Trung, Hồ Chí Minh, Việt Nam","Thanh Thảo");
     //    writeOneDriver(12,"01660902965","so 12, Xa lộ Hà Nội, Hiệp Phú, Quận 9, Hồ Chí Minh, Việt Nam","Lê Thị Ngọc Huyền");
     //    writeOneDriver(13,"01679892332","89 Lê Văn Chí, Linh Trung, Thủ Đức, Hồ Chí Minh, Việt Nam","Lê Văn Toàn");
     //    writeOneDriver(14,"01289265909","Suối Tiên - Biển Tiên Đồng - Ngọc Nữ","Đặng Bá Minh");
     //    writeOneDriver(15,"01690023345","Trường Đại học Công nghệ Thông tin","Phan Hiếu Nghĩa");
     //    writeOneDriver(16,"01664347321","Trường Đại học Khoa học Xã hội và Nhân văn (cơ sở 2)- Đại học Quốc gia TP. HCM","Vương Văn Tú");
     //    writeOneDriver(17,"01679790900","Trung tâm Huấn luyện Thể Thao Quốc Gia II","Nguyễn An");
     //    writeOneDriver(18,"09989802324","Thư viện Trung tâm ĐHQG - HCM","Nguyễn Thanh Thúy");
     //    writeOneDriver(19,"09528534814","Trường đại học Nông Lâm Thành phố Hồ Chí Minh","Lê Thị Thanh");
     //    writeOneDriver(20,"016492096587","Đường số 7, Linh Trung, Thủ Đức, Linh Trung, Việt Nam","Le Van Tam");
     //    writeOneDriver(21,"01633909016","10 Lê Văn Chí, Linh Trung, Hồ Chí Minh, Việt Nam","Thanh Hải");
     //    writeOneDriver(22,"01260902750","so 10, Xa lộ Hà Nội, Hiệp Phú, Quận 9, Hồ Chí Minh, Việt Nam","Lê Thị Ngọc Linh");
     //    writeOneDriver(23,"01679892782","50 Lê Văn Chí, Linh Trung, Thủ Đức, Hồ Chí Minh, Việt Nam","Lê Văn Năm");
     //    writeOneDriver(24,"01689203977","Suối Tiên - Biển Tiên Đồng - Ngọc Nữ","Đặng Thành");
     //    writeOneDriver(25,"01690023875","Trường Đại học Công nghệ Thông tin","Phan Trí Hải");
     //    writeOneDriver(26,"01664348561","Trường Đại học Khoa học Xã hội và Nhân văn (cơ sở 2)- Đại học Quốc gia TP. HCM","Vương Văn Long");
     //    writeOneDriver(27,"05689090910","Trung tâm Huấn luyện Thể Thao Quốc Gia II","Nguyễn Dương");
     //    writeOneDriver(28,"09989822324","Thư viện Trung tâm ĐHQG - HCM","Nguyễn Thanh Na");
     //    writeOneDriver(29,"09528502814","Trường đại học Nông Lâm Thành phố Hồ Chí Minh","Lê Thị Bích");
     //    writeOneDriver(30,"01249209301","Đường số 8, Linh Trung, Thủ Đức, Linh Trung, Việt Nam","Le Van B");
     //    writeOneDriver(31,"01233909021","2 Lê Văn Chí, Linh Trung, Hồ Chí Minh, Việt Nam","Đoàn Toàn");
     //    writeOneDriver(32,"01260902930","so 9, Xa lộ Hà Nội, Hiệp Phú, Quận 9, Hồ Chí Minh, Việt Nam","Lê Thị Tiến");
     //    writeOneDriver(33,"01279892392","48 Lê Văn Chí, Linh Trung, Thủ Đức, Hồ Chí Minh, Việt Nam","Trần Văn Trung");
     //    writeOneDriver(34,"01289203909","Suối Tiên - Biển Tiên Đồng - Ngọc Nữ","Nguyễn Thanh Long");
     //    writeOneDriver(35,"01290023345","Trường Đại học Công nghệ Thông tin","Miu Lê");
     //    writeOneDriver(36,"01264342321","Trường Đại học Khoa học Xã hội và Nhân văn (cơ sở 2)- Đại học Quốc gia TP. HCM","Vương Anh Kha");
     //    writeOneDriver(37,"01289090900","Trung tâm Huấn luyện Thể Thao Quốc Gia II","Nguyễn Công Tâm");
     //    writeOneDriver(38,"09989822324","Thư viện Trung tâm ĐHQG - HCM","Nguyễn Thanh Kiệt");
     //    writeOneDriver(39,"09528502814","Trường đại học Nông Lâm Thành phố Hồ Chí Minh","Lê Thị Huyền");
     //    writeOneDriver(40,"01249209301","Đường số 8, Linh Trung, Thủ Đức, Linh Trung, Việt Nam","Le Văn Năm");
     //    writeOneDriver(41,"01233909021","2 Lê Văn Chí, Linh Trung, Hồ Chí Minh, Việt Nam","Đoàn Huệ");
        writeOneDriver(42,"01260902930","so 9, Xa lộ Hà Nội, Hiệp Phú, Quận 9, Hồ Chí Minh, Việt Nam","Lê Thị Ý Nhi");
        writeOneDriver(43,"01279892392","48 Lê Văn Chí, Linh Trung, Thủ Đức, Hồ Chí Minh, Việt Nam","Cao Quốc Đại");
        writeOneDriver(44,"01289203909","Suối Tiên - Biển Tiên Đồng - Ngọc Nữ","Nguyễn Thanh Linh");
        writeOneDriver(45,"01290023345","Trường Đại học Công nghệ Thông tin","Trần Khải");
        writeOneDriver(46,"01264342321","Trường Đại học Khoa học Xã hội và Nhân văn (cơ sở 2)- Đại học Quốc gia TP. HCM","Vương Hoàng Long");
        writeOneDriver(47,"01289090900","Trung tâm Huấn luyện Thể Thao Quốc Gia II","Nguyễn Trung Kiên");
        writeOneDriver(48,"09989822324","Thư viện Trung tâm ĐHQG - HCM","Nguyễn Thanh Hà");
        writeOneDriver(49,"09528502814","Trường đại học Nông Lâm Thành phố Hồ Chí Minh","Lê Thị Quang");
        writeOneDriver(50,"09989822324","Thư viện Trung tâm ĐHQG - HCM","Nguyễn Thanh Hoa");
        writeOneDriver(51,"09528502814","Trường đại học Nông Lâm Thành phố Hồ Chí Minh","Lê Thị Dào");
        // for (i = 52; i < 60; i++){
        //     var ID = i;
        //     var Type = i%2;
        //     var State  = 0;
        //     var a = 10.793004 - 0.0000078*176*(i%10);
        //     var b  =  106.702591 - 0.00000025*287*(i%10);
        //     var LocationCar = {
        //         'lat':a,
        //         'lng':b
        //     };
        //     var carRef =  firebase.database().ref("cars/");
        //     carRef.push ({
        //         ID: ID,
        //         Type:Type,
        //         LocationCar: LocationCar,
        //         State:State
        //     });
        //     alert(i);
        //
        // }
        var name = $('#name').val();
        var phone = $('#phone').val();
        var location = $('#location').val();
        var note = $('#note').val();
        var type = $('#type').val();
        // alert(name);
        // writeUserData(name);
        var d = new Date();
        var n = d.getTime();
        var time = n;
        var playersRef =  firebase.database().ref("HistoryUser/");
        playersRef.push ({
            name: name,
            phone:phone,
            type:type,
            location:location,
            state:"Chưa tìm được xe",
            note:note,
            time:time


        });
        $('#book-car').show();
        $('#signin1').hide();

        playersRef.orderByChild("name").on("child_added", function(data) {

            if (data.val().name == "kiet"){

            } else
            {
                console.log(data.val().name);
            }
        });
    });
});
