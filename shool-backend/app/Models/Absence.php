<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    protected $fillable = ['student_id', 'subject_id', 'date', 'justified', 'reason'];

    protected $casts = ['justified' => 'boolean', 'date' => 'date'];

    public function student() { return $this->belongsTo(Student::class); }
    public function subject() { return $this->belongsTo(Subject::class); }
}