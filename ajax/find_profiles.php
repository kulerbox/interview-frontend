<?php

/**
 * Database of random users by https://randomuser.me/
 */

$db = file_get_contents('../database.json');

$profiles = json_decode($db);

$profile_count = count($profiles->results);

$random_matches = [
                    rand(0, $profile_count),
                    rand(0, $profile_count),
                    rand(0, $profile_count),
                    rand(0, $profile_count),
                    rand(0, $profile_count)
                ];

for($i = 0; $i < $profile_count; $i++){

    if(in_array($i, $random_matches)){
        $profiles->results[$i]->match = true;
    }else{
        $profiles->results[$i]->match = false;
    }

}

echo json_encode($profiles->results);