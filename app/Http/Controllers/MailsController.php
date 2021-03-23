<?php

namespace App\Http\Controllers;

use App\Mail\MainMail;
use App\UserMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class MailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(UserMail::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $mail = new UserMail;
        $mail->to = $request->get('to');
        $receivers = explode(',', $mail->to);
        $mail->subject = $request->get('subject');
        $mail->message = $request->get('message');
        $attachments = $request->get('files');

        $mail->save();

        // Try to send email here
        Mail::to($receivers)
            ->queue(new MainMail(
                $mail->message,
                $attachments));

        return response()->json([], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function show(Request $request, $id): JsonResponse
    {
        return response()->json(UserMail::find($id));
    }

    public function singleMail($id): Response
    {
        $mail = UserMail::find($id);
        return response()->view('single-mail', ['mail' => $mail]);
    }
}
