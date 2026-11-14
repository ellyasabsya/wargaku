<?php

namespace Tests\Feature;

use App\Models\Household;
use App\Models\Tenant;
use App\Support\TenantContext;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantIsolationTest extends TestCase
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

    private function createHousehold(int $tenantId, string $headName): Household
    {
        app(TenantContext::class)->setTenant($tenantId);

        return Household::create([
            'tenant_id' => $tenantId,
            'kk_number' => null,
            'head_name' => $headName,
            'address' => 'Alamat pengujian',
            'status' => 'draft',
        ]);
    }

    public function test_tenant_only_sees_its_own_households(): void
    {
        $tenantA = $this->createTenant('Organisasi A');
        $tenantB = $this->createTenant('Organisasi B');

        $this->createHousehold($tenantA->id, 'Kepala Keluarga A');
        $this->createHousehold($tenantB->id, 'Kepala Keluarga B');

        app(TenantContext::class)->setTenant($tenantA->id);

        $this->assertSame(1, Household::count());
        $this->assertSame(
            'Kepala Keluarga A',
            Household::first()->head_name
        );
    }

    public function test_request_cannot_create_household_for_another_tenant(): void
    {
        $tenantA = $this->createTenant('Organisasi A');
        $tenantB = $this->createTenant('Organisasi B');

        app(TenantContext::class)->setTenant($tenantA->id);

        $household = Household::create([
            'tenant_id' => $tenantB->id,
            'head_name' => 'Kepala Keluarga A',
            'address' => 'Alamat A',
            'status' => 'draft',
        ]);

        $this->assertSame($tenantA->id, $household->tenant_id);
    }

    public function test_tenant_id_cannot_be_changed_during_update(): void
    {
        $tenantA = $this->createTenant('Organisasi A');
        $tenantB = $this->createTenant('Organisasi B');

        $household = $this->createHousehold(
            $tenantA->id,
            'Kepala Keluarga A'
        );

        app(TenantContext::class)->setTenant($tenantA->id);

        $household->tenant_id = $tenantB->id;

        $this->expectException(AuthorizationException::class);

        $household->save();
    }

    public function test_unresolved_context_cannot_query_households(): void
    {
        app(TenantContext::class)->reset();

        $this->expectException(AuthorizationException::class);

        Household::count();
    }

    public function test_tenant_cannot_delete_another_tenants_household(): void
    {
        $tenantA = $this->createTenant('Organisasi A');
        $tenantB = $this->createTenant('Organisasi B');

        $household = $this->createHousehold(
            $tenantB->id,
            'Kepala Keluarga B'
        );

        app(TenantContext::class)->setTenant($tenantA->id);

        // Pengambilan tanpa global scope hanya untuk simulasi
        // model asing yang terlanjur dimuat oleh proses lain.
        $foreignHousehold = Household::withoutGlobalScope('tenant')
            ->findOrFail($household->id);

        $this->expectException(AuthorizationException::class);

        $foreignHousehold->delete();
    }
}
