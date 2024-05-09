<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailServer extends Mailable
{
    use Queueable, SerializesModels;
    // $mode = 1;  Send to External user for new Signal
    // $mode = 2;  Send email to user from system (redirect email)

    public $theme;
    public $sender;
    public $recipient;
    public $text;
    public $mode;

    public function __construct($theme, $sender, $recipient, $text, $mode)
    {
        $this->theme = $theme;
        $this->sender = $sender;
        $this->recipient = $recipient;
        $this->text = $text;
        $this->mode = $mode;
    }

    public function build()
    {

        switch ($this->mode) {
            case 1:
                return $this->subject($this->theme)
                    ->from($this->sender)
                    ->view('emails.sendToExternalUser');
                break;
            case 2:
                return $this->subject($this->theme)
                    ->from($this->sender)
                    ->view('emails.sendToUser');

                break;
            default:
                break;
        }
    }
}
