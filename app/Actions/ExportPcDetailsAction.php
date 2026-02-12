<?php

namespace App\Actions;

use App\Models\PcDetail;

class ExportPcDetailsAction
{
    /**
     * Execute the export action.
     *
     * @return \Illuminate\Http\Response
     */
    public function execute()
    {
        $details = PcDetail::with('hardwareAsset.area')->latest()->get();
        $filename = "inventario_pc_" . date('Y-m-d') . ".csv";

        $handle = fopen('php://memory', 'w');
        
        // Add BOM for Excel UTF-8 compatibility
        fputs($handle, "\xEF\xBB\xBF");

        // Write CSV headers
        fputcsv($handle, [
            'ID', 'Tipo', 'Marca', 'Modelo', 'Serial', 'Estado', 'Area',
            'CPU', 'RAM (GB)', 'Almacenamiento', 'OS', 'IP', 'MAC', 'AnyDesk', 'TeamViewer'
        ]);

        // Write data rows
        foreach ($details as $detail) {
            fputcsv($handle, [
                $detail->hardwareAsset?->id ?? '',
                $detail->hardwareAsset?->tipo ?? '',
                $detail->hardwareAsset?->marca ?? '',
                $detail->hardwareAsset?->modelo ?? '',
                $detail->hardwareAsset?->numero_serie ?? '',
                $detail->hardwareAsset?->estado ?? '',
                $detail->hardwareAsset?->area?->nombre ?? 'No asignada',
                $detail->cpu,
                $detail->ram_gb,
                $detail->almacenamiento,
                $detail->sistema_operativo,
                $detail->ip_address,
                $detail->mac_address,
                $detail->anydesk_id,
                $detail->teamviewer_id,
            ]);
        }

        fseek($handle, 0);

        return response()->stream(
            function () use ($handle) {
                fpassthru($handle);
                fclose($handle);
            },
            200,
            [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ]
        );
    }
}
