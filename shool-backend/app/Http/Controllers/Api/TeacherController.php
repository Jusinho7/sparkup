<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    public function index()
    {
        return response()->json(
            Teacher::with('user')->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required|string',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:6',
            'phone'     => 'nullable|string',
            'specialty' => 'nullable|string',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'teacher',
        ]);

        $teacher = Teacher::create([
            'user_id'   => $user->id,
            'phone'     => $request->phone,
            'specialty' => $request->specialty,
        ]);

        return response()->json($teacher->load('user'), 201);
    }

    public function show(Teacher $teacher)
    {
        return response()->json(
            $teacher->load('user', 'schoolClasses', 'schedules.subject', 'schedules.schoolClass')
        );
    }

    public function update(Request $request, Teacher $teacher)
    {
        $teacher->update($request->only('phone', 'specialty'));
        if ($request->name) $teacher->user->update(['name' => $request->name]);
        return response()->json($teacher->load('user'));
    }

    public function destroy(Teacher $teacher)
    {
        $teacher->user->delete();
        return response()->json(['message' => 'Professeur supprimé.']);
    }
}