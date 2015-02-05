'use strict';

(function() {

    var genderChoice = '';
    var dataArray = [];
    var dataPics = ';'

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
                    dataPics = data.results[i].user.picture.large;
                    dataArray = [i];
                    console.log(dataArray);

                }



            }

            for( var i = 0; i < dataArray.length; i++) {
                    console.log('ff' + dataArray.length);
                    $('.profiles__holder ul').append('<li><img src="' + dataPics + '" alt="' + dataArray[i] + '" /><div class="profile__info">' + dataArray[i]  + '</div></li>');
                }
        });



    });

    $('.profiles_btns a').on('click', function() {
        var hookupChoice = $(this).data('choice');

        (hookupChoice === 'decline') ? $(this).addClass('bounceOutLeft animated') : $(this).addClass('bounceOutRight animated');
    });

})();
