<?php

declare(strict_types=1);

namespace App\Domains\Order\Controllers;

use App\Domains\Order\Dto\ChangeOrderStatusDto;
use App\Domains\Order\Dto\CreateOrderDto;
use App\Domains\Order\Dto\ListOrdersDto;
use App\Domains\Order\Dto\SummarizeOrderDto;
use App\Domains\Order\Resources\OrderResource;
use App\Domains\Order\Services\OrderService;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

final class OrderController extends Controller
{
    public function __construct(
        private readonly OrderService $orderService
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $paginator = $this->orderService->list(ListOrdersDto::from($request));

        return $this->sendResponse([
            'data' => OrderResource::collect($paginator->items()),
            'meta' => $this->paginationMeta($paginator),
        ]);
    }

    public function show(Order $order): JsonResponse
    {
        $response = $this->orderService->find($order);
        return $this->sendResponse(OrderResource::from($response));
    }

    public function store(Request $request): JsonResponse
    {
        $response = $this->orderService->create(CreateOrderDto::from($request));
        return $this->sendResponse(OrderResource::from($response));
    }

    public function changeStatus(Order $order, ChangeOrderStatusDto $dto): JsonResponse
    {
        $response = $this->orderService->changeStatus($order, $dto);
        return $this->sendResponse(OrderResource::from($response));
    }

    public function todayStats(): JsonResponse
    {
        $response = $this->orderService->todayStats();
        return $this->sendResponse($response);
    }

    public function chart(): JsonResponse
    {
        return $this->sendResponse($this->orderService->chart());
    }

    public function shippingFee(): JsonResponse
    {
        return $this->sendResponse([
            'shipping_fee' => (float) config('shop.shipping_fee'),
        ]);
    }

    public function summary(Request $request): JsonResponse
    {
        return $this->sendResponse(
            $this->orderService->summarize(SummarizeOrderDto::from($request))
        );
    }

    public function enums(): JsonResponse
    {
        return $this->sendResponse($this->orderService->enums());
    }

    public function downloadPdf(Order $order, Request $request): Response
    {
        return $this->orderService->slipResponse($order);
    }
}
