<?php

namespace App\Models;

use App\Models\Concerns\BelongsToTenant;
use App\Models\Concerns\BelongsToTenantHousehold;
use Illuminate\Database\Eloquent\Model;

class ResidentDocument extends Model
{
    use BelongsToTenant, BelongsToTenantHousehold;

    protected $fillable = [
        'tenant_id',
        'household_id',
        'type',
        'file_path',
        'ocr_result',
        'status',
    ];

    protected $casts = [
        'ocr_result' => 'array',
    ];
}
