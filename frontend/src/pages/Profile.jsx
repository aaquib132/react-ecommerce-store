import { useState } from "react";
import {
  User,
  MapPin,
  Package,
  Mail,
  Phone,
  Camera,
  Pencil,
  Trash,
  Plus
} from "lucide-react";

export default function ProfilePage() {

  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    firstName: "Aaquib",
    lastName: "Ahmad",
    birthDate: "",
    phone: "9000000000",
    email: "aaqib@example.com"
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      address: "Gandhi Nagar",
      city: "Ahmedabad",
      zip: "380001",
      country: "India"
    }
  ]);

  const [addressForm, setAddressForm] = useState({
    address: "",
    city: "",
    zip: "",
    country: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const saveAddress = () => {

    if (editingId) {
      setAddresses(
        addresses.map(addr =>
          addr.id === editingId
            ? { ...addr, ...addressForm }
            : addr
        )
      );
    } else {

      const newAddress = {
        id: Date.now(),
        ...addressForm
      };

      setAddresses([...addresses, newAddress]);
    }

    setAddressForm({
      address: "",
      city: "",
      zip: "",
      country: ""
    });

    setEditingId(null);
    setShowAddressForm(false);
  };

  const editAddress = (addr) => {
    setAddressForm(addr);
    setEditingId(addr.id);
    setShowAddressForm(true);
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (

    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white pt-28 pb-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* PROFILE HEADER */}

        <div className="bg-white shadow-lg rounded-3xl p-8 mb-10 flex items-center justify-between">

          <div className="flex items-center gap-6">

            <div className="relative group">

              <div className="w-20 h-20 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                {profile.firstName.charAt(0)}
              </div>

              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Camera size={18} className="text-white"/>
              </div>

            </div>

            <div>

              <h1 className="text-2xl font-semibold text-slate-800">
                {profile.firstName} {profile.lastName}
              </h1>

              <p className="text-slate-500 text-sm">
                Manage your account settings
              </p>

            </div>

          </div>

          <div className="hidden md:flex gap-6 text-sm text-slate-600">

            <div className="flex items-center gap-2">
              <Mail size={16}/>
              {profile.email}
            </div>

            <div className="flex items-center gap-2">
              <Phone size={16}/>
              {profile.phone}
            </div>

          </div>

        </div>

        <div className="grid lg:grid-cols-4 gap-10">

          {/* SIDEBAR */}

          <div className="bg-white rounded-2xl shadow-md p-4 space-y-2 h-fit">

            <SidebarItem
              icon={<User size={18}/>}
              label="Profile"
              active={activeTab==="profile"}
              onClick={()=>setActiveTab("profile")}
            />

            <SidebarItem
              icon={<MapPin size={18}/>}
              label="Addresses"
              active={activeTab==="address"}
              onClick={()=>setActiveTab("address")}
            />

            <SidebarItem
              icon={<Package size={18}/>}
              label="Orders"
              active={activeTab==="orders"}
              onClick={()=>setActiveTab("orders")}
            />

          </div>

          {/* MAIN CONTENT */}

          <div className="lg:col-span-3 space-y-8">

            {activeTab==="profile" && (

              <Card title="Personal Information">

                <div className="grid md:grid-cols-2 gap-5">

                  <Input label="First Name" name="firstName" value={profile.firstName} onChange={handleProfileChange}/>
                  <Input label="Last Name" name="lastName" value={profile.lastName} onChange={handleProfileChange}/>
                  <Input label="Birth Date" type="date" name="birthDate" value={profile.birthDate} onChange={handleProfileChange}/>
                  <Input label="Phone" name="phone" value={profile.phone} onChange={handleProfileChange}/>

                </div>

                <Input label="Email" name="email" value={profile.email} onChange={handleProfileChange}/>

                <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-medium shadow">
                  Save Changes
                </button>

              </Card>

            )}

            {activeTab==="address" && (

              <Card title="Saved Addresses">

                <div className="flex justify-end mb-6">

                  <button
                    onClick={()=>setShowAddressForm(true)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
                  >
                    <Plus size={16}/>
                    Add Address
                  </button>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  {addresses.map(addr => (

                    <div
                      key={addr.id}
                      className="bg-slate-50 rounded-xl p-5 hover:shadow-md transition relative"
                    >

                      <p className="font-medium text-slate-800">
                        {addr.address}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {addr.city}, {addr.zip}, {addr.country}
                      </p>

                      <div className="flex gap-4 absolute top-4 right-4">

                        <button
                          onClick={()=>editAddress(addr)}
                          className="text-indigo-600"
                        >
                          <Pencil size={16}/>
                        </button>

                        <button
                          onClick={()=>deleteAddress(addr.id)}
                          className="text-red-500"
                        >
                          <Trash size={16}/>
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

                {showAddressForm && (

                  <div className="mt-8 bg-slate-50 p-6 rounded-xl space-y-4">

                    <Input label="Street Address" name="address" value={addressForm.address} onChange={handleAddressChange}/>
                    <Input label="City" name="city" value={addressForm.city} onChange={handleAddressChange}/>

                    <div className="grid md:grid-cols-2 gap-4">

                      <Input label="ZIP Code" name="zip" value={addressForm.zip} onChange={handleAddressChange}/>
                      <Input label="Country" name="country" value={addressForm.country} onChange={handleAddressChange}/>

                    </div>

                    <button
                      onClick={saveAddress}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
                    >
                      Save Address
                    </button>

                  </div>

                )}

              </Card>

            )}

            {activeTab==="orders" && (

              <Card title="Order History">

                <OrderCard/>
                <OrderCard/>
                <OrderCard/>

              </Card>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

function Card({title,children}){

  return(
    <div className="bg-white shadow-md rounded-2xl p-8 space-y-6">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {children}
    </div>
  )
}

function Input({label,...props}){

  return(

    <div className="mt-4">

      <label className="text-xs text-slate-500">{label}</label>

      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none transition"
      />

    </div>
  )
}

function SidebarItem({icon,label,active,onClick}){

  return(

    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-sm transition
      ${active
        ? "bg-indigo-50 text-indigo-600"
        : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {icon}
      {label}
    </div>
  )
}

function OrderCard(){

  return(

    <div className="flex justify-between items-center bg-slate-50 p-5 rounded-xl hover:shadow-md transition">

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