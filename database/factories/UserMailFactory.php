<?php

/** @var Factory $factory */

use App\UserMail;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(UserMail::class, function (Faker $faker) {
    return [
        'to' => join(',', ([$faker->email, $faker->email])),
        'subject' => $faker->sentence,
        'message' => $faker->paragraph
    ];
});
