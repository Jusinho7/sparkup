<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['user_id', 'school_class_id', 'parent_id', 'birth_date', 'phone'];

    public function user() { return $this->belongsTo(User::class); }
    public function schoolClass() { return $this->belongsTo(SchoolClass::class); }
    public function parent() { return $this->belongsTo(User::class, 'parent_id'); }
    public function grades() { return $this->hasMany(Grade::class); }
    public function absences() { return $this->hasMany(Absence::class); }
}