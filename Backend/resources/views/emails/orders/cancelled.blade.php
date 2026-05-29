@include('emails.orders.partials._shell', [
    'order'        => $order,
    'orderItems'   => $orderItems,
    'headerKicker' => 'ORDER CANCELLED',
    'pillLabel'    => 'CANCELLED',
    'pillBg'       => '#8A8A85',
    'headline'     => 'ORDER<br>CANCELLED.',
    'bodyCopy'     => 'Hi ' . e($order->first_name) . ' — your order has been cancelled. You won\'t be charged. If this was a mistake, reply to this email and we\'ll help sort it out.',
])
