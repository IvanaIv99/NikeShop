<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace;border:1px solid #1d1d1d;">
  @foreach ($orderItems as $item)
  <tr>
    <td style="padding:12px 14px;color:#f5f5f0;font-size:13px;border-bottom:1px dashed #1a1a1a;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;">
      {{ $item->product_name }}
      <div style="color:#7a7a75;font-size:10.5px;letter-spacing:.12em;margin-top:3px;font-family:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;">SZ {{ $item->size_value }} · {{ strtoupper($item->color_name) }}</div>
    </td>
    <td align="center" style="padding:12px 14px;color:#bdbdb6;font-size:13px;border-bottom:1px dashed #1a1a1a;width:60px;">×{{ $item->quantity }}</td>
    <td align="right" style="padding:12px 14px;color:#f5f5f0;font-size:13px;border-bottom:1px dashed #1a1a1a;width:100px;">${{ number_format((float) $item->total, 2) }}</td>
  </tr>
  @endforeach
  <tr>
    <td style="padding:14px;color:#FF5A1F;font-size:11px;letter-spacing:.24em;">TOTAL</td>
    <td></td>
    <td align="right" style="padding:14px;color:#FF5A1F;font-size:18px;font-weight:700;">${{ number_format((float) $order->subtotal, 2) }}</td>
  </tr>
</table>

<div style="font-family:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;margin-top:24px;">
  <div style="color:#7a7a75;font-size:10px;letter-spacing:.24em;">// SHIP&nbsp;TO</div>
  <div style="color:#f5f5f0;font-size:13px;line-height:1.6;margin-top:8px;">
    {{ strtoupper($order->first_name . ' ' . $order->last_name) }}<br>
    {{ $order->address }}<br>
    {{ strtoupper($order->city) }} · {{ strtoupper($order->country) }}
  </div>
</div>
