<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware('guest')->group(function () {

    Route::inertia('/login', 'auth/login')
        ->name('login');

    Route::inertia('/register', 'auth/register')
        ->name('register');

    Route::inertia('/forgot-password', 'auth/forgot-password')
        ->name('password.request');

    Route::get('/reset-password/{token}', function (string $token) {
        return Inertia::render('auth/reset-password', [
            'token' => $token,
            'email' => request()->query('email', ''),
        ]);
    })->name('password.reset');
});


// Protected routes
Route::middleware('auth')->group(function () {
    Route::resource('dashboard', DashboardController::class);
});


