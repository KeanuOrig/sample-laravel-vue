<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\RegisterService;

class RegisterController extends Controller
{
    private $service;

    public function __construct(RegisterService $service)
    {   
        $this->service = $service;
    }

    public function register(RegisterRequest $request)
    {   
        return $this->service->register($request->toArray());
    }
}
