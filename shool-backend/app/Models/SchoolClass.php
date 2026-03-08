<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    protected $fillable = ['name', 'level', 'capacity', 'teacher_id'];

    public function teacher() { return $this->belongsTo(Teacher::class); }
    public function students() { return $this->hasMany(Student::class); }
    public function schedules() { return $this->hasMany(Schedule::class); }
}