import { useLocation, Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Truck,
  PackageCheck,
  FileDown,
  CheckCircle,
} from "lucide-react";
import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import { useShop } from "../store/ShopContext";

import { formatINR } from "../utils/priceUtils";

export default function OrderConfirm() {
  const location = useLocation();
  const { clearCart } = useShop();

  const [orderId] = useState(
    () => "#" + Math.floor(100000000 + Math.random() * 900000000),
  );

  useEffect(() => {
    if (!location.state) {
      window.location.href = "/";
      return;
    }

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: orderId,
      items: location.state.checkoutItems,
      total: location.state.pricing.total,
      date: new Date().toLocaleDateString(),
      status: "Confirmed",
    };

    const alreadyExists = existingOrders.find(
      (order) => order.id === newOrder.id,
    );

    if (!alreadyExists) {
      localStorage.setItem(
        "orders",
        JSON.stringify([newOrder, ...existingOrders]),
      );
    }

    clearCart();
  }, [clearCart, location]);

  if (!location.state) return null;

  const {
    checkoutItems = [],
    shippingData = {},
    pricing = {},
    paymentMethod = "Online Payment",
  } = location.state || {};

  const { subtotal = 0, shipping = 0, discount = 0, total = 0 } = pricing;

  const downloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MyStore Invoice", 20, 20);

    doc.setFontSize(12);

    doc.text(`Order ID: ${orderId}`, 20, 40);
    doc.text(
      `Customer: ${shippingData.firstName} ${shippingData.lastName}`,
      20,
      50,
    );

    doc.text("Shipping Address:", 20, 65);
    doc.text(
      `${shippingData.address}, ${shippingData.city} - ${shippingData.zip}`,
      20,
      75,
    );

    let y = 95;

    checkoutItems.forEach((item) => {
      doc.text(`${item.title}  (Qty: ${item.quantity || 1})`, 20, y);

      doc.text(
        `₹ ${formatINR(item.price * 92 * (item.quantity || 1))}`,
        150,
        y,
      );

      y += 10;
    });

    y += 10;

    doc.text(`Subtotal: ₹ ${formatINR(subtotal)}`, 20, y);
    y += 10;

    doc.text(
      `Shipping: ${shipping === 0 ? "Free" : "₹" + formatINR(shipping)}`,
      20,
      y,
    );
    y += 10;

    doc.text(`Discount: ₹ ${formatINR(discount)}`, 20, y);
    y += 10;

    doc.text(`Total: ₹ ${formatINR(total)}`, 20, y);

    doc.save("invoice.pdf");
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* SUCCESS HEADER */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle className="text-green-500 w-10 h-10 sm:w-12 sm:h-12 animate-pulse shrink-0" />

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                Order Confirmed
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Your order has been placed successfully.
              </p>
            </div>
          </div>

          <button
            onClick={downloadInvoice}
            className="w-full sm:w-auto flex flex-1 sm:flex-none justify-center items-center gap-2 cursor-pointer bg-indigo-600 text-white px-5 py-3 sm:py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium text-sm sm:text-base"
          >
            <FileDown size={18} className="sm:w-4 sm:h-4" />
            Download Invoice
          </button>
        </div>

        {/* DELIVERY PROGRESS */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 mb-8 sm:mb-10 overflow-x-auto">
          <h2 className="font-semibold text-lg mb-6 sm:mb-10 whitespace-nowrap">
            Delivery Progress
          </h2>

          <div className="relative min-w-125 sm:min-w-0 px-4 sm:px-0">
            <div className="absolute top-5 left-0 right-0 h-1 bg-slate-200" />

            <div className="absolute top-5 left-0 w-1/4 h-1 bg-indigo-600 transition-all duration-1000" />

            <div className="flex justify-between relative">
              <TimelineStep
                icon={<PackageCheck size={18} />}
                label="Confirmed"
                active
              />
              <TimelineStep
                icon={<PackageCheck size={18} />}
                label="Packed"
                active
              />
              <TimelineStep icon={<Truck size={18} />} label="Shipped" />
              <TimelineStep
                icon={<Truck size={18} />}
                label="Out for Delivery"
              />
              <TimelineStep icon={<Truck size={18} />} label="Delivered" />
            </div>
          </div>
        </div>

        {/* ORDER META */}

        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <Meta label="Order Date" value={new Date().toDateString()} />
          <Meta label="Order ID" value={orderId} />
          <Meta label="Payment Method" value={paymentMethod} />
          <Meta label="Delivery Estimate" value="3 - 5 Days" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* PRODUCT LIST */}

          <div className="md:col-span-2 space-y-6">
            {checkoutItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-5 flex items-center gap-4 border border-slate-100 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.thumbnail}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-slate-800">{item.title}</h3>

                  <p className="text-sm text-slate-500">
                    Quantity: {item.quantity || 1}
                  </p>
                </div>

                <span className="font-semibold">
                  ₹ {formatINR(item.price * 92 * (item.quantity || 1))}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-6">
            {/* ORDER SUMMARY */}

            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <h2 className="font-semibold mb-4">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <Row label="Subtotal" value={`₹${formatINR(subtotal)}`} />
                <Row
                  label="Shipping"
                  value={shipping === 0 ? "Free" : `₹${formatINR(shipping)}`}
                />
                <Row label="Discount" value={`₹${formatINR(discount)}`} />
              </div>

              <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{formatINR(total)}</span>
              </div>
            </div>

            {/* SHIPPING ADDRESS */}

            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <h2 className="font-semibold mb-3">Shipping Address</h2>

              <p className="text-sm text-gray-600">
                {shippingData.firstName} {shippingData.lastName}
                <br />
                {shippingData.address}
                <br />
                {shippingData.city} - {shippingData.zip}
                <br />
                India
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                <MapPin size={14} />
                Location confirmed
              </div>
            </div>

            {/* CUSTOMER */}

            <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
              <h2 className="font-semibold mb-3">Customer</h2>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  khan850717@email.com
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  {shippingData.phone}
                </div>
              </div>
            </div>

            {/* CONTINUE SHOPPING */}

            <button
              onClick={() => {
                window.location.href = "/products";
              }}
              className="flex justify-center items-center w-full bg-indigo-600 cursor-pointer text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function Meta({ label, value }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-slate-100 shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium mt-1">{value}</p>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function TimelineStep({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center text-xs text-center">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full border
        ${
          active
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-gray-400 border-gray-300"
        }`}
      >
        {icon}
      </div>

      <span className="mt-2 text-gray-600">{label}</span>
    </div>
  );
}
