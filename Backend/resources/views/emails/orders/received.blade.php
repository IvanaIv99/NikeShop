@include('emails.orders.partials._shell', [
    'order'        => $order,
    'orderItems'   => $orderItems,
    'headerKicker' => 'ORDER RECEIVED',
    'pillLabel'    => 'RECEIVED',
    'pillBg'       => '#FF5A1F',
    'headline'     => 'ORDER LOGGED.<br>WE\'VE GOT YOU.',
    'bodyCopy'     => 'Hi ' . e($order->first_name) . ' — your order is in our queue and being prepared for dispatch. We\'ll send you another note the moment it ships.',
])
