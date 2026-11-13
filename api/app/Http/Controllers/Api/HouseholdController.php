<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Household;
use Illuminate\Http\Request;

class HouseholdController extends Controller
{
    public function index()
    {
        // Global Scope otomatis memfilter berdasarkan tenant_id user yang login
        return response()->json(Household::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kk_number' => 'nullable|string|max:16',
            'head_name' => 'required|string|max:255',
            'address' => 'required|string',
        ]);

        // tenant_id akan otomatis diisi oleh trait BelongsToTenant
        $household = Household::create($validated);

        return response()->json($household, 201);
    }
}
