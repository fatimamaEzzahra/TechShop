<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role_User extends Model
{
    use HasFactory;
    public function roles(){
        return $this->hasMany(Role_User::class);
    }
    public function users(){
        return $this->belongsToMany(Role_User::class);
    }
}
