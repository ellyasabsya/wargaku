<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HouseholdController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\OcrController;
use App\Http\Controllers\Api\LetterController;
use App\Http\Controllers\Api\DueController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Middleware\ResolveTenant;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', ResolveTenant::class])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Profil
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::put('/profile/password', [ProfileController::class, 'updatePassword']);

    Route::get('/dashboard', [DashboardController::class, 'summary']);
    Route::apiResource('households', HouseholdController::class);
    Route::post('/ocr/scan', [OcrController::class, 'scan']);
    Route::apiResource('letters', LetterController::class);
    Route::put('/letters/{letter}/status', [LetterController::class, 'updateStatus']);
    Route::get('/letters/{letter}/pdf', [LetterController::class, 'downloadPdf']);
    
    Route::apiResource('dues', DueController::class);
    Route::put('/dues/{bill}/pay', [DueController::class, 'pay']);
});
