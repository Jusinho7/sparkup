<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    public function index()
    {
        return response()->json(
            Student::with('user', 'schoolClass')->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'            => 'required|string',
            'email'           => 'required|email|unique:users',
            'password'        => 'required|min:6',
            'school_class_id' => 'nullable|exists:school_classes,id',
            'parent_id'       => 'nullable|exists:users,id',
            'birth_date'      => 'nullable|date',
            'phone'           => 'nullable|string',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'student',
        ]);

        $student = Student::create([
            'user_id'         => $user->id,
            'school_class_id' => $request->school_class_id,
            'parent_id'       => $request->parent_id,
            'birth_date'      => $request->birth_date,
            'phone'           => $request->phone,
        ]);

        return response()->json($student->load('user', 'schoolClass'), 201);
    }

    public function show(Student $student)
    {
        return response()->json(
            $student->load('user', 'schoolClass', 'grades.subject', 'absences.subject')
        );
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'school_class_id' => 'nullable|exists:school_classes,id',
            'birth_date'      => 'nullable|date',
            'phone'           => 'nullable|string',
        ]);

        $student->update($request->only('school_class_id', 'birth_date', 'phone'));

        if ($request->name) {
            $student->user->update(['name' => $request->name]);
        }

        return response()->json($student->load('user', 'schoolClass'));
    }

    public function destroy(Student $student)
    {
        $student->user->delete();
        return response()->json(['message' => 'Élève supprimé.']);
    }
}