import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Phone, User, Truck, ShieldCheck } from "lucide-react";
import { formatINR } from "../utils/priceUtils";

export default function ShippingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const checkoutItems = location.state?.checkoutItems || [];

  /* CALCULATIONS */

  const subtotal = checkoutItems.reduce(
    (sum, item) =>
      sum +
      (Number(item.price) || 0) *
        92 *
        (Number(item.quantity) || 1),
    0
  );

  const discount = checkoutItems.reduce(
    (sum, item) =>
      sum +
      ((Number(item.price) || 0) *
        92 *
        (Number(item.discountPercentage) || 0) *
        (Number(item.quantity) || 1)) /
        100,
    0
  );

  const shipping = subtotal > 2000 ? 0 : 199;
  const total = subtotal - discount + shipping;

  /* FORM STATE */

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  /* SAVED ADDRESSES */

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses")) || [];
    setSavedAddresses(stored);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* VALIDATION */

  const validateForm = () => {
    if (selectedAddressId) return true;

    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name required";
    if (!form.address.trim()) newErrors.address = "Address required";
    if (!form.city.trim()) newErrors.city = "City required";
    if (!form.zip.trim()) newErrors.zip = "PIN code required";

    if (!/^[0-9]{6}$/.test(form.zip))
      newErrors.zip = "Enter valid 6 digit PIN";

    if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Enter valid 10 digit phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* CONTINUE */

  const handleContinue = () => {
    if (!validateForm()) return;

    navigate("/payment", {
      state: {
        checkoutItems,
        shippingData: form,
        pricing: { subtotal, discount, shipping, total },
      },
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <CheckoutSteps current={2} />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">

          {/* SHIPPING FORM */}

          <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-100">

            <h2 className="text-xl font-semibold text-slate-800 mb-8">
              Shipping Address
            </h2>

            {/* SAVED ADDRESSES */}

            {savedAddresses.length > 0 && (
              <div className="mb-8">

                <h3 className="text-sm font-semibold text-slate-700 mb-4">
                  Saved Addresses
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddressId(addr.id);

                        setForm((prev) => ({
                          ...prev,
                          address: addr.address,
                          city: addr.city,
                          zip: addr.zip,
                        }));
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition
                      ${
                        selectedAddressId === addr.id
                          ? "border-indigo-500 bg-indigo-50"
                          : "border-slate-200 bg-slate-50 hover:shadow"
                      }`}
                    >
                      <p className="font-medium text-slate-800">
                        {addr.address}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        {addr.city}, {addr.zip}, {addr.country}
                      </p>

                      {selectedAddressId === addr.id && (
                        <p className="text-xs text-indigo-600 mt-2 font-medium">
                          ✓ Selected Address
                        </p>
                      )}
                    </div>
                  ))}

                </div>

                {selectedAddressId && (
                  <button
                    onClick={() => setSelectedAddressId(null)}
                    className="text-sm text-indigo-600 mt-4 underline"
                  >
                    Use a different address
                  </button>
                )}

              </div>
            )}

            {/* FORM (HIDDEN IF ADDRESS SELECTED) */}

            {!selectedAddressId && (
              <>
                <div className="grid md:grid-cols-2 gap-5">

                  <Input
                    icon={<User size={18} />}
                    name="firstName"
                    value={form.firstName}
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                  {errors.firstName && <Error text={errors.firstName} />}

                  <Input
                    icon={<User size={18} />}
                    name="lastName"
                    value={form.lastName}
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                  {errors.lastName && <Error text={errors.lastName} />}

                </div>

                <div className="mt-5">
                  <Input
                    icon={<MapPin size={18} />}
                    name="address"
                    value={form.address}
                    placeholder="Street Address"
                    onChange={handleChange}
                  />
                  {errors.address && <Error text={errors.address} />}
                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-5">

                  <div>
                    <Input
                      name="city"
                      value={form.city}
                      placeholder="City"
                      onChange={handleChange}
                    />
                    {errors.city && <Error text={errors.city} />}
                  </div>

                  <div>
                    <Input
                      name="zip"
                      value={form.zip}
                      placeholder="PIN Code"
                      onChange={handleChange}
                    />
                    {errors.zip && <Error text={errors.zip} />}
                  </div>

                </div>

                <div className="mt-5">
                  <Input
                    icon={<Phone size={18} />}
                    name="phone"
                    value={form.phone}
                    placeholder="Phone Number"
                    onChange={handleChange}
                  />
                  {errors.phone && <Error text={errors.phone} />}
                </div>
              </>
            )}

            <div className="mt-8 bg-indigo-50 text-indigo-700 p-4 rounded-lg flex items-center gap-3 text-sm">
              <Truck size={18} />
              Estimated Delivery: 3–5 Business Days
            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:sticky top-28 h-fit">

            <h3 className="text-lg font-semibold text-slate-800 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">

              {checkoutItems.map((p) => (
                <div key={p._id} className="flex gap-3 items-center">

                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-14 h-14 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">
                      {p.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      Qty: {p.quantity || 1}
                    </p>
                  </div>

                  <span className="text-sm font-semibold">
                    ₹ {formatINR(p.price * 92 * (p.quantity || 1))}
                  </span>

                </div>
              ))}

            </div>

            <div className="border-t pt-4 space-y-3 text-sm">

              <PriceRow label="Subtotal" value={subtotal} />

              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹ {formatINR(discount)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `₹${formatINR(shipping)}`}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>Total</span>
                <span>₹ {formatINR(total)}</span>
              </div>

            </div>

            <button
              onClick={handleContinue}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl cursor-pointer font-semibold"
            >
              Continue to Payment →
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

/* INPUT */

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-3 border border-slate-200 rounded-lg px-3 py-3 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 transition">
      {icon && <span className="text-slate-400">{icon}</span>}
      <input
        {...props}
        placeholder={props.placeholder}
        className="w-full outline-none text-sm bg-transparent placeholder:text-slate-400"
      />
    </div>
  );
}

/* ERROR */

function Error({ text }) {
  return <p className="text-red-500 text-xs mt-1">{text}</p>;
}

/* PRICE ROW */

function PriceRow({ label, value }) {
  return (
    <div className="flex justify-between text-slate-600">
      <span>{label}</span>
      <span>₹ {formatINR(value)}</span>
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
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold ${
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
                <div className="w-4 sm:w-10 h-0.5 bg-slate-300" />
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}