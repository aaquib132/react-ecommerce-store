import { useState } from "react";
import {
  User,
  MapPin,
  Package,
  Mail,
  Phone,
  Camera
} from "lucide-react";

export default function ProfilePage() {

  const [activeTab, setActiveTab] = useState("profile");

  const [form, setForm] = useState({
    firstName: "Aaquib",
    lastName: "Ahmad",
    birthDate: "",
    phone: "9000000000",
    email: "aaqib@example.com",
    address: "Gandhi Nagar",
    city: "Ahmedabad",
    zip: "380001",
    country: "India"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 flex items-center justify-between">

          <div className="flex items-center gap-5">

            <div className="relative group">

              <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold">
                {form.firstName.charAt(0)}
              </div>

              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">

                <Camera size={16} className="text-white"/>

              </div>

            </div>

            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                {form.firstName} {form.lastName}
              </h1>

              <p className="text-sm text-slate-500">
                Manage your account settings
              </p>
            </div>

          </div>

          <div className="hidden md:flex gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              {form.email}
            </div>

            <div className="flex items-center gap-2">
              <Phone size={14} />
              {form.phone}
            </div>
          </div>

        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* SIDEBAR */}

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2 sm:p-3 h-fit flex lg:flex-col gap-2 overflow-x-auto scrollbar-hide">

            <SidebarItem
              icon={<User size={18}/>}
              label="Profile Details"
              active={activeTab==="profile"}
              onClick={()=>setActiveTab("profile")}
            />

            <SidebarItem
              icon={<MapPin size={18}/>}
              label="Saved Address"
              active={activeTab==="address"}
              onClick={()=>setActiveTab("address")}
            />

            <SidebarItem
              icon={<Package size={18}/>}
              label="Order History"
              active={activeTab==="orders"}
              onClick={()=>setActiveTab("orders")}
            />

          </div>

          {/* CONTENT */}

          <div className="lg:col-span-3 space-y-8">

            {/* PROFILE DETAILS */}

            {activeTab === "profile" && (

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">

                <h2 className="text-lg font-semibold mb-6">
                  Personal Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-4">

                  <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange}/>
                  <Input label="Last Name" name="lastName" value={form.lastName} onChange={handleChange}/>

                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">

                  <Input label="Birth Date" type="date" name="birthDate" value={form.birthDate} onChange={handleChange}/>
                  <Input label="Phone" name="phone" value={form.phone} onChange={handleChange}/>

                </div>

                <Input label="Email Address" name="email" value={form.email} onChange={handleChange}/>

                <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
                  Save Changes
                </button>

              </div>

            )}

            {/* ADDRESS */}

            {activeTab === "address" && (

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">

                <h2 className="text-lg font-semibold mb-6">
                  Shipping Address
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-4">

                  <Input label="Street Address" name="address" value={form.address} onChange={handleChange}/>
                  <Input label="City" name="city" value={form.city} onChange={handleChange}/>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  <Input label="ZIP Code" name="zip" value={form.zip} onChange={handleChange}/>
                  <Input label="Country" name="country" value={form.country} onChange={handleChange}/>

                </div>

                <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition">
                  Save Address
                </button>

              </div>

            )}

            {/* ORDERS */}

            {activeTab === "orders" && (

              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">

                <h2 className="text-lg font-semibold mb-6">
                  Order History
                </h2>

                <div className="space-y-4">

                  <OrderCard/>
                  <OrderCard/>
                  <OrderCard/>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

function Input({label,...props}){

  return(
    <div>

      <label className="text-xs text-slate-500">{label}</label>

      <input
      {...props}
      className="mt-1 border border-slate-200 rounded-lg p-3 w-full text-sm
      focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition"
      />

    </div>
  )

}

function SidebarItem({icon,label,active,onClick}){

  return(
    <div
    onClick={onClick}
    className={`flex items-center gap-2 sm:gap-3 px-3 py-2 sm:p-3 rounded-lg cursor-pointer text-sm transition whitespace-nowrap
    ${active
      ? "bg-indigo-50 text-indigo-600"
      : "text-slate-600 hover:bg-slate-50"
    }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  )

}

function OrderCard(){

  return(

    <div className="border border-slate-100 rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition">

      <div>
        <p className="font-medium">Order #847382</p>
        <p className="text-sm text-slate-500">Placed on 12 March 2026</p>
      </div>

      <div className="text-right">
        <p className="font-semibold">₹2,499</p>
        <p className="text-xs text-green-600">Delivered</p>
      </div>

    </div>

  )

}