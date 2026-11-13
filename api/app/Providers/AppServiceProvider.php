<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Support\TenantContext;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Daftarkan sebagai singleton agar ID tenant tidak hilang
        $this->app->singleton(TenantContext::class, function ($app) {
            return new TenantContext();
        });
    }

    public function boot(): void
    {
        //
    }
}
