'use strict';


var genderChoice = '';
var i = 0;



//gender choice
$('.gender-choice a').on('click', function() {
    genderChoice = $(this).data('gender');
    $('.intro').hide();
    $('.profiles').show(1000);
    pullData(i);
});


var pullData = function(i) {

    $.getJSON("aa/database.json", function(data) {
        //pull name data and inject into html
        var dataGender = data.results[i].user.gender;


        if (dataGender === genderChoice) {

            alert(i);

            var dataNames = data.results[i].user.name.first + ' ' + data.results[i].user.name.last;
            var dataPics = data.results[i].user.picture.large;

            $('.profiles__holder ul').append('<li><img src="' + dataPics + '" alt="' + dataNames + '" /><div class="profile__info">' + dataNames + '</div></li>');
        }

    });
    alert(genderChoice);
    i++;
    alert(i);
}





//approve or decline profile
$('.profiles__btns a').on('click', function() {
    var hookupChoice = $(this).data('choice');
    var dataImage = $('.profiles__holder ul li');
    i++;
    pullData(i);


    (hookupChoice === 'decline') ? dataImage.addClass('bounceOutLeft animated'): dataImage.addClass('bounceOutRight animated');

});