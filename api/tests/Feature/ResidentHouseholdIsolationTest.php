<?php

namespace Tests\Feature;

use App\Models\Household;
use App\Models\Resident;
use App\Models\ResidentDocument;
use App\Models\Tenant;
use App\Support\TenantContext;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResidentHouseholdIsolationTest extends TestCase
{
    use RefreshDatabase;

    private function createTenant(string $name): Tenant
    {
        return Tenant::create([
            'name' => $name,
            'slug' => strtolower(str_replace(' ', '-', $name)),
            'status' => 'active',
        ]);
    }

    private function createHousehold(int $tenantId): Household
    {
        app(TenantContext::class)->setTenant($tenantId);

        return Household::create([
            'head_name' => 'Kepala Keluarga Pengujian',
            'address' => 'Alamat Pengujian',
            'status' => 'draft',
        ]);
    }

    public function test_resident_can_be_created_with_household_from_same_tenant(): void
    {
        $tenant = $this->createTenant('RT A');
        $household = $this->createHousehold($tenant->id);

        app(TenantContext::class)->setTenant($tenant->id);

        $resident = Resident::create([
            'household_id' => $household->id,
            'nik' => '1234567890123456',
            'name' => 'Warga Pengujian',
            'relation' => 'anggota',
        ]);

        $this->assertSame($tenant->id, $resident->tenant_id);
        $this->assertSame($household->id, $resident->household_id);
    }

    public function test_resident_cannot_use_household_from_another_tenant(): void
    {
        $tenantA = $this->createTenant('RT A');
        $tenantB = $this->createTenant('RT B');

        $householdB = $this->createHousehold($tenantB->id);

        app(TenantContext::class)->setTenant($tenantA->id);

        $this->expectException(AuthorizationException::class);

        Resident::create([
            'household_id' => $householdB->id,
            'name' => 'Warga Pengujian',
            'relation' => 'anggota',
        ]);
    }

    public function test_resident_cannot_be_moved_to_household_from_another_tenant(): void
    {
        $tenantA = $this->createTenant('RT A');
        $tenantB = $this->createTenant('RT B');

        $householdA = $this->createHousehold($tenantA->id);
        $householdB = $this->createHousehold($tenantB->id);

        app(TenantContext::class)->setTenant($tenantA->id);

        $resident = Resident::create([
            'household_id' => $householdA->id,
            'name' => 'Warga Pengujian',
            'relation' => 'anggota',
        ]);

        $resident->household_id = $householdB->id;

        $this->expectException(AuthorizationException::class);

        $resident->save();
    }

    public function test_document_cannot_use_household_from_another_tenant(): void
    {
        $tenantA = $this->createTenant('RT A');
        $tenantB = $this->createTenant('RT B');

        $householdB = $this->createHousehold($tenantB->id);

        app(TenantContext::class)->setTenant($tenantA->id);

        $this->expectException(AuthorizationException::class);

        ResidentDocument::create([
            'household_id' => $householdB->id,
            'type' => 'kk',
            'status' => 'pending',
        ]);
    }

    public function test_document_can_be_created_without_household(): void
    {
        $tenant = $this->createTenant('RT A');

        app(TenantContext::class)->setTenant($tenant->id);

        $document = ResidentDocument::create([
            'household_id' => null,
            'type' => 'ktp',
            'status' => 'pending',
        ]);

        $this->assertSame($tenant->id, $document->tenant_id);
        $this->assertNull($document->household_id);
    }
}
