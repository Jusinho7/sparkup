<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Absence;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{
    public function index(Request $request)
    {
        $query = Absence::with('student.user', 'subject');

        if ($request->student_id) $query->where('student_id', $request->student_id);
        if ($request->date)       $query->where('date', $request->date);

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'nullable|exists:subjects,id',
            'date'       => 'required|date',
            'justified'  => 'boolean',
            'reason'     => 'nullable|string',
        ]);

        $absence = Absence::create($request->all());
        return response()->json($absence->load('student.user', 'subject'), 201);
    }

    public function update(Request $request, Absence $absence)
    {
        $absence->update($request->only('justified', 'reason'));
        return response()->json($absence->load('student.user', 'subject'));
    }

    public function destroy(Absence $absence)
    {
        $absence->delete();
        return response()->json(['message' => 'Absence supprimée.']);
    }

    public function show(Absence $absence)
    {
        return response()->json($absence->load('student.user', 'subject'));
    }
}