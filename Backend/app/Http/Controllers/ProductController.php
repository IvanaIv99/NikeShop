<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Colors;
use App\Models\Products;
use App\Models\Sizes;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class ProductController extends Controller
{
    public function get(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        $data = $productId ?
            Products::query()->find($productId)->with(['categories:name', 'sizes:size', 'colors:name'])->first() :
            Products::with('categories','sizes','colors')->get();

        return response()->json([
            'data' => $data,
        ]);
    }

    public function getSizes(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        return response()->json([
            $productId ? Products::query()->find($productId)->sizes()->pluck('size')->all() : Sizes::all()
        ]);
    }

    public function getCategories(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        return response()->json([
            $productId ? Products::query()->find($productId)->categories()->pluck('name')->all() : Categories::all()
        ]);
    }

    public function getColors(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        return response()->json([
            $productId ? Products::query()->find($productId)->colors()->pluck('name')->all() : Colors::all()
        ]);
    }

    public function create(Request $request): JsonResponse
    {
        $data = $request->all();

        $product = new Products();
        $product->name = $data['name'];
        $product->description = $data['description'];
        $product->price = $data['price'];

        if ($data['image']){
            $product->image = $this->handleImage($data['image']);
        }

        $product->save();

        $product->colors()->attach($data['colors']);
        $product->categories()->attach($data['categories']);
        $product->sizes()->attach($data['sizes']);

        return response()->json([
           "message" => 'Saved.'
        ]);
    }

    private function handleImage(UploadedFile $image): string
    {
        $completeFileName = $image->getClientOriginalName();
        $fileNameOnly = pathinfo($completeFileName, PATHINFO_FILENAME);
        $extension = $image->getClientOriginalExtension();
        $newName = sprintf("%s_%s.%s", now()->timestamp, $fileNameOnly, $extension);
        $image->storeAs('public/products', $newName);
        return $newName;
    }

    public function edit(Request $request, Products $product): JsonResponse
    {
        $data = $request->all();
        $product->name = $request->get('name');
        $product->description = $request->get('description');
        $product->price = $request->get('price');
        $product->colors()->sync($data['colors']);
        $product->categories()->sync($data['categories']);
        $product->sizes()->sync($data['sizes']);

        return response()->json([
            "result" => $product->save()
        ]);
    }

    public function delete(Request $request, Products $product): JsonResponse
    {
        return response()->json([
            "result" => $product->delete()
        ]);
    }
}
