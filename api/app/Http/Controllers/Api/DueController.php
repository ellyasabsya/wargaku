<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DueBill;
use Illuminate\Http\Request;

class DueController extends Controller
{
    public function index()
    {
        // Ambil tagihan beserta data user
        return response()->json(DueBill::with('user')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'month' => 'required|string',
            'year' => 'required|integer',
            'amount' => 'required|numeric',
            'user_id' => 'required|exists:users,id' // Bendahara menagih ke user tertentu
        ]);

        $bill = DueBill::create([
            'user_id' => $validated['user_id'],
            'month' => $validated['month'],
            'year' => $validated['year'],
            'amount' => $validated['amount'],
            'status' => 'unpaid'
        ]);

        return response()->json($bill, 201);
    }

    public function pay(Request $request, DueBill $bill)
    {
        $bill->update([
            'status' => 'paid',
            'paid_at' => now()
        ]);
        return response()->json($bill);
    }
}
