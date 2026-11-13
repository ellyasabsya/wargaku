<?php

namespace App\Models\Concerns;

use App\Support\TenantContext;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToTenant
{
    protected static function bootBelongsToTenant(): void
    {
        // 1. Otomatis filter data berdasarkan tenant yang login
        static::addGlobalScope('tenant', function (Builder $b) {
            $ctx = app(TenantContext::class);
            if (! $ctx->isSuperAdmin()) {
                $b->where($b->getModel()->getTable().'.tenant_id', $ctx->id());
            }
        });

        // 2. Otomatis isi tenant_id saat membuat data baru
        static::creating(function ($model) {
            $ctx = app(TenantContext::class);
            if ($model->tenant_id === null && ! $ctx->isSuperAdmin()) {
                $model->tenant_id = $ctx->id();
            }
        });
    }
}
