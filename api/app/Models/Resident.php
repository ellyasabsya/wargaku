<?php
namespace App\Models;
use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
class Resident extends Model {
    use BelongsToTenant;
    protected $fillable = ['tenant_id', 'household_id', 'nik', 'name', 'relation'];
}
