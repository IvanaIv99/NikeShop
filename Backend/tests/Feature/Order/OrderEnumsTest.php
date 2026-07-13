<?php

declare(strict_types=1);

namespace Tests\Feature\Order;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

final class OrderEnumsTest extends TestCase
{
    use RefreshDatabase;

    public function test_enums_endpoint_exposes_order_statuses_and_payment_methods(): void
    {
        $data = $this->getJson('/api/orders/enums')->assertSuccessful()->json('data');

        $statusValues = array_column($data['orderStatuses'], 'value');
        $this->assertContains('received', $statusValues);
        $this->assertContains('shipped', $statusValues);

        $paymentValues = array_column($data['paymentMethods'], 'value');
        $this->assertContains('cash_on_delivery', $paymentValues);

        // Each option carries a human-readable label.
        $this->assertSame('Received', collect($data['orderStatuses'])->firstWhere('value', 'received')['label']);
        $this->assertSame('Cash on Delivery', collect($data['paymentMethods'])->firstWhere('value', 'cash_on_delivery')['label']);
    }
}
