<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('letter_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(); // Siapa yang mengajukan
            $table->string('letter_type'); // Domisili, SKTM, Pengantar, dll
            $table->text('purpose'); // Keperluan
            $table->enum('status', ['pending', 'approved_rt', 'approved_rw', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable(); // Catatan dari RT/RW
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('letter_requests');
    }
};
