<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tabel Warga Individu
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('household_id')->constrained()->cascadeOnDelete();
            $table->string('nik', 16)->nullable();
            $table->string('name');
            $table->string('relation')->default('anggota'); // kepala, istri, anak, dll
            $table->timestamps();
        });

        // Tabel Dokumen & OCR
        Schema::create('resident_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('household_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('type'); // kk, ktp
            $table->string('file_path')->nullable();
            $table->json('ocr_result')->nullable(); // Menyimpan hasil AI
            $table->enum('status', ['pending', 'scanned', 'verified'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resident_documents');
        Schema::dropIfExists('residents');
    }
};
