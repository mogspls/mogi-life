<?php

use App\Http\Controllers\ChatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


Route::inertia('/', 'welcome')->name('home');
Route::get('/chat/messages', [ChatController::class, 'index'])->name('chat.messages.index');
Route::post('/chat/messages', [ChatController::class, 'store'])->middleware(['auth', 'throttle:30,1'])->name('chat.messages.store');

Route::middleware('guest')->group(function () {

    Route::get('/login', function (Request $request) {
        return Inertia::render('auth/login', [
            'status' => $request->session()->get('status'),
        ]);
    })->name('login');

    Route::inertia('/register', 'auth/register')
        ->name('register');

    Route::get('/forgot-password', function (Request $request) {
        return Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    })->name('password.request');

    Route::get('/reset-password/{token}', function (
        Request $request,
        string $token
    ) {
        return Inertia::render('auth/reset-password', [
            'token' => $token,
            'email' => $request->query('email', ''),
        ]);
    })->name('password.reset');
});


// Protected routes
Route::middleware('auth')->group(function () {
    // Route::resource('dashboard', DashboardController::class);
    Route::get('/feed', function () {
        return Inertia::render('dashboard', [
            'user' => Auth::user(),
        ]);
    });

    Route::get('/chat/messages', [ChatController::class, 'index'])
        ->name('chat.messages.index');

    Route::post('/chat/messages', [ChatController::class, 'store'])
        ->middleware('throttle:30,1')
        ->name('chat.messages.store');
});
