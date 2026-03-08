<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\Api\SchoolClassController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\GradeController;
use App\Http\Controllers\Api\AbsenceController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\MessageController;

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Ressources
    Route::apiResource('students',      StudentController::class);
    Route::apiResource('teachers',      TeacherController::class);
    Route::apiResource('classes',       SchoolClassController::class);
    Route::apiResource('subjects',      SubjectController::class);
    Route::apiResource('grades',        GradeController::class);
    Route::apiResource('absences',      AbsenceController::class);
    Route::apiResource('schedules',     ScheduleController::class);
    Route::apiResource('messages',      MessageController::class);

    // Routes supplémentaires messages
    Route::get('/messages/conversation/{userId}', [MessageController::class, 'conversation']);
    Route::put('/messages/read/{userId}',         [MessageController::class, 'markAsRead']);
});