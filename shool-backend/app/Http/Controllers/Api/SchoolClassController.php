<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SchoolClass;
use Illuminate\Http\Request;

class SchoolClassController extends Controller
{
    public function index()
    {
        return response()->json(
            SchoolClass::with('teacher.user', 'students.user')->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'       => 'required|string',
            'level'      => 'required|string',
            'capacity'   => 'integer|min:1',
            'teacher_id' => 'nullable|exists:teachers,id',
        ]);

        $class = SchoolClass::create($request->all());
        return response()->json($class->load('teacher.user'), 201);
    }

    public function show(SchoolClass $schoolClass)
    {
        return response()->json(
            $schoolClass->load('teacher.user', 'students.user', 'schedules.subject')
        );
    }

    public function update(Request $request, SchoolClass $schoolClass)
    {
        $schoolClass->update($request->only('name', 'level', 'capacity', 'teacher_id'));
        return response()->json($schoolClass->load('teacher.user'));
    }

    public function destroy(SchoolClass $schoolClass)
    {
        $schoolClass->delete();
        return response()->json(['message' => 'Classe supprimée.']);
    }
}