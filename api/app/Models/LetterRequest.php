<?php
namespace App\Models;
use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class LetterRequest extends Model {
    use BelongsToTenant;
    protected $fillable = ['tenant_id', 'user_id', 'letter_type', 'purpose', 'status', 'admin_notes'];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
}
