<?php

namespace Tests\Feature;

use App\UserMail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MailsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testUserCanCreateMail()
    {
        $mail = factory(UserMail::class)->raw();
        $response = $this->post('/api/v1/mails', $mail);

        $response->assertStatus(201);
        $this->assertDatabaseHas('user_mails', $mail);
    }

    public function testUserCanFetchMails()
    {
        $mails = factory(UserMail::class, 2)->create();
        $response = $this->get('/api/v1/mails');

        $response->assertStatus(200);
        $response->assertSee($mails[0]->subject);
    }

    public function testUserCanGetSingleMail()
    {
        $mail = factory(UserMail::class)->create();
        $response = $this->get("/api/v1/mails/{$mail->id}");
        $response->assertStatus(200);
        $response->assertSee($mail->subject);
    }
}
