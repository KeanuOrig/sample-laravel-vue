<?php

namespace App\Services\Auth;

use App\Services\BaseService;
use App\Http\Requests\Auth\RegisterRequest;
use App\Repositories\Maintenance\UserRepository;

class RegisterService extends BaseService
{
    public function __construct(UserRepository $user_repository)
    {
        $this->user_repository = $user_repository;
    }

    public function register($data)
    {   
        return $this->executeFunction(function () use ($data) { 

            $data['password'] = bcrypt($data['password']);
            $user = $this->user_repository->store($data);

            $success['token'] =  $user->createToken('authToken')->plainTextToken; 
            $success['user'] =  $user;
            return $success;
           
        });
    }
}
