<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaintenanceRequest extends FormRequest
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
        return [
            'asset_id' => 'required|exists:hardware_assets,id',
            'fecha_servicio' => 'required|date',
            'tecnico' => 'required|string|max:100',
            'descripcion' => 'required|string',
            'proximo_mantenimiento' => 'nullable|date|after:fecha_servicio',
        ];
    }
}
