<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = ['name', 'code', 'coefficient'];

    public function grades() { return $this->hasMany(Grade::class); }
    public function schedules() { return $this->hasMany(Schedule::class); }
    public function absences() { return $this->hasMany(Absence::class); }
}