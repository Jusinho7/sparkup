<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $query = Schedule::with('schoolClass', 'subject', 'teacher.user');

        if ($request->school_class_id) $query->where('school_class_id', $request->school_class_id);
        if ($request->teacher_id)      $query->where('teacher_id', $request->teacher_id);

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'school_class_id' => 'required|exists:school_classes,id',
            'subject_id'      => 'required|exists:subjects,id',
            'teacher_id'      => 'required|exists:teachers,id',
            'day'             => 'required|in:Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi',
            'start_time'      => 'required|date_format:H:i',
            'end_time'        => 'required|date_format:H:i|after:start_time',
            'room'            => 'nullable|string',
        ]);

        $schedule = Schedule::create($request->all());
        return response()->json($schedule->load('schoolClass', 'subject', 'teacher.user'), 201);
    }

    public function show(Schedule $schedule)
    {
        return response()->json($schedule->load('schoolClass', 'subject', 'teacher.user'));
    }

    public function update(Request $request, Schedule $schedule)
    {
        $schedule->update($request->only('day', 'start_time', 'end_time', 'room'));
        return response()->json($schedule->load('schoolClass', 'subject', 'teacher.user'));
    }

    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return response()->json(['message' => 'Créneau supprimé.']);
    }
}