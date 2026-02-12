<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\HardwareAsset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentController extends Controller
{
    /**
     * Store uploaded documents for a hardware asset.
     */
    public function store(Request $request, HardwareAsset $asset)
    {
        $request->validate([
            'documents' => 'required|array',
            'documents.*' => 'file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png|max:10240', // Max 10MB
        ]);

        $uploadedDocuments = [];

        foreach ($request->file('documents') as $file) {
            $originalName = $file->getClientOriginalName();
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('documents/hardware-assets/' . $asset->id, $filename);

            $document = Document::create([
                'asset_id' => $asset->id,
                'filename' => $filename,
                'original_name' => $originalName,
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'path' => $path,
                'uploaded_by' => auth()->id(),
            ]);

            $uploadedDocuments[] = $document;
        }

        return redirect()->back()->with('success', count($uploadedDocuments) . ' documento(s) subido(s) correctamente.');
    }

    /**
     * Download a document.
     */
    public function download(Document $document)
    {
        if (!Storage::exists($document->path)) {
            abort(404, 'Archivo no encontrado');
        }

        return Storage::download($document->path, $document->original_name);
    }

    /**
     * Delete a document.
     */
    public function destroy(Document $document)
    {
        // Verificar que el usuario tenga permiso (por ahora cualquier usuario autenticado)
        if (Storage::exists($document->path)) {
            Storage::delete($document->path);
        }

        $document->delete();

        return redirect()->back()->with('success', 'Documento eliminado correctamente.');
    }
}
