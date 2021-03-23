@extends('layouts.app')

@section('content')
    <div class="mb-3">
        <a href="/" class="btn btn-primary btn-sm font-weight-bold">
            <unicon name="backward" fill="white" width="18" height="18"></unicon>
            <span class="ml-2">Back to Dashboard</span>
        </a>
    </div>
    <div>
        <strong>To:</strong> {{ $mail->to }}
    </div>

    <div>
        <strong>Subject: </strong> {{ $mail->subject }}
    </div>

    <div>
        <strong>Message: </strong> {{ $mail->message }}
    </div>
@endsection
