<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePcDetailRequest extends FormRequest
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
            'asset_id' => 'required|exists:hardware_assets,id|unique:pc_details,asset_id',
            'cpu' => 'required|string|max:100',
            'ram_gb' => 'required|integer|min:1',
            'almacenamiento' => 'required|string|max:100',
            'sistema_operativo' => 'required|string|max:100',
            'mac_address' => 'nullable|string|max:100',
            'ip_address' => 'nullable|string|max:45',
            'anydesk_id' => 'nullable|string|max:50',
            'teamviewer_id' => 'nullable|string|max:50',
        ];
    }
}
