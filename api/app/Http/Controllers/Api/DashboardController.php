<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Household;

class DashboardController extends Controller
{
    public function summary()
    {
        $totalKeluarga = Household::count();
        $totalWarga = $totalKeluarga * 3; // Asumsi rata-rata 3 orang per KK

        return response()->json([
            'total_keluarga' => $totalKeluarga,
            'total_warga' => $totalWarga,
            'total_surat' => 124, // Dummy data untuk tampilan
            'chart_data' => [
                ['name' => 'Jan', 'warga' => 120],
                ['name' => 'Feb', 'warga' => 150],
                ['name' => 'Mar', 'warga' => 180],
                ['name' => 'Apr', 'warga' => 170],
                ['name' => 'Mei', 'warga' => 210],
                ['name' => 'Jun', 'warga' => 250],
                ['name' => 'Jul', 'warga' => 280],
            ],
            'recent_activities' => [
                ['id' => 1, 'type' => 'kk', 'title' => 'Pendataan KK Baru', 'desc' => 'Bpk. Budi (Blok A/12)', 'time' => '10 menit lalu'],
                ['id' => 2, 'type' => 'surat', 'title' => 'Pengajuan Surat Domisili', 'desc' => 'Ibu Siti (Blok C/04)', 'time' => '2 jam lalu'],
                ['id' => 3, 'type' => 'kk', 'title' => 'Verifikasi KK Selesai', 'desc' => 'Bpk. Andi (Blok B/03)', 'time' => '5 jam lalu'],
            ]
        ]);
    }
}
