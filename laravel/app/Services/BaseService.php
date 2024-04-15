<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class BaseService
{
    protected function petnetResponse($code, $message, $result = null, $httpCode = 200, $errorType = null, $errorMessage = null) {
        
        if ($httpCode === 200) {
            return response()->json(
                [
                    "code" => $code,
                    "message" => $message,
                    "data" => $result
                ],
                $httpCode
            );
        }

        return response()->json(
            [
                "code" => $code,
                "message" => $message,
                "data" => [
                    "type" => $errorType,
                    "message" => $errorMessage
                ]
            ],
            $httpCode
        );
    }

    protected function executeFunction(callable $function)
    {
        try {
            DB::beginTransaction();
            $data = call_user_func($function);
            DB::commit();

            return $this->petnetResponse(200, 'Good', $data, 200, 'Good', null);
        } catch (\Throwable $th) {
            DB::rollback();
            return $this->petnetResponse(500, 'Failed', null, 500, 'DB', $th->getMessage());
        }
    }
}