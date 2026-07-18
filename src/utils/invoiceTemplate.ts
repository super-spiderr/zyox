import { Order } from '@/api/order';
import { palette } from '@/theme';

interface CustomerDetails {
  name: string;
  phone: string;
}

export const generateInvoiceHTML = (order: Order, customer: CustomerDetails): string => {
  const itemsTotal = order.orderItems?.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) || 0;
  const grandTotal = Math.max(0, itemsTotal - (order.discountAmount || 0));
  const balanceDue = grandTotal - (order.advanceAmount || 0);
  const formattedDate = order.eventDate ? order.eventDate.split('T')[0] : '';
  const orderIdShort = order._id ? order._id.substring(order._id.length - 6).toUpperCase() : 'N/A';

  const rowsHTML = order.orderItems?.map((item, index) => {
    const itemTotal = item.quantity * item.unitPrice;
    return `
      <tr>
        <td class="text-center">${index + 1}</td>
        <td>
          <span class="item-name">${item.name}</span>
          <span class="item-badge ${item.type === 'PACKAGE' ? 'bg-package' : 'bg-product'}">
            ${item.type === 'PACKAGE' ? 'Combo' : 'Product'}
          </span>
        </td>
        <td class="text-right">₹${item.unitPrice.toLocaleString()}</td>
        <td class="text-center">${item.quantity}</td>
        <td class="text-right font-semibold">₹${itemTotal.toLocaleString()}</td>
      </tr>
    `;
  }).join('') || '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice - ZYOX-${orderIdShort}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: ${palette.invoiceText};
          margin: 0;
          padding: 20px;
          line-height: 1.4;
          font-size: 14px;
          background-color: ${palette.white};
        }
        .invoice-box {
          max-width: 800px;
          margin: auto;
          padding: 30px;
          border: 1px solid ${palette.invoiceBorder};
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
          background-color: ${palette.white};
          border-radius: 8px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid ${palette.primary500};
          padding-bottom: 20px;
          margin-bottom: 25px;
        }
        .brand-title {
          font-size: 28px;
          font-weight: bold;
          color: ${palette.primary500};
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .brand-subtitle {
          font-size: 12px;
          color: ${palette.invoiceMuted};
          margin: 4px 0 0 0;
        }
        .invoice-info {
          text-align: right;
        }
        .invoice-title {
          font-size: 22px;
          font-weight: bold;
          color: ${palette.invoiceText};
          margin: 0 0 8px 0;
        }
        .info-text {
          font-size: 13px;
          color: ${palette.invoiceSubtle};
          margin: 3px 0;
        }
        .details-grid {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
          gap: 20px;
        }
        .details-block {
          flex: 1;
          background-color: ${palette.gray50};
          border: 1px solid ${palette.gray200};
          border-radius: 6px;
          padding: 15px;
        }
        .block-title {
          font-size: 12px;
          text-transform: uppercase;
          color: ${palette.gray500};
          font-weight: bold;
          margin-top: 0;
          margin-bottom: 10px;
          border-bottom: 1px solid ${palette.gray200};
          padding-bottom: 5px;
        }
        .block-row {
          margin: 5px 0;
          font-size: 13px;
        }
        .block-label {
          font-weight: 600;
          color: ${palette.gray600};
        }
        .status-badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-pending { background-color: ${palette.warning50}; color: ${palette.warning600}; }
        .status-confirmed { background-color: ${palette.primary100}; color: ${palette.primary500}; }
        .status-completed { background-color: ${palette.mint100}; color: ${palette.emerald600}; }
        .status-cancelled { background-color: ${palette.error100}; color: ${palette.error600}; }
        .status-paid { background-color: ${palette.mint100}; color: ${palette.emerald600}; }
        .status-partial { background-color: ${palette.warning50}; color: ${palette.warning600}; }
        .status-unpaid { background-color: ${palette.error100}; color: ${palette.error600}; }
        table {
          width: 100%;
          line-height: inherit;
          text-align: left;
          border-collapse: collapse;
          margin-bottom: 25px;
        }
        th {
          background-color: ${palette.gray100};
          border-bottom: 1px solid ${palette.gray200};
          color: ${palette.gray700};
          font-weight: bold;
          padding: 10px;
          font-size: 12px;
          text-transform: uppercase;
        }
        td {
          padding: 12px 10px;
          border-bottom: 1px solid ${palette.invoiceBorder};
          vertical-align: middle;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-semibold { font-weight: 600; }
        .item-name {
          font-weight: 600;
          color: ${palette.gray900};
        }
        .item-badge {
          display: inline-block;
          font-size: 9px;
          padding: 2px 5px;
          border-radius: 3px;
          margin-left: 6px;
          color: ${palette.white};
          font-weight: bold;
          vertical-align: middle;
        }
        .bg-package { background-color: ${palette.purple500}; }
        .bg-product { background-color: ${palette.emerald500}; }
        .summary-wrapper {
          display: flex;
          justify-content: flex-end;
        }
        .summary-box {
          width: 300px;
          background-color: ${palette.gray50};
          border: 1px solid ${palette.gray200};
          border-radius: 6px;
          padding: 15px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin: 6px 0;
          font-size: 13px;
        }
        .summary-total {
          border-top: 1px solid ${palette.gray300};
          padding-top: 8px;
          margin-top: 8px;
          font-weight: bold;
          font-size: 15px;
          color: ${palette.primary500};
        }
        .notes-section {
          margin-top: 30px;
          border-top: 1px solid ${palette.gray200};
          padding-top: 15px;
        }
        .notes-title {
          font-size: 13px;
          font-weight: bold;
          color: ${palette.gray700};
          margin-bottom: 6px;
        }
        .notes-content {
          font-size: 12px;
          color: ${palette.invoiceMuted};
          white-space: pre-line;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          color: ${palette.gray400};
          font-size: 12px;
          border-top: 1px dotted ${palette.gray200};
          padding-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-box">
        <!-- Logo and Invoice Meta -->
        <div class="header">
          <div>
            <h1 class="brand-title">Zyox</h1>
            <p class="brand-subtitle">Catering & Hospitality Managers</p>
          </div>
          <div class="invoice-info">
            <h2 class="invoice-title">CATERING BILL</h2>
            <p class="info-text"><strong>Bill ID:</strong> ZYOX-${orderIdShort}</p>
            <p class="info-text"><strong>Date Issued:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <!-- Customer & Event Grid -->
        <div class="details-grid">
          <!-- Client details -->
          <div class="details-block">
            <h3 class="block-title">Customer Information</h3>
            <div class="block-row">
              <span class="block-label">Name:</span> ${customer.name}
            </div>
            <div class="block-row">
              <span class="block-label">Phone:</span> ${customer.phone || 'N/A'}
            </div>
            <div class="block-row">
              <span class="block-label">Payment Status:</span>
              <span class="status-badge ${order.paymentStatus === 'PAID' ? 'status-paid' : order.paymentStatus === 'PARTIAL' ? 'status-pending' : 'status-unpaid'}">
                ${order.paymentStatus}
              </span>
            </div>
          </div>

          <!-- Event details -->
          <div class="details-block">
            <h3 class="block-title">Event Information</h3>
            <div class="block-row">
              <span class="block-label">Event:</span> ${order.eventName}
            </div>
            <div class="block-row">
              <span class="block-label">Date:</span> ${formattedDate}
            </div>
            <div class="block-row">
              <span class="block-label">Guest Count:</span> ${order.guestCount} Pax
            </div>
            <div class="block-row">
              <span class="block-label">Order Status:</span>
              <span class="status-badge ${order.orderStatus === 'CONFIRMED' ? 'status-confirmed' : order.orderStatus === 'COMPLETED' ? 'status-completed' : order.orderStatus === 'CANCELLED' ? 'status-cancelled' : 'status-pending'}">
                ${order.orderStatus}
              </span>
            </div>
          </div>
        </div>

        <!-- Table Grid -->
        <table>
          <thead>
            <tr>
              <th style="width: 8%" class="text-center">#</th>
              <th style="width: 50%">Item / Combo</th>
              <th style="width: 15%" class="text-right">Rate</th>
              <th style="width: 12%" class="text-center">Qty</th>
              <th style="width: 15%" class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>

        <!-- Summary -->
        <div class="summary-wrapper">
          <div class="summary-box">
            <div class="summary-row">
              <span>Items Total:</span>
              <span>₹${itemsTotal.toLocaleString()}</span>
            </div>
            ${order.discountAmount > 0 ? `
            <div class="summary-row" style="color: ${palette.error600};">
              <span>Discount Amount:</span>
              <span>-₹${order.discountAmount.toLocaleString()}</span>
            </div>
            ` : ''}
            <div class="summary-row summary-total">
              <span>Grand Total:</span>
              <span>₹${grandTotal.toLocaleString()}</span>
            </div>
            <div class="summary-row">
              <span>Advance Paid:</span>
              <span>₹${(order.advanceAmount || 0).toLocaleString()}</span>
            </div>
            <div class="summary-row" style="font-weight: ${balanceDue > 0 ? '600' : 'normal'}; color: ${balanceDue > 0 ? palette.error600 : palette.emerald600};">
              <span>Balance Due:</span>
              <span>₹${balanceDue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        ${order.notes ? `
        <div class="notes-section">
          <h4 class="notes-title">Special Instructions</h4>
          <p class="notes-content">${order.notes}</p>
        </div>
        ` : ''}

        <!-- Footer -->
        <div class="footer">
          <p>Thank you for choosing Zyox Catering Services!</p>
          <p>For support, please contact help@zyox.com</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
