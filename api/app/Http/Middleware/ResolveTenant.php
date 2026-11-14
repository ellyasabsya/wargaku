<?php

namespace App\Http\Middleware;

use App\Support\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenant
{
    public function handle(
        Request $request,
        Closure $next
    ): Response {
        $user = $request->user();

        if (! $user) {
            abort(401, 'Autentikasi diperlukan.');
        }

        $context = app(TenantContext::class);

        try {
            if ($user->hasRole('super_admin')) {
                $context->setSuperAdmin();
            } else {
                if (! $user->tenant_id) {
                    abort(403, 'Akun belum terhubung dengan organisasi.');
                }

                $context->setTenant((int) $user->tenant_id);
            }

            return $next($request);
        } finally {
            $context->reset();
        }
    }
}
