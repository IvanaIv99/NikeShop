<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Packing slip — Order #ORD-{{ $order->id }}</title>
  <style>
    @page { margin: 14mm 14mm 18mm; }
    * { box-sizing: border-box; }
    body {
      font-family: 'Helvetica', sans-serif;
      color: #000;
      font-size: 11px;
      line-height: 1.45;
      margin: 0;
    }
    .head {
      border-bottom: 1.5px solid #000;
      padding-bottom: 10px;
      margin-bottom: 14px;
    }
    .head table { width: 100%; border-collapse: collapse; }
    .brand {
      font-size: 22px;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .brand-sub {
      font-family: 'Courier', monospace;
      font-size: 11px;
      color: #444;
      margin-top: 3px;
      letter-spacing: 1px;
    }
    .meta {
      font-family: 'Courier', monospace;
      font-size: 10px;
      color: #000;
      text-align: right;
      line-height: 1.7;
    }
    .meta-label {
      display: inline-block;
      min-width: 64px;
      color: #666;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      font-size: 9px;
      margin-right: 4px;
    }
    .addr { margin-bottom: 16px; }
    .addr-grid { width: 100%; border-collapse: collapse; }
    .addr-cell { vertical-align: top; width: 50%; padding-right: 24px; }
    .addr-label {
      font-family: 'Courier', monospace;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1.4px;
      color: #666;
      margin-bottom: 5px;
    }
    .addr-name { font-weight: bold; margin-bottom: 2px; font-size: 12px; }
    .addr-note { font-style: italic; color: #333; }

    table.items {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      font-size: 11px;
    }
    table.items th {
      text-align: left;
      font-family: 'Courier', monospace;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1.4px;
      color: #444;
      border-bottom: 1px solid #000;
      padding: 8px 6px;
      font-weight: normal;
    }
    table.items td {
      border-bottom: 1px solid #ddd;
      padding: 10px 6px;
      vertical-align: top;
    }
    table.items td.thumb { width: 56px; }
    table.items td.thumb img {
      width: 48px;
      height: 36px;
      object-fit: contain;
      background: #f3f3f3;
      border: 1px solid #ddd;
    }
    table.items td.qty,
    table.items td.unit,
    table.items td.tot { text-align: right; font-family: 'Courier', monospace; }
    table.items .nm { font-weight: 500; }
    table.items .sub {
      font-family: 'Courier', monospace;
      color: #555;
      font-size: 10px;
      margin-top: 3px;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .totals {
      width: 50%;
      margin-left: 50%;
      margin-top: 18px;
      border-top: 1.5px solid #000;
      padding-top: 8px;
      font-family: 'Courier', monospace;
      font-size: 11px;
    }
    .totals table { width: 100%; border-collapse: collapse; }
    .totals td { padding: 4px 0; }
    .totals td.label { color: #555; }
    .totals td.val { text-align: right; }
    .totals tr.grand td {
      border-top: 1px solid #000;
      padding-top: 9px;
      font-family: 'Helvetica', sans-serif;
      font-weight: bold;
      font-size: 16px;
    }

    .foot {
      margin-top: 24px;
      padding-top: 10px;
      border-top: 1px solid #ddd;
      font-family: 'Courier', monospace;
      font-size: 9px;
      color: #666;
      text-align: center;
      letter-spacing: 1.4px;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

<div class="head">
  <table>
    <tr>
      <td>
        <div class="brand">NIKESTORE</div>
        <div class="brand-sub">Packing slip · #ORD-{{ $order->id }}</div>
      </td>
      <td class="meta">
        <div><span class="meta-label">Date</span>{{ $order->created_at->format('d M Y · H:i') }}</div>
        <div><span class="meta-label">Status</span>{{ $order->status }}</div>
        <div><span class="meta-label">Payment</span>{{ $paymentMethod }}</div>
      </td>
    </tr>
  </table>
</div>

<div class="addr">
  <table class="addr-grid">
    <tr>
      <td class="addr-cell">
        <div class="addr-label">Ship to</div>
        <div class="addr-name">{{ $order->first_name }} {{ $order->last_name }}</div>
        <div>{{ $order->address }}</div>
        <div>{{ $order->city }}, {{ $order->country }}</div>
        <div>Phone: {{ $order->phone }}</div>
        <div>Email: {{ $order->email }}</div>
      </td>
      @if($order->additional)
      <td class="addr-cell">
        <div class="addr-label">Customer note</div>
        <div class="addr-note">{{ $order->additional }}</div>
      </td>
      @endif
    </tr>
  </table>
</div>

<table class="items">
  <thead>
    <tr>
      <th colspan="2">Item</th>
      <th class="qty" style="width:60px">Qty</th>
      <th class="unit" style="width:90px">Unit</th>
      <th class="tot" style="width:90px">Total</th>
    </tr>
  </thead>
  <tbody>
    @foreach($order->orderItems as $item)
    <tr>
      <td class="thumb">
        @if($item->product_image)
          <img src="{{ $item->product_image }}" alt="">
        @endif
      </td>
      <td>
        <div class="nm">{{ $item->product_name }}</div>
        <div class="sub">size {{ $item->size_value }} · colour {{ $item->color_name }}</div>
      </td>
      <td class="qty">×{{ $item->quantity }}</td>
      <td class="unit">${{ number_format((float)$item->unit_price, 2) }}</td>
      <td class="tot">${{ number_format((float)$item->total, 2) }}</td>
    </tr>
    @endforeach
  </tbody>
</table>

<div class="totals">
  <table>
    <tr><td class="label">Subtotal</td><td class="val">${{ number_format((float)$order->subtotal, 2) }}</td></tr>
    <tr><td class="label">Payment</td><td class="val">{{ $paymentMethod }}</td></tr>
    <tr><td class="label">Status</td><td class="val">{{ $order->status }}</td></tr>
    <tr class="grand"><td class="label">Total</td><td class="val">${{ number_format((float)$order->subtotal, 2) }}</td></tr>
  </table>
</div>

<div class="foot">
  NikeStore · Thank you for your order · #ORD-{{ $order->id }}
</div>

</body>
</html>
