<?php

namespace App\Models\Concerns;

use App\Support\TenantContext;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToTenant
{
    protected static function bootBelongsToTenant(): void
    {
        // Filter pembacaan berdasarkan organisasi.
        static::addGlobalScope('tenant', function (Builder $builder) {
            $context = app(TenantContext::class);

            if (! $context->isResolved()) {
                throw new AuthorizationException(
                    'Konteks organisasi belum ditentukan.'
                );
            }

            if ($context->isSuperAdmin()) {
                return;
            }

            if (! $context->hasTenant()) {
                throw new AuthorizationException(
                    'Akses organisasi tidak valid.'
                );
            }

            $builder->where(
                $builder->getModel()->getTable() . '.tenant_id',
                $context->id()
            );
        });

        // Pembuatan data harus menggunakan tenant yang benar.
        static::creating(function ($model) {
            $context = app(TenantContext::class);

            if (! $context->isResolved()) {
                throw new AuthorizationException(
                    'Tidak dapat membuat data tanpa konteks organisasi.'
                );
            }

            if ($context->isSuperAdmin()) {
                if (! $model->tenant_id) {
                    throw new AuthorizationException(
                        'Super Admin harus menentukan organisasi tujuan.'
                    );
                }

                return;
            }

            if (! $context->hasTenant()) {
                throw new AuthorizationException(
                    'Organisasi pengguna tidak valid.'
                );
            }

            // Tenant dari request tidak dipercaya.
            $model->tenant_id = $context->id();
        });

        // Kepemilikan data tidak boleh dipindahkan melalui update.
        static::updating(function ($model) {
            $context = app(TenantContext::class);

            if (! $context->isResolved()) {
                throw new AuthorizationException(
                    'Tidak dapat mengubah data tanpa konteks organisasi.'
                );
            }

            if ($model->isDirty('tenant_id')) {
                throw new AuthorizationException(
                    'Organisasi pemilik data tidak boleh diubah.'
                );
            }

            if ($context->isSuperAdmin()) {
                return;
            }

            if (
                ! $context->hasTenant()
                || (int) $model->getRawOriginal('tenant_id') !== $context->id()
            ) {
                throw new AuthorizationException(
                    'Anda tidak berhak mengubah data organisasi ini.'
                );
            }
        });

        // Penghapusan juga harus memeriksa kepemilikan.
        static::deleting(function ($model) {
            $context = app(TenantContext::class);

            if (! $context->isResolved()) {
                throw new AuthorizationException(
                    'Tidak dapat menghapus data tanpa konteks organisasi.'
                );
            }

            if ($context->isSuperAdmin()) {
                return;
            }

            if (
                ! $context->hasTenant()
                || (int) $model->getRawOriginal('tenant_id') !== $context->id()
            ) {
                throw new AuthorizationException(
                    'Anda tidak berhak menghapus data organisasi ini.'
                );
            }
        });
    }
}
