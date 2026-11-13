<?php

namespace App\Support;

class TenantContext
{
    private ?int $tenantId = null;

    public function set(?int $id): void { $this->tenantId = $id; }
    public function id(): ?int { return $this->tenantId; }
    public function isSuperAdmin(): bool { return $this->tenantId === null; }
}
