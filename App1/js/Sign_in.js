var credential;
$(function(){
    //$('#book-car').hide();
    $('#Sign').click(function (e) {
       // $.get('C:\\Users\\hp\\Desktop\\cnm\\app1\Book.html', function (data, status) {
       //     $('#book-car').html(data);
       // })
        console.log("Button Sign in!");
        //alert("ok oktytuyiuoipoiuiuoipijuolkj,");
        var email =  $('#inputEmail').val();
        var password =  $('#inputPassword').val();

        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
            console.log("sucess!");
            credential = firebase.auth.EmailAuthProvider.credential(email, password);
            alert("sucess!");
           $('#signin1').hide();
            $('#book-car').show();
        }).catch(function(error) {
            // Handle Errors here.
            errorCode = error.code;
            var errorMessage = error.message;
            console.log("***errorCode:");
            console.log("***errorCode: "+ errorCode);
            $('#book-car').hide();
            $('#signin1').show();
        });
    });



    $('#Signout').click(function () {
        console.log("Button logout!");
        firebase.auth().signOut().then(function() {
            console.log("Logged out!");
            $('#book-car').hide();
            $('#signin1').show();
        }, function(error) {
            console.log(error.code);
            console.log(error.message);
        });
    });
});




