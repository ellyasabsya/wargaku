<?php

namespace Tests\Feature;

use App\Models\NeighborhoodUnit;
use App\Models\Tenant;
use App\Support\TenantContext;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NeighborhoodUnitIsolationTest extends TestCase
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

    public function test_tenant_only_sees_its_own_neighborhood_units(): void
    {
        $tenantA = $this->createTenant('RT A');
        $tenantB = $this->createTenant('RT B');

        app(TenantContext::class)->setTenant($tenantA->id);

        NeighborhoodUnit::create([
            'type' => 'RT',
            'number' => '001',
        ]);

        app(TenantContext::class)->setTenant($tenantB->id);

        NeighborhoodUnit::create([
            'type' => 'RT',
            'number' => '002',
        ]);

        app(TenantContext::class)->setTenant($tenantA->id);

        $this->assertSame(1, NeighborhoodUnit::count());
        $this->assertSame('001', NeighborhoodUnit::first()->number);
    }

    public function test_neighborhood_unit_uses_current_tenant_on_creation(): void
    {
        $tenantA = $this->createTenant('RT A');
        $tenantB = $this->createTenant('RT B');

        app(TenantContext::class)->setTenant($tenantA->id);

        $unit = NeighborhoodUnit::create([
            'tenant_id' => $tenantB->id,
            'type' => 'RT',
            'number' => '001',
        ]);

        $this->assertSame($tenantA->id, $unit->tenant_id);
    }

    public function test_unresolved_context_cannot_query_neighborhood_units(): void
    {
        app(TenantContext::class)->reset();

        $this->expectException(AuthorizationException::class);

        NeighborhoodUnit::count();
    }
}
