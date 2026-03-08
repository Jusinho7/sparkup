<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        $query = Grade::with('student.user', 'subject', 'teacher.user');

        if ($request->student_id) $query->where('student_id', $request->student_id);
        if ($request->subject_id) $query->where('subject_id', $request->subject_id);
        if ($request->period)     $query->where('period', $request->period);

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'teacher_id' => 'required|exists:teachers,id',
            'value'      => 'required|numeric|min:0|max:20',
            'period'     => 'required|string',
            'type'       => 'string|in:exam,quiz,homework',
            'comment'    => 'nullable|string',
        ]);

        $grade = Grade::create($request->all());
        return response()->json($grade->load('student.user', 'subject'), 201);
    }

    public function show(Grade $grade)
    {
        return response()->json($grade->load('student.user', 'subject', 'teacher.user'));
    }

    public function update(Request $request, Grade $grade)
    {
        $grade->update($request->only('value', 'period', 'type', 'comment'));
        return response()->json($grade->load('student.user', 'subject'));
    }

    public function destroy(Grade $grade)
    {
        $grade->delete();
        return response()->json(['message' => 'Note supprimée.']);
    }
}