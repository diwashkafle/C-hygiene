import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import Footer from './Footer';

const ContactPage = () => {
  const themeColor = '#0C8033';

  return (
    <div id='contact' className="min-h-screen flex flex-col font-sans text-gray-800">
      
      {/* Header Section */}
      <div 
        className="py-16 px-6 text-center text-white"
        style={{ backgroundColor: themeColor }}
      >
        <h1 className="text-4xl font-bold mb-4">सम्पर्क गर्नुहोस्</h1>
        <p className="text-lg text-green-50">
          हाम्रो सेवा वा उत्पादनको बारेमा थप जानकारीको लागि हामीलाई सम्झनुहोस्।
        </p>
      </div>

      {/* Main Content: Contact Info & Map/Form */}
      <div className="grow max-w-6xl mx-auto w-full px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Left Side: Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>
                सम्पर्क विवरण
              </h2>
              <p className="text-gray-600 mb-8">
                हाम्रो कार्यालय भ्रमण गर्न वा फोन मार्फत सिधा कुराकानी गर्न तलका विवरणहरू प्रयोग गर्नुहोस्।
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <MapPin className="w-6 h-6" style={{ color: themeColor }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">कार्यालय ठेगाना</h3>
                  <p className="text-gray-600">ललितपुर महानगरपालिका वडा नं. २८,</p>
                  <p className="text-gray-600">ललितपुर, नेपाल</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Phone className="w-6 h-6" style={{ color: themeColor }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">फोन नम्बर</h3>
                  <p className="text-gray-600">+९७७ ९८५१०९८३९५</p> 
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <MessageCircle className="w-6 h-6" style={{ color: themeColor }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">ह्वाट्सएप (WhatsApp)</h3>
                  <p className="text-gray-600">+९७७ ९८६०५७१९३७</p> {/* Replace with WhatsApp number */}
                  <p className="text-sm text-gray-500">हामीलाई सिधै म्यासेज गर्न सक्नुहुन्छ।</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Mail className="w-6 h-6" style={{ color: themeColor }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">इमेल</h3>
                  <p className="text-gray-600">info.chygiene@gmail.com</p> {/* Replace with real email */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Simple Message Form */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6" style={{ color: themeColor }}>
              सन्देश पठाउनुहोस्
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">पूरा नाम</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="तपाईंको नाम"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">फोन वा मोबाइल</label>
                <input 
                  type="tel" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="तपाईंको सम्पर्क नम्बर"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">सन्देश</label>
                <textarea 
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="तपाईंको जिज्ञासा यहाँ लेख्नुहोस्..."
                ></textarea>
              </div>
              <button 
                type="button" // Change to 'submit' when handling form logic
                className="w-full py-3 px-6 rounded-lg text-white font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: themeColor }}
              >
                पठाउनुहोस्
              </button>
            </form>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;