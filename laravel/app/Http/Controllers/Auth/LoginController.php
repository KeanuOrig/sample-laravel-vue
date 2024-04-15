<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\LoginService;
use App\Http\Requests\Auth\LoginRequest;

class LoginController extends Controller
{
    private $service;

    public function __construct(LoginService $service)
    {   
        $this->service = $service;
    }
    
    public function login(LoginRequest $request)
    {   
        return $this->service->login($request->toArray());
    }

    public function logout()
    {   
        return $this->service->logout();
    }
}