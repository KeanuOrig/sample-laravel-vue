<?php

namespace App\Services\Maintenance;

use App\Repositories\Maintenance\UserRepository;
use App\Services\BaseService;

class UserService extends BaseService
{
    private $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index($data)
    {
        return $this->executeFunction(function () use ($data) {
            return $this->repository->index($data);
        });
    }

    public function store($data)
    {        
        return $this->executeFunction(function () use ($data) {

            $data['password'] = bcrypt('p@ssw0rd');
            $data['edit_by'] = auth()->user()->email;
    
            return $this->repository->store($data);
        });
    }

    public function update($data, $id)
    {
        return $this->executeFunction(function () use ($data, $id) {
            return $this->repository->update($data, $id);
        });
    }

    public function destroy($id)
    {
        return $this->executeFunction(function () use ($id) {
            return $this->repository->destroy($id);
        });
    }

    public function show($id)
    {
        return $this->executeFunction(function () use ($id) {
            return $this->repository->show($id);
        });
    }
}
