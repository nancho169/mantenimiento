<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHardwareAssetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $hardwareAsset = $this->route('hardware_asset');
        
        return [
            'tipo' => 'required|in:PC,Impresora,Monitor,Periférico,Servidor,Laptop,Router,Telefono,Escáner,Tablet',
            'marca' => 'required|string|max:255',
            'modelo' => 'required|string|max:255',
            'numero_serie' => 'required|string|max:255|unique:hardware_assets,numero_serie,' . $hardwareAsset->id,
            'estado' => 'required|in:Operativo,En Reparación,Baja,En Mantenimiento,Dañado,Reservado',
            'area_id' => 'nullable|exists:areas,id',
            'descripcion' => 'nullable|string',
            'fecha_adquisicion' => 'nullable|date',
            'garantia_hasta' => 'nullable|date',
            'requiere_mantenimiento' => 'boolean',
        ];
    }
}
