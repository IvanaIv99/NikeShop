<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Colors;
use App\Models\Products;
use App\Models\Sizes;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ProductController extends Controller
{
    public function get(Request $request): JsonResponse
    {
        $productId = $request->get('productId');

        if ($productId) {
            $product = Products::query()
                ->where('id', $productId)
                ->with(['categories:name', 'sizes:size', 'colors:name'])
                ->first();

            return response()->json([
                'data' => $product,
            ]);
        }

        return response()->json([
            'data' => Products::with('categories','sizes','colors')->get(),
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

    public function getStats(Request $request): JsonResponse
    {
        return response()->json([
            'three_top_selling' => Products::query()
                ->withCount('orders')
                ->orderByDesc('orders_count')
                ->take(3)
                ->get(),
        ]);
    }

    public function create(Request $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $data = $request->all();
            $product = new Products();
            $product->name = $data['name'];
            $product->description = $data['description'];
            $product->price = $data['price'];

            if ($data['image']){
                $product->image = $this->handleImage($data['image']);
            }

            $product->save();

            $product->colors()->sync($data['colors']);
            $product->categories()->sync($data['categories']);
            $product->sizes()->sync($data['sizes']);

            return response()->json([
                "message" => 'Saved.'
            ]);
        });
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
        return DB::transaction(function () use ($request, $product) {
            $data = $request->all();
            $product->name = $request->get('name');
            $product->description = $request->get('description');
            $product->price = $request->get('price');

            if (array_key_exists('image', $data)){
                $product->image = $this->handleImage($data['image']);
            }

            $product->colors()->sync($data['colors']);
            $product->categories()->sync($data['categories']);
            $product->sizes()->sync($data['sizes']);

            return response()->json([
                "result" => $product->save()
            ]);
        });
    }

    public function delete(Request $request, Products $product): JsonResponse
    {
        return response()->json([
            "result" => $product->delete()
        ]);
    }

    public function getFileFromStorage(Request $request): BinaryFileResponse|JsonResponse
    {
        $fileName = $request->get('fileName');
        $path = asset('storage/products/' . $fileName);
        if (!File::exists($path)) return response()->json(['message' => 'File not found'], 404);
        return response()->file($path);
    }
}
