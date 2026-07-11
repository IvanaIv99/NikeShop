<?php

declare(strict_types=1);

namespace Tests\Feature\Order;

use App\Domains\Order\Enums\OrderStatus;
use App\Models\Admin;
use App\Models\Order;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

final class OrderChartTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs($this->makeAdmin(), 'sanctum');
        Carbon::setTestNow(CarbonImmutable::create(2026, 6, 15, 12, 30, 0));
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_chart_aggregates_revenue_into_the_correct_buckets_per_range(): void
    {
        $now = CarbonImmutable::now();

        $this->makeOrder(100, $now);                 // this hour, this week, June
        $this->makeOrder(50, $now->subHours(2));     // 2h ago, this week, June
        $this->makeOrder(200, $now->subWeek());      // last week, June, outside 24h
        $this->makeOrder(300, CarbonImmutable::create(2026, 1, 10, 9, 0, 0)); // January only

        $data = $this->getJson('/api/orders/chart')->assertSuccessful()->json('data');

        $h = $data['ranges']['24h'];
        $w = $data['ranges']['12w'];
        $y = $data['ranges']['ytd'];

        // Bucket counts
        $this->assertCount(24, $h);
        $this->assertCount(12, $w);
        $this->assertCount(6, $y); // Jan..Jun

        // 24h: only the two recent orders (100 + 50), last bucket holds the 100
        $this->assertSame(150.0, (float) array_sum(array_column($h, 'revenue')));
        $this->assertSame(100.0, (float) $h[23]['revenue']);
        $this->assertSame(0.0, (float) $h[0]['revenue']); // empty bucket reads zero

        // 12w: this week = 150 (last bucket), previous week = 200, January order excluded
        $this->assertSame(150.0, (float) $w[11]['revenue']);
        $this->assertSame(200.0, (float) $w[10]['revenue']);
        $this->assertSame(350.0, (float) array_sum(array_column($w, 'revenue')));

        // ytd: January bucket = 300, June (current) = 350
        $this->assertSame(300.0, (float) $y[0]['revenue']);
        $this->assertSame(350.0, (float) $y[5]['revenue']);
    }

    public function test_activity_returns_the_six_most_recent_orders_newest_first(): void
    {
        $now = CarbonImmutable::now();
        for ($i = 0; $i < 8; $i++) {
            $this->makeOrder(10 + $i, $now->subMinutes($i));
        }

        $activity = $this->getJson('/api/orders/chart')->assertSuccessful()->json('data.activity');

        $this->assertCount(6, $activity);
        // newest first: the order created at `now` (subtotal 10) is first
        $this->assertSame('10.00', (string) $activity[0]['subtotal']);
        $this->assertArrayHasKey('firstName', $activity[0]);
        $this->assertArrayHasKey('status', $activity[0]);
        $this->assertArrayHasKey('createdAt', $activity[0]);
    }

    private function makeOrder(float $subtotal, CarbonImmutable $at): Order
    {
        $order = new Order();
        $order->forceFill([
            'first_name'     => 'Test',
            'last_name'      => 'Buyer',
            'email'          => 'buyer@example.com',
            'phone'          => '123',
            'country'        => 'Serbia',
            'city'           => 'Belgrade',
            'address'        => 'Somewhere 1',
            'payment_method' => 'card',
            'subtotal'       => $subtotal,
            'status'         => OrderStatus::Received->value,
            'created_at'     => $at,
            'updated_at'     => $at,
        ]);
        $order->timestamps = false;
        $order->save();

        return $order;
    }

    private function makeAdmin(): Admin
    {
        $admin = new Admin();
        $admin->forceFill([
            'first_name'     => 'Admin',
            'last_name'      => 'User',
            'email'          => 'admin@example.com',
            'password'       => bcrypt('secret'),
            'remember_token' => 'token',
        ]);
        $admin->save();

        return $admin;
    }
}
