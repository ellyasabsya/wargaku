<?php

namespace App\Http\Middleware;

use App\Support\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveTenant
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        // Jika ada user login dan dia bukan super_admin, set context ke tenant-nya
        if ($user && !$user->hasRole('super_admin')) {
            app(TenantContext::class)->set($user->tenant_id);
        }

        return $next($request);
    }
}
