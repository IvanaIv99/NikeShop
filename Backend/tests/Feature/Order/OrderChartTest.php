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

        $this->makeOrder(100, $now);
        $this->makeOrder(50, $now->subHours(2));
        $this->makeOrder(200, $now->subWeek());
        $this->makeOrder(300, CarbonImmutable::create(2026, 1, 10, 9, 0, 0));

        $data = $this->getJson('/api/orders/chart')->assertSuccessful()->json('data');

        $h = $data['ranges']['24h'];
        $w = $data['ranges']['12w'];
        $y = $data['ranges']['ytd'];

        $this->assertCount(24, $h);
        $this->assertCount(12, $w);
        $this->assertCount(6, $y);

        $this->assertSame(150.0, (float) array_sum(array_column($h, 'revenue')));
        $this->assertSame(100.0, (float) $h[23]['revenue']);
        $this->assertSame(0.0, (float) $h[0]['revenue']);

        $this->assertSame(150.0, (float) $w[11]['revenue']);
        $this->assertSame(200.0, (float) $w[10]['revenue']);
        $this->assertSame(350.0, (float) array_sum(array_column($w, 'revenue')));

        $this->assertSame(300.0, (float) $y[0]['revenue']);
        $this->assertSame(350.0, (float) $y[5]['revenue']);
    }

    public function test_activity_returns_the_six_most_recent_orders_newest_first_per_range(): void
    {
        $now = CarbonImmutable::now();
        for ($i = 0; $i < 8; $i++) {
            $this->makeOrder(10 + $i, $now->subMinutes($i));
        }

        $activity = $this->getJson('/api/orders/chart')->assertSuccessful()->json('data.activity');

        foreach (['24h', '12w', 'ytd'] as $range) {
            $this->assertCount(6, $activity[$range]);
            $this->assertSame('10.00', (string) $activity[$range][0]['subtotal']);
            $this->assertArrayHasKey('firstName', $activity[$range][0]);
            $this->assertArrayHasKey('status', $activity[$range][0]);
            $this->assertArrayHasKey('createdAt', $activity[$range][0]);
        }
    }

    public function test_activity_is_scoped_to_the_window_of_each_range(): void
    {
        $now = CarbonImmutable::now();

        $this->makeOrder(100, $now);
        $this->makeOrder(200, $now->subWeek());
        $this->makeOrder(300, CarbonImmutable::create(2026, 1, 10, 9, 0, 0));

        $activity = $this->getJson('/api/orders/chart')->assertSuccessful()->json('data.activity');

        $this->assertCount(1, $activity['24h']);
        $this->assertCount(2, $activity['12w']);
        $this->assertCount(3, $activity['ytd']);
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
