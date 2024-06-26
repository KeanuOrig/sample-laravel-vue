<?php

namespace App\Http\Requests\Maintenance;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if ($this->isMethod('post')) {
            return [
                'name' => 'required',
                'email' => 'required|email|unique:users,email,'
            ];
        } elseif ($this->isMethod('put')) {
            return [
                'name' => 'required',
                'email' => 'required|email',
            ];
        } elseif ($this->isMethod('get')) {
            return [];
        }
    }
}
