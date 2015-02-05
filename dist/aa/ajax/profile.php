<?php

/**
 * Database of random users by https://randomuser.me/
 */

$db = file_get_contents('../database.json');

$profiles = json_decode($db);

$email = $_POST['email'];

$profile_to_view = null;

foreach($profiles->results as $profile){

    if($profile->user->email == $email){
        $profile_to_view = $profile;
    }

}

echo json_encode($profile_to_view);