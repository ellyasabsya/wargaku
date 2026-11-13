<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LetterRequest;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class LetterController extends Controller
{
    public function index()
    {
        return response()->json(LetterRequest::with('user')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'letter_type' => 'required|string',
            'purpose' => 'required|string',
        ]);

        $letter = LetterRequest::create([
            'user_id' => $request->user()->id,
            'letter_type' => $validated['letter_type'],
            'purpose' => $validated['purpose'],
            'status' => 'pending'
        ]);

        return response()->json($letter, 201);
    }

    public function updateStatus(Request $request, LetterRequest $letter)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved_rt,approved_rw,rejected',
            'admin_notes' => 'nullable|string'
        ]);

        $letter->update($validated);
        return response()->json($letter);
    }

    // Fungsi Generate PDF
    public function downloadPdf(LetterRequest $letter)
    {
        // Pastikan hanya bisa download jika sudah disetujui RW
        if ($letter->status !== 'approved_rw') {
            return response()->json(['message' => 'Surat belum disetujui sepenuhnya'], 403);
        }

        $pdf = Pdf::loadView('pdf.letter', compact('letter'));
        return $pdf->download('Surat_' . str_replace(' ', '_', $letter->letter_type) . '.pdf');
    }
}
