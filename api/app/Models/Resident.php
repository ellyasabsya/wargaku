<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\Concerns\BelongsToTenantHousehold;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use BelongsToTenant, BelongsToTenantHousehold;

    protected $fillable = [
        'tenant_id',
        'household_id',
        'nik',
        'name',
        'relation',
    ];
}
