@include('emails.orders.partials._shell', [
    'order'        => $order,
    'orderItems'   => $orderItems,
    'headerKicker' => 'REFUND ISSUED',
    'pillLabel'    => 'REFUNDED',
    'pillBg'       => '#FF5A1F',
    'headline'     => 'REFUND<br>ISSUED.',
    'bodyCopy'     => 'Hi ' . e($order->first_name) . ' — we\'ve issued a refund of <strong style="color:#FF5A1F;">$' . number_format((float) $order->subtotal, 2) . '</strong> for this order. Depending on your bank, the funds should appear in 3–10 business days.',
])
