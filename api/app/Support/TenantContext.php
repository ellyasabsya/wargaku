<?php

namespace App\Support;

class TenantContext
{
    private ?int $tenantId = null;

    private bool $superAdmin = false;

    private bool $resolved = false;

    public function setTenant(int $id): void
    {
        if ($id <= 0) {
            throw new \InvalidArgumentException('Tenant ID tidak valid.');
        }

        $this->tenantId = $id;
        $this->superAdmin = false;
        $this->resolved = true;
    }

    public function setSuperAdmin(): void
    {
        $this->tenantId = null;
        $this->superAdmin = true;
        $this->resolved = true;
    }

    public function reset(): void
    {
        $this->tenantId = null;
        $this->superAdmin = false;
        $this->resolved = false;
    }

    public function id(): ?int
    {
        return $this->tenantId;
    }

    public function isSuperAdmin(): bool
    {
        return $this->resolved && $this->superAdmin;
    }

    public function hasTenant(): bool
    {
        return $this->resolved && $this->tenantId !== null;
    }

    public function isResolved(): bool
    {
        return $this->resolved;
    }
}
