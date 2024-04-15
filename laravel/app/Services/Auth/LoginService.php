<?php

namespace App\Services\Auth;

use App\Services\BaseService;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Maintenance\UserRepository;

class LoginService extends BaseService
{
    public function __construct(UserRepository $user_repository)
    {
        $this->user_repository = $user_repository;
    }

    public function login($data)
    {   
        return $this->executeFunction(function () use ($data) {
            
            if(Auth::attempt(['email' => $data['email'], 'password' => $data['password']])){ 
                $user = Auth::user(); 
                $login = $this->user_repository->show($user->id);

                $tokenResult = $user->createToken('authToken'); 
                $success['token'] =  $tokenResult->plainTextToken; 

                $expirationDate = $tokenResult->accessToken->expires_at;
                $success['token_expires_at'] = $expirationDate->format('Y-m-d H:i:s');
                $success['user'] =  $login;
                return $success;
            } 
            else{ 
                throw new \Exception('Invalid Credentials');
            } 

        });
    }

    public function logout()
    {
        return $this->executeFunction(function () {

            $accessToken = Auth::user()->currentAccessToken();
            $token = $accessToken->delete();

            return 'Logout successfully';
        });
    }
}