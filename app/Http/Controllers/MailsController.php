<?php

namespace App\Http\Controllers;

use App\UserMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
        $mail->subject = $request->get('subject');
        $mail->message = $request->get('message');

        $mail->save();
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
}
