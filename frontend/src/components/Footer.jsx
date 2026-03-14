import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Footer() {

    return(
        <>
        <footer className="bg-neutral-900 text-white pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <span className="text-xl font-black tracking-tight">
                    MyShoppingSite
                  </span>
                </div>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                  Elevating your shopping experience since 2024. Quality goods,
                  exceptional service, and global reach.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-all"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-bold mb-6">Quick Links</h5>
                <ul className="space-y-4 text-neutral-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Our Story
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Track Order
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Size Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Sustainability
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-bold mb-6">Support</h5>
                <ul className="space-y-4 text-neutral-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Shipping Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Refund & Returns
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-bold mb-6">Join Our Newsletter</h5>
                <p className="text-neutral-400 mb-4">
                  Get 15% off your first purchase and stay updated.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 outline-none focus:border-indigo-500 transition-all"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-white text-black px-4 rounded-full font-bold hover:bg-indigo-600 hover:text-white transition-all">
                    Join
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm">
              <p>© 2026 MyShoppingSite. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span>Visa</span>
                <span>Mastercard</span>
                <span>PayPal</span>
                <span>Apple Pay</span>
              </div>
            </div>
          </div>
        </footer>
        </>
    )
}