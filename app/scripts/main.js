'use strict';

(function($) {

    var j = 1;

    //user gender decide on click
    $('.gender-choice a').on('click', function() {

        //grab gneder from data attr and store
        var genderChoice = $(this).data('gender');

        //hide and show next screens
        $('.intro').hide();
        $('.profiles').show(1000);
        //console.log('gender' + genderChoice);


        $.getJSON('http://localhost:9000/aa/database.json', function(data) {

            //pull name data and inject into html
            for (var i = 0; i < data.results.length; i++) {

                //grab profile gender from json data
                var dataGender = data.results[i].user.gender;

                //check what gender user has chosen and only show those results
                if (dataGender === genderChoice) {


                    var dataNames = data.results[i].user.name.first + ' ' + data.results[i].user.name.last;
                    var dataPics = data.results[i].user.picture.large;

                    //inject profiles into html
                    $('.profiles__holder ul').append('<li><img src="' + dataPics + '" class="img-responsive profile" alt="' + dataNames + '" /><div class="profile__info">' + dataNames + '</div></li>');

                }

            }
        });

        return false;

    });

    //approve or decline profile
    $('.profiles__btns a').on('click', function() {

        var hookupChoice = $(this).data('choice');
        var dataImage = $('.profiles__holder ul li:nth-last-child(' + (j) + ')');
        var counter = $('ul').children().length;

        //add animations to declined and approved profiles
        if (hookupChoice === 'decline') {
            //add declined badge
            dataImage.prepend('<img src="images/nope-badge.png" class="app-badge">');
            dataImage.addClass('bounceOutLeft animated');
            j++;
            console.log('de' + j);

        } else {
            //add approved badge
            dataImage.prepend('<img src="images/yip-badge.png" class="app-badge">');
            //dataImage.prepend('<a href="#" class="btn btn-success btn-profile btn-block btn-lg">View Users Profiles</a>');
            dataImage.addClass('bounceOutRight animated');
            j++;
            console.log('ap' + j);
        }

        //check to see if all profiles have been viewed, if so then throw error msg
        if (j > counter) {
           $('.place__holder ul, .profiles__btns').hide();
           $('.completed').show();
        }
        return false;
    });

})(jQuery);
