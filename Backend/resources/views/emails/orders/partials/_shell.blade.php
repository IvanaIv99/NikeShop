<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>{{ $headerKicker }}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a08;color:#f5f5f0;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#0a0a08;">{{ $headerKicker }} · ORDER #{{ $order->id }}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a08;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#0e0e0c;border:1px solid #1d1d1d;">

          <tr>
            <td style="padding:20px 24px;border-bottom:1px solid #1d1d1d;font-family:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="right" style="color:#f5f5f0;font-size:11px;letter-spacing:.32em;font-weight:700;">NIKE&middot;SHOP</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 24px 8px 24px;font-family:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;">
              <span style="display:inline-block;padding:6px 10px;background:{{ $pillBg }};color:#0a0a08;font-size:10px;letter-spacing:.28em;font-weight:700;">{{ $pillLabel }}</span>
              <div style="color:#7a7a75;font-size:10px;letter-spacing:.24em;margin-top:18px;">// ORDER&nbsp;#{{ $order->id }}</div>
            </td>
          </tr>

          <tr>
            <td style="padding:8px 24px 4px 24px;">
              <h1 style="margin:0;color:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:30px;line-height:1.1;letter-spacing:-.01em;font-weight:800;">{!! $headline !!}</h1>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 24px 24px 24px;">
              <p style="margin:0;color:#bdbdb6;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;">{!! $bodyCopy !!}</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 24px 24px 24px;">
              @include('emails.orders.partials._summary', ['order' => $order, 'orderItems' => $orderItems])
            </td>
          </tr>

          <tr>
            <td style="padding:18px 24px;border-top:1px solid #1d1d1d;font-family:'JetBrains Mono',ui-monospace,Menlo,Consolas,monospace;">
              <div style="color:#7a7a75;font-size:10px;letter-spacing:.24em;">// QUESTIONS? REPLY TO THIS EMAIL.</div>
              <div style="color:#4a4a45;font-size:10px;letter-spacing:.24em;margin-top:8px;">&copy; {{ date('Y') }} NIKE&middot;SHOP &middot; ALL RIGHTS RESERVED</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
