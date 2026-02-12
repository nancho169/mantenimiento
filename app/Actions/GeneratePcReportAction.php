<?php

namespace App\Actions;

use App\Models\PcDetail;

class GeneratePcReportAction
{
    /**
     * Execute the report generation action.
     *
     * @return array
     */
    public function execute(): array
    {
        $details = PcDetail::with(['hardwareAsset.area'])
            ->orderBy('id')
            ->get();
        
        return [
            'details' => $details,
            'date' => date('d/m/Y'),
        ];
    }
}
