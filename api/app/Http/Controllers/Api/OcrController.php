<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OcrController extends Controller
{
    public function scan(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // Maksimal 5MB
        ]);

        // Simulasi proses AI (kita delay 2 detik agar animasi scanner terlihat)
        sleep(2);

        // Mengembalikan data palsu (seolah-olah dibaca oleh AI)
        return response()->json([
            'status' => 'success',
            'data' => [
                'kk_number' => '3211' . rand(100000000000, 999999999999),
                'head_name' => 'Bpk. ' . fake()->name(),
                'address' => 'Blok ' . chr(rand(65, 70)) . ' No. ' . rand(1, 20) . ', RT 03 / RW 05',
                'members' => [
                    ['nik' => '3211' . rand(100000000000, 999999999999), 'name' => fake()->name(), 'relation' => 'Istri'],
                    ['nik' => '3211' . rand(100000000000, 999999999999), 'name' => fake()->name(), 'relation' => 'Anak'],
                ]
            ]
        ]);
    }
}
