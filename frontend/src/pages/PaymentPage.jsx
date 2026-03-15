import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Truck,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import OrderSuccessModal from "../components/OrderSuccessModal";

const USD_TO_INR = 92;

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    checkoutItems = [],
    shippingData = {},
    pricing = {},
  } = location.state || {};

  const { subtotal = 0, discount = 0, shipping = 0, total = 0 } = pricing;

  const [method, setMethod] = useState("card");
  const [successOpen, setSuccessOpen] = useState(false);

  const handlePayment = () => {
  setSuccessOpen(true);
};

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <CheckoutSteps current={3} />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">
          {/* PAYMENT SECTION */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 sm:p-10">
            <h2 className="text-xl font-semibold text-slate-800 mb-8">
              Select Payment Method
            </h2>

            <div className="space-y-4">
              {/* CARD */}

              <PaymentCard
                active={method === "card"}
                icon={<CreditCard size={18} />}
                title="Credit / Debit Card"
                description="Pay securely using your card"
                onClick={() => setMethod("card")}
              />

              {method === "card" && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Card Number" />
                  <Input placeholder="Cardholder Name" />
                  <Input placeholder="Expiry Date (MM/YY)" />
                  <Input placeholder="CVV" />
                </div>
              )}

              {/* UPI */}

              <PaymentCard
                active={method === "upi"}
                icon={<Smartphone size={18} />}
                title="UPI Payment"
                description="Pay using any UPI app"
                onClick={() => setMethod("upi")}
              />

              {method === "upi" && (
                <div className="mt-6">
                  <Input placeholder="example@upi" />
                </div>
              )}

              {/* COD */}

              <PaymentCard
                active={method === "cod"}
                icon={<Truck size={18} />}
                title="Cash on Delivery"
                description="Pay when the product arrives"
                onClick={() => setMethod("cod")}
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 mt-10">
              <ShieldCheck size={16} />
              Secure payment protected by encryption
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky top-28 h-fit">
            <h3 className="text-lg font-semibold mb-6 text-slate-800">
              Order Summary
            </h3>

            {/* SHIPPING ADDRESS */}

            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <MapPin size={16} />
                Delivery Address
              </div>

              <p className="text-sm text-slate-600">
                {shippingData.firstName} {shippingData.lastName}
              </p>

              <p className="text-sm text-slate-600">{shippingData.address}</p>

              <p className="text-sm text-slate-600">
                {shippingData.city} - {shippingData.zip}
              </p>

              <p className="text-sm text-slate-600">{shippingData.phone}</p>
            </div>

            {/* PRODUCT LIST */}

            <div className="space-y-4 mb-6">
              {checkoutItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    className="w-12 h-12 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {item.title}
                    </p>

                    <p className="text-xs text-slate-400">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <span className="text-sm font-semibold">
                    ₹{" "}
                    {(
                      item.price *
                      USD_TO_INR *
                      (item.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* PRICE DETAILS */}

            <div className="space-y-3 text-sm border-t pt-4">
              <PriceRow label="Subtotal" value={subtotal} />

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹ {discount.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>

              <div className="flex justify-between text-lg font-bold pt-3 border-t">
                <span>Total</span>
                <span>₹ {total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* PAY BUTTON */}

            <button
              onClick={handlePayment}
              className="mt-6 w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-lg transition hover:scale-[1.01]"
            >
              Pay ₹ {total.toLocaleString("en-IN")}
            </button>
          </div>
        </div>

        <OrderSuccessModal
          open={successOpen}
          onClose={() =>
            navigate("/confirmation", {
              state: {
                checkoutItems,
                shippingData,
                pricing,
                paymentMethod: method,
              },
            })
          }
        />
      </div>
    </div>
  );
}

/* PAYMENT METHOD CARD */

function PaymentCard({ active, icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition
      ${active ? "bg-indigo-50 shadow-sm" : "bg-slate-50 hover:bg-slate-100"}`}
    >
      <div className="text-indigo-600">{icon}</div>

      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

/* INPUT */

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none
      focus:ring-2 focus:ring-indigo-200 focus:bg-white transition"
    />
  );
}

/* PRICE ROW */

function PriceRow({ label, value }) {
  return (
    <div className="flex justify-between text-slate-600">
      <span>{label}</span>
      <span>₹ {value.toLocaleString("en-IN")}</span>
    </div>
  );
}

/* CHECKOUT STEPS */

function CheckoutSteps({ current }) {
  const steps = ["Order", "Shipping", "Payment", "Confirm"];

  return (
    <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto py-2">
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6 min-w-max px-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active = stepNumber <= current;

          return (
            <div key={step} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {stepNumber}
              </div>

              <span
                className={`text-xs sm:text-sm font-medium ${
                  active ? "text-indigo-600" : "text-slate-400"
                }`}
              >
                {step}
              </span>

              {index !== steps.length - 1 && (
                <div className="w-4 sm:w-10 h-0.5 bg-slate-200" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
