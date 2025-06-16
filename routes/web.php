<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Pest\Plugins\Profile;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Category Routes
    Route::resource('/category', CategoryController::class)->except(['show']);
    Route::delete('/category-delete-by-selectetion', [CategoryController::class, 'deleteBySelection'])->name('category.deleteBySelectetion');

    // Profile Routes
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'index')->name('profile.index');
        Route::put('/profile-update', 'updateProfile')->name('profile.update');
        Route::put('/profile-password-update', 'updatePassword')->name('profile.password.update');
        Route::delete('/profile/account-destroy', 'deleteAccount')->name('profile.account.destroy');
    });
});

require __DIR__.'/auth.php';
