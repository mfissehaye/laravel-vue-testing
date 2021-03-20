<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="{{ mix('css/app.css') }}">

    <title>Mini Send</title>
</head>
<body>
<div id="app">
    <app-header></app-header>

    <div class="container mt-5">
        @yield('content')
    </div>

    <app-footer></app-footer>
</div>
</body>

<script src="{{ mix('/js/app.js') }}"></script>
</html>
