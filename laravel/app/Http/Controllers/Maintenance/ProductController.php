<?php

namespace App\Http\Controllers\Maintenance;

use App\Http\Controllers\Controller;
use App\Services\Maintenance\ProductService;
use App\Http\Requests\Maintenance\ProductRequest;

class ProductController extends Controller
{
    private $service;

    public function __construct(ProductService $service)
    {   
        $this->service = $service;
    }

    public function index(ProductRequest $request)
    {   
        return $this->service->index($request->toArray());
    }

    public function store(ProductRequest $request)
    {   
        return $this->service->store($request);
    }

    public function show($id)
    {
        return $this->service->show($id);
    }

    public function update(ProductRequest $request, $id)
    {  
        return $this->service->update($request, $id);
    }

    public function destroy($id)
    {
        return $this->service->destroy($id);
    }
}
