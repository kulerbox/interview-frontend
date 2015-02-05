'use strict';

(function() {

    var genderChoice = '';

    $('.gender-choice a').on('click', function() {
        var genderChoice = $(this).data('gender');
        $('.intro').hide();
        $('.profiles').show(1000);
        console.log('gender' + genderChoice);


        $.getJSON("http://localhost:9000/aa/database.json", function(data) {

            //pull name data and inject into html
            for (var i = 0; i < data.results.length; i++) {
                var dataGender = data.results[i].user.gender;


                if (dataGender === genderChoice) {

                    var dataNames = data.results[i].user.name.first + ' ' + data.results[i].user.name.last;
                    var dataPics = data.results[i].user.picture.large;

                    $('.profiles__holder ul').append('<li><img src="' + dataPics + '" alt="' + dataNames + '" /><div class="profile__info">' + dataNames + '</div></li>');
                }

            }
        });

    });

    $('.profiles_btns a').on('click', function() {
        var hookupChoice = $(this).data('choice');

        (hookupChoice === 'decline') ? $(this).addClass('bounceOutLeft animated') : $(this).addClass('bounceOutRight animated');
    });

})();
