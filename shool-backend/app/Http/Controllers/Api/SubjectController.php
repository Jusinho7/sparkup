<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index()
    {
        return response()->json(Subject::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string',
            'code'        => 'required|string|unique:subjects',
            'coefficient' => 'integer|min:1',
        ]);

        return response()->json(Subject::create($request->all()), 201);
    }

    public function show(Subject $subject)
    {
        return response()->json($subject->load('schedules'));
    }

    public function update(Request $request, Subject $subject)
    {
        $subject->update($request->only('name', 'code', 'coefficient'));
        return response()->json($subject);
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();
        return response()->json(['message' => 'Matière supprimée.']);
    }
}