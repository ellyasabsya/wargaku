<?php
namespace App\Models;
use App\Models\Concerns\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class DueBill extends Model {
    use BelongsToTenant;
    
    // KITA KUNCI NAMA TABELNYA DI SINI AGAR TIDAK SALAH LAGI
    protected $table = 'dues_bills'; 
    
    protected $fillable = ['tenant_id', 'user_id', 'month', 'year', 'amount', 'status', 'paid_at'];
    
    public function user() {
        return $this->belongsTo(User::class);
    }
}
