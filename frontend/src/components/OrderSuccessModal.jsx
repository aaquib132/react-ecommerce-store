import { useEffect } from "react";
import { CheckCircle2, Truck } from "lucide-react";
import confetti from "canvas-confetti";

export default function OrderSuccessModal({ open, onClose }) {

  useEffect(() => {
    if (!open) return;

    const duration = 2000;
    const end = Date.now() + duration;

    // MAIN CONFETTI BLAST
    confetti({
      particleCount: 140,
      spread: 100,
      startVelocity: 45,
      scalar: 1.1,
      origin: { x: 0.5, y: 0.45 },
    });

    // SIDE CANNONS
    const interval = setInterval(() => {

      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });

      // SPARKLE PARTICLES
      confetti({
        particleCount: 3,
        startVelocity: 0,
        spread: 360,
        ticks: 50,
        gravity: 0.45,
        scalar: 0.8,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.6,
        },
      });

    }, 160);

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };

  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-105 max-w-[90%] bg-white rounded-3xl shadow-2xl overflow-hidden animate-[modalFade_.25s_ease]">

        {/* HEADER GRADIENT */}

        <div className="bg-linear-to-r from-indigo-500 to-blue-500 h-32 flex items-center justify-center">

          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
            <Truck className="text-white" size={36} />
          </div>

        </div>

        {/* CONTENT */}

        <div className="px-8 py-10 text-center">

          <div className="flex justify-center mb-4">

            <CheckCircle2
              size={56}
              className="text-green-500 animate-[successPop_.4s_ease]"
            />

          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Payment Successful 🎉
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Your order has been placed successfully.
          </p>

          <div className="mt-5 text-xs text-slate-400">
            Preparing your shipment 🚚
          </div>

          <div className="mt-3 text-xs text-slate-400">
            Redirecting to order confirmation...
          </div>

        </div>

      </div>

      {/* ANIMATIONS */}

      <style jsx>{`

        @keyframes modalFade {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes successPop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          60% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

      `}</style>

    </div>
  );
}