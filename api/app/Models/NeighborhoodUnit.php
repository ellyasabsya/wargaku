<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NeighborhoodUnit extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id',
        'type',
        'number',
        'parent_id',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
