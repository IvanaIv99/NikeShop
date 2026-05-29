@include('emails.orders.partials._shell', [
    'order'        => $order,
    'orderItems'   => $orderItems,
    'headerKicker' => 'SHIPPING NOTICE',
    'pillLabel'    => 'SHIPPED',
    'pillBg'       => '#FF5A1F',
    'headline'     => 'YOUR ORDER<br>IS IN TRANSIT.',
    'bodyCopy'     => 'Hi ' . e($order->first_name) . ' — your package left the warehouse and is now en route. We\'ll let you know the moment it lands.',
])
