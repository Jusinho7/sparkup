<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = ['user_id', 'phone', 'specialty'];

    public function user() { return $this->belongsTo(User::class); }
    public function schoolClasses() { return $this->hasMany(SchoolClass::class); }
    public function grades() { return $this->hasMany(Grade::class); }
    public function schedules() { return $this->hasMany(Schedule::class); }
}