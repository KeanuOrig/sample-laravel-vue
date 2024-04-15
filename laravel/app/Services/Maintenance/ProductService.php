<?php

namespace App\Services\Maintenance;

use App\Repositories\Maintenance\ProductRepository;
use App\Services\BaseService;
use App\Traits\FileUpload;

class ProductService extends BaseService
{
    use FileUpload;
    private $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index($data)
    {
        return $this->executeFunction(function () use ($data) {
            return $this->repository->index($data);
        });
    }

    public function store($request)
    {           
        return $this->executeFunction(function () use ($request) {
            $file = $request->file('image');

            foreach ($request->file('image') as $file) {
                $upload = $this->upload($file, 'image', 'public/products');

                if (!$upload) {
                    throw new \Exception('File upload failed. Please try again.');
                }

                $upload_array[] = $upload;
               
            }

            $data = $request->all();
            $data['image_url'] = json_encode($upload_array);
            $data['edit_by'] = auth()->user()->email;

            return $this->repository->store($data);
        });
    }

    public function update($request, $id)
    {
        return $this->executeFunction(function () use ($request, $id) {
            
            $data = $request->all();
            $data['edit_by'] = auth()->user()->email;

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
