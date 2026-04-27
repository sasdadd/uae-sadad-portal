import React from 'react';
import { useLocation } from "wouter";

const SelectBank: React.FC = () => {
  const [, setLocation] = useLocation();

  const banks = [
    { name: "بنك الإمارات دبي الوطني", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Emirates_NBD_logo.svg/1200px-Emirates_NBD_logo.svg.png" },
    { name: "بنك أبوظبي الأول", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/First_Abu_Dhabi_Bank_Logo.svg/1200px-First_Abu_Dhabi_Bank_Logo.svg.png" },
    { name: "بنك أبوظبي التجاري", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/ADCB_Logo.svg/1200px-ADCB_Logo.svg.png" },
    { name: "بنك دبي الإسلامي", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Dubai_Islamic_Bank_Logo.svg/1200px-Dubai_Islamic_Bank_Logo.svg.png" },
    { name: "مصرف أبوظبي الإسلامي", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/ADIB_Logo.svg/1200px-ADIB_Logo.svg.png" },
    { name: "بنك رأس الخيمة الوطني", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/RAKBANK_logo.svg/1200px-RAKBANK_logo.svg.png" },
    { name: "بنك دبي التجاري", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Commercial_Bank_of_Dubai_logo.svg/1200px-Commercial_Bank_of_Dubai_logo.svg.png" },
    { name: "بنك المشرق", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mashreq_Bank_Logo.svg/1200px-Mashreq_Bank_Logo.svg.png" },
    { name: "بنك إتش إس بي سي", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/1200px-HSBC_logo_%282018%29.svg.png" }
  ];

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
          <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">2</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">3</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">4</div>
          <div className="bg-white text-gray-400 border-2 border-gray-200 w-10 h-10 rounded-full flex items-center justify-center font-bold">5</div>
        </div>
        <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
          <span className="text-green-600">البيانات</span>
          <span className="text-orange-600">البنك</span>
          <span>البطاقة</span>
          <span>التحقق</span>
          <span>التأكيد</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 px-4 pb-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-slate-900 p-8 text-white text-center">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">اختر مؤسستك المصرفية</h2>
            <p className="text-slate-400 text-sm">يرجى اختيار البنك المصدر للبطاقة التي ستستخدمها في عملية السداد</p>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {banks.map((bank, index) => (
              <button 
                key={index}
                onClick={() => setLocation("/card-data")}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-100 hover:border-orange-500 hover:bg-orange-50 transition-all group"
              >
                <div className="h-16 w-full flex items-center justify-center mb-4">
                  <img src={bank.logo} alt={bank.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-bold text-gray-700 text-center">{bank.name}</span>
              </button>
            ))}
          </div>
          
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center">
            <button 
              onClick={() => setLocation("/user-data")}
              className="text-gray-500 font-bold hover:text-orange-600 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              الرجوع للخطوة السابقة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectBank;
