import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import {
  ArrowLeft,
  ShoppingCart,
  User,
  QrCode,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Lock,
  AlertCircle,
  LogIn,
} from "lucide-react";

type Step = "account" | "payment" | "confirmation";
type AuthMode = "register" | "login";

export default function Checkout() {
  const [, navigate] = useLocation();
  const { items, totalItems, totalPrice, clearCart } = useCart();

  // Step state
  const [step, setStep] = useState<Step>("account");

  // Auth mode
  const [authMode, setAuthMode] = useState<AuthMode>("register");

  // Account form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (totalItems === 0 && step === "account") {
      navigate("/");
    }
  }, [totalItems, step, navigate]);

  // Timer countdown
  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          setStep("confirmation");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  // Show skip button after 2 minutes (180 seconds left)
  useEffect(() => {
    if (timerActive && timeLeft <= 180 && !showSkip) {
      setShowSkip(true);
    }
  }, [timeLeft, timerActive, showSkip]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (authMode === "register") {
      if (!contact.trim()) {
        errors.contact = "Contact number is required";
      } else if (!/^\d{10}$/.test(contact.replace(/\s/g, ""))) {
        errors.contact = "Please enter a valid 10-digit number";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password, contact, authMode]);

  const handleCreateAccount = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setAuthError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, contact }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 409) {
          setAuthError(data.message);
          setAuthMode("login");
        } else {
          setAuthError(data.message || "Registration failed");
        }
        return;
      }
      setStep("payment");
      setTimerActive(true);
      setTimeLeft(5 * 60);
    } catch {
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setAuthError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.message || "Login failed");
        return;
      }
      // Fill contact from the stored user data
      if (data.user?.contact) {
        setContact(data.user.contact);
      }
      setStep("payment");
      setTimerActive(true);
      setTimeLeft(5 * 60);
    } catch {
      setAuthError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMoveForward = () => {
    setTimerActive(false);
    setStep("confirmation");
  };

  const handleGoHome = () => {
    clearCart();
    navigate("/");
  };

  // QR code URL using a free API — shows a UPI placeholder
  const qrData = `upi://pay?pa=cleanblue594@paytm&pn=CleanBlue&am=${totalPrice.toFixed(2)}&cu=INR&tn=CleanBlue+Water+Order`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-navy-dark border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-300 hover:text-accent-teal transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Shop</span>
          </button>
          <div className="bg-white px-3 py-1 rounded-lg">
            <span className="text-navy-dark font-bold text-lg">CLEAN</span>
            <span className="text-accent-teal font-bold text-lg">BLUE</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center justify-center gap-2">
          {[
            { key: "account", label: "Account", icon: User },
            { key: "payment", label: "Payment", icon: QrCode },
            { key: "confirmation", label: "Confirmed", icon: CheckCircle2 },
          ].map((s, i) => {
            const stepOrder = ["account", "payment", "confirmation"];
            const currentIndex = stepOrder.indexOf(step);
            const thisIndex = stepOrder.indexOf(s.key);
            const isActive = thisIndex === currentIndex;
            const isDone = thisIndex < currentIndex;

            return (
              <div key={s.key} className="flex items-center gap-2">
                {i > 0 && (
                  <div
                    className={`w-12 h-0.5 ${
                      isDone ? "bg-accent-teal" : "bg-gray-300"
                    }`}
                  />
                )}
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? "bg-accent-teal text-navy-dark"
                        : isDone
                        ? "bg-accent-teal/20 text-accent-teal"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isActive
                        ? "text-accent-teal"
                        : isDone
                        ? "text-accent-teal/70"
                        : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        {/* ======== STEP 1: ACCOUNT ======== */}
        {step === "account" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-4">
            {/* Auth Mode Toggle */}
            <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
              <button
                onClick={() => { setAuthMode("register"); setAuthError(""); setFormErrors({}); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  authMode === "register"
                    ? "bg-white text-deep-gray shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Create Account
              </button>
              <button
                onClick={() => { setAuthMode("login"); setAuthError(""); setFormErrors({}); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  authMode === "login"
                    ? "bg-white text-deep-gray shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  <LogIn className="h-4 w-4" />
                  Login
                </span>
              </button>
            </div>

            <h2 className="text-2xl font-bold text-deep-gray mb-1">
              {authMode === "register" ? "Create Your Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-500 mb-6">
              {authMode === "register"
                ? "Enter your details to proceed with the order"
                : "Login with your existing account to continue"}
            </p>

            {/* Auth Error */}
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-red-700 font-medium">{authError}</p>
                  {authError.includes("already exists") && (
                    <button
                      onClick={() => { setAuthMode("login"); setAuthError(""); }}
                      className="text-sm text-red-600 underline mt-1 hover:text-red-800"
                    >
                      Switch to Login →
                    </button>
                  )}
                  {authError.includes("No account found") && (
                    <button
                      onClick={() => { setAuthMode("register"); setAuthError(""); }}
                      className="text-sm text-red-600 underline mt-1 hover:text-red-800"
                    >
                      Create a new account →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingCart className="h-4 w-4 text-accent-teal" />
                <span className="text-sm font-semibold text-deep-gray">
                  Order Summary ({totalItems} item{totalItems !== 1 ? "s" : ""})
                </span>
              </div>
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center py-1.5 text-sm"
                >
                  <span className="text-gray-600">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-semibold text-deep-gray">
                    ₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                <span className="font-bold text-deep-gray">Total</span>
                <span className="font-bold text-accent-teal text-lg">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-deep-gray flex items-center gap-2 mb-1.5">
                  <Mail className="h-4 w-4 text-gray-400" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formErrors.email ? "border-red-400" : ""}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-deep-gray flex items-center gap-2 mb-1.5">
                  <Lock className="h-4 w-4 text-gray-400" />
                  Password (min 8 characters)
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={formErrors.password ? "border-red-400" : ""}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.password}
                  </p>
                )}
                {password.length > 0 && password.length < 8 && (
                  <p className="text-amber-500 text-xs mt-1">
                    {8 - password.length} more character{8 - password.length !== 1 ? "s" : ""} needed
                  </p>
                )}
              </div>

              {authMode === "register" && (
              <div>
                <label className="text-sm font-medium text-deep-gray flex items-center gap-2 mb-1.5">
                  <Phone className="h-4 w-4 text-gray-400" />
                  Contact Number
                </label>
                <Input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={contact}
                  onChange={(e) =>
                    setContact(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className={formErrors.contact ? "border-red-400" : ""}
                />
                {formErrors.contact && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.contact}
                  </p>
                )}
              </div>
              )}
            </div>

            <Button
              onClick={authMode === "register" ? handleCreateAccount : handleLogin}
              disabled={isSubmitting}
              className="w-full mt-6 bg-accent-teal text-navy-dark hover:bg-mint-green font-semibold text-base py-5"
            >
              {isSubmitting
                ? "Please wait..."
                : authMode === "register"
                ? "Create Account & Continue"
                : "Login & Continue"}
            </Button>

            <p className="text-center text-sm text-gray-500 mt-4">
              {authMode === "register" ? (
                <>Already have an account?{" "}
                  <button onClick={() => { setAuthMode("login"); setAuthError(""); setFormErrors({}); }} className="text-accent-teal font-semibold hover:underline">
                    Login here
                  </button>
                </>
              ) : (
                <>Don't have an account?{" "}
                  <button onClick={() => { setAuthMode("register"); setAuthError(""); setFormErrors({}); }} className="text-accent-teal font-semibold hover:underline">
                    Create one
                  </button>
                </>
              )}
            </p>
          </div>
        )}

        {/* ======== STEP 2: PAYMENT (QR CODE) ======== */}
        {step === "payment" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-4 text-center">
            <h2 className="text-2xl font-bold text-deep-gray mb-1">
              Scan & Pay
            </h2>
            <p className="text-gray-500 mb-6">
              Scan the QR code below with any UPI app to complete your payment
            </p>

            {/* Timer */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                timeLeft <= 60
                  ? "bg-red-50 text-red-600"
                  : timeLeft <= 120
                  ? "bg-amber-50 text-amber-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span className="font-mono font-bold text-lg">
                {formatTime(timeLeft)}
              </span>
              <span className="text-sm">remaining</span>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-accent-teal/30 inline-block mb-4">
                <img
                  src={qrCodeUrl}
                  alt="Payment QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-4 w-full max-w-xs mb-4">
                <p className="text-sm text-gray-500">Amount to pay</p>
                <p className="text-3xl font-bold text-accent-teal">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 w-full max-w-md mb-6">
                <p className="text-sm text-blue-700">
                  <strong>How to pay:</strong> Open any UPI app (Google Pay,
                  PhonePe, Paytm), scan the QR code, and confirm the payment.
                </p>
              </div>
            </div>

            {/* Skip / Move Forward button — appears after 2 minutes */}
            {showSkip && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-amber-50 rounded-xl p-4 mb-4 max-w-md mx-auto">
                  <p className="text-sm text-amber-700">
                    Already paid? You can proceed now — we'll verify your payment
                    and confirm via email.
                  </p>
                </div>
                <Button
                  onClick={handleMoveForward}
                  className="bg-navy-dark text-white hover:bg-gray-800 font-semibold px-8 py-5"
                >
                  I've Completed Payment — Move Forward
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ======== STEP 3: CONFIRMATION ======== */}
        {step === "confirmation" && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mt-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-deep-gray mb-2">
              Thank You for Your Order!
            </h2>

            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We will send you an email at <strong>{email}</strong> once we
              confirm your payment has been received. This usually takes a few
              minutes.
            </p>

            <div className="bg-blue-50 rounded-xl p-5 max-w-md mx-auto mb-6">
              <div className="flex items-start gap-3 text-left">
                <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    What happens next?
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• We verify your payment</li>
                    <li>• You receive a confirmation email</li>
                    <li>• Your order is prepared for delivery</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 max-w-md mx-auto mb-8">
              <p className="text-xs text-amber-700">
                <strong>Note:</strong> We're currently setting up our payment
                gateway and tracking system. For now, payment verification is
                done manually. Thank you for your patience!
              </p>
            </div>

            <Button
              onClick={handleGoHome}
              className="bg-accent-teal text-navy-dark hover:bg-mint-green font-semibold px-8 py-5"
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
