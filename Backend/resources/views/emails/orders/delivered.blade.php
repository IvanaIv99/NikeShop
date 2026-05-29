@include('emails.orders.partials._shell', [
    'order'        => $order,
    'orderItems'   => $orderItems,
    'headerKicker' => 'DELIVERY CONFIRMED',
    'pillLabel'    => 'DELIVERED',
    'pillBg'       => '#00C896',
    'headline'     => 'DELIVERED.<br>ENJOY.',
    'bodyCopy'     => 'Hi ' . e($order->first_name) . ' — your order has landed. We hope it fits like it should. If anything\'s off, hit reply and we\'ll sort it out.',
])
