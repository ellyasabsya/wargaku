<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tenant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Buat Role (Gunakan firstOrCreate agar tidak error jika dijalankan berulang kali)
        Role::firstOrCreate(['name' => 'super_admin']);
        Role::firstOrCreate(['name' => 'warga']);

        // 2. Buat Tenant (Perumahan)
        $tenant = Tenant::firstOrCreate(
            ['slug' => 'taman-indah'],
            [
                'name' => 'Perumahan Taman Indah',
                'status' => 'active',
            ]
        );

        // 3. Buat Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@wargaku.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password123'),
            ]
        );
        $superAdmin->assignRole('super_admin');

        // 4. Buat Warga
        $warga = User::firstOrCreate(
            ['email' => 'budi@warga.com'],
            [
                'tenant_id' => $tenant->id,
                'name' => 'Budi Warga',
                'password' => Hash::make('password123'),
            ]
        );
        $warga->assignRole('warga');
    }
}
