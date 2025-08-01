<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    Route::delete('/category-delete-by-selectetion', [CategoryController::class, 'deleteBySelection'])->name('category.deletebyselection');

    // Profile Routes
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'index')->name('profile.index');
        Route::put('/profile-update', 'updateProfile')->name('profile.update');
        Route::put('/profile-password-update', 'updatePassword')->name('profile.password.update');
        Route::delete('/profile/account-destroy', 'destroyAccount')->name('profile.account.destroy');
    });

    // Setting Routes
    Route::controller(SettingController::class)->as('settings.')->group(function () {
        Route::get('/settings', 'index')->name('index');

        // General Setting Routess
        Route::get('/settings/general-setting', 'generalSetting')->name('general.setting');
        Route::put('/settings/general-setting-update', 'updateGeneralSetting')->name('general.setting.update');

        // SMTP Setting Routes
        Route::get('/settings/smtp-setting', 'smtpSetting')->name('smtp.setting');
        Route::put('/settings/smtp-setting-update', 'updateSmtpSetting')->name('smtp.setting.update');
    });
});

require __DIR__.'/auth.php';
