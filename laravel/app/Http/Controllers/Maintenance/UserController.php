<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use App\Services\Maintenance\UserService;
use App\Http\Requests\Maintenance\UserRequest;

class UserController extends Controller
{
    private $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function index(UserRequest $request)
    {
        return $this->service->index($request->toArray());
    }

    public function store(UserRequest $request)
    {
        return $this->service->store($request->toArray());
    }

    public function show($id)
    {
        return $this->service->show($id);
    }

    public function update(UserRequest $request, $id)
    {
        return $this->service->update($request->toArray(), $id);
    }

    public function destroy($id)
    {
        return $this->service->destroy($id);
    }
}
