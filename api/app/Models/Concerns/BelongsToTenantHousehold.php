<?php

namespace App\Models\Concerns;

use App\Models\Household;
use App\Support\TenantContext;
use Illuminate\Auth\Access\AuthorizationException;

trait BelongsToTenantHousehold
{
    protected static function bootBelongsToTenantHousehold(): void
    {
        static::creating(function ($model) {
            static::validateHouseholdTenant($model);
        });

        static::updating(function ($model) {
            static::validateHouseholdTenant($model);
        });
    }

    protected static function validateHouseholdTenant($model): void
    {
        if (! $model->household_id) {
            return;
        }

        $context = app(TenantContext::class);

        if (! $context->isResolved()) {
            throw new AuthorizationException(
                'Konteks organisasi belum ditentukan.'
            );
        }

        $tenantId = $context->isSuperAdmin()
            ? $model->getRawOriginal('tenant_id') ?: $model->tenant_id
            : $context->id();

        if (! $tenantId) {
            throw new AuthorizationException(
                'Organisasi tujuan tidak valid.'
            );
        }

        $belongsToTenant = Household::withoutGlobalScope('tenant')
            ->whereKey($model->household_id)
            ->where('tenant_id', $tenantId)
            ->exists();

        if (! $belongsToTenant) {
            throw new AuthorizationException(
                'KK tidak ditemukan dalam organisasi ini.'
            );
        }
    }
}
