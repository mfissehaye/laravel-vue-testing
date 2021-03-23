<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MainMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $content;
    protected $receivers;
    protected $sub;
    protected $files;

    /**
     * Create a new message instance.
     *
     * @param $message
     * @param $attachments
     */
    public function __construct($message, $attachments)
    {
        $this->content = $message;
        $this->files = $attachments;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build(): MainMail
    {
        $mail = $this->view('mails.main', ['content' => $this->content]);

        if ($this->files != null) {
            for ($i = 0; $i < count($this->files); $i++) {
                $mail->attach($this->files[$i]);
            }
        }

        return $mail;
    }
}
