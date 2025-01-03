<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\Size;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class ProductController extends Controller
{
    public function get(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        return response()->json([
            $productId ?
                Product::query()->find($productId)->with([
                    'categories:name',
                    'sizes:size',
                    'colors:name'
                ])->first()
                : Product::with('categories','sizes','colors')->get()
        ]);
    }

    public function getSizes(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        return response()->json([
            $productId ? Product::query()->find($productId)->sizes()->pluck('size')->all() : Size::all()
        ]);
    }

    public function getCategories(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        return response()->json([
            $productId ? Product::query()->find($productId)->categories()->pluck('name')->all() : Category::all()
        ]);
    }

    public function getColors(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        return response()->json([
            $productId ? Product::query()->find($productId)->colors()->pluck('name')->all() : Color::all()
        ]);
    }

    public function create(Request $request): JsonResponse
    {
        $data = $request->all();

        $product = new Product();
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

    public function edit(Request $request, Product $product): JsonResponse
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

    public function delete(Request $request, Product $product): JsonResponse
    {
        return response()->json([
            "result" => $product->delete()
        ]);
    }
}
