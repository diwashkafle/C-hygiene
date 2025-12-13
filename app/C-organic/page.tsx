import React from 'react';
import { ShoppingCart, MessageCircle, Tag } from 'lucide-react';
import Image from 'next/image';

const ProductPage = () => {
  const themeColor = '#0C8033';
  const phoneNumber = '9779860571937'; // तपाईंको फोन नम्बर

  // उत्पादनहरूको डेटा (नमूना डेटा)
  const products = [
    {
      id: 1,
      name: "प्रांगारिक मल (Organic Fertilizer)",
      price: "रु. ५०/केजी", // मूल्य आवश्यकता अनुसार परिवर्तन गर्नुहोस्
      category: "कृषि",
      image: "/api/placeholder/400/300", // यहाँ वास्तविक फोटोको लिङ्क राख्नुहोला
    },
    {
      id: 2,
      name: "जैविक विषादी (Bio-Pesticide)",
      price: "रु. ३५०/लिटर",
      category: "कृषि",
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      name: "फ्लोर क्लिनर (Floor Cleaner)",
      price: "रु. २००/लिटर",
      category: "सरसफाई",
      image: "/api/placeholder/400/300",
    },
    {
      id: 4,
      name: "ह्यान्ड वास (Hand Wash)",
      price: "रु. १५०/बोतल",
      category: "सरसफाई",
      image: "/api/placeholder/400/300",
    },
    {
      id: 5,
      name: "डिस इन्फेक्टेन्ट (Disinfectant)",
      price: "रु. ४००/लिटर",
      category: "सरसफाई",
      image: "/api/placeholder/400/300",
    },
    {
      id: 6,
      name: "कृषि चुना (Agricultural Lime)",
      price: "रु. ३०/केजी",
      category: "कृषि",
      image: "/api/placeholder/400/300",
    }
  ];

  // WhatsApp लिंक बनाउने फंक्सन
  const createWhatsAppLink = (productName:string) => {
    const message = `नमस्ते, मलाई "${productName}" को बारेमा थप जानकारी चाहिएको थियो वा अर्डर गर्न चाहन्छु।`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <section className="bg-gray-50 min-h-screen font-sans text-gray-800">
      
      {/* Header Section */}
      <div 
        className="py-16 px-6 text-center text-white"
        style={{ backgroundColor: themeColor }}
      >
        <h1 className="text-4xl font-bold mb-4">हाम्रा उत्पादनहरू</h1>
        <p className="text-lg text-green-50 max-w-2xl mx-auto">
          कृषि र सरसफाईका लागि उच्च गुणस्तरीय उत्पादनहरू। सिधै ह्वाट्सएप मार्फत अर्डर गर्नुहोस्।
        </p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gray-200 relative group">
                <Image 
                  src={product.image} 
                  alt={product.name}
                  height={100}
                  width={100}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm uppercase tracking-wide">
                  {product.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-6 mt-1">
                  <Tag size={18} style={{ color: themeColor }} />
                  <span className="font-medium text-lg">{product.price}</span>
                </div>

                {/* Action Button - Pushes to bottom */}
                <div className="mt-auto">
                  <a 
                    href={createWhatsAppLink(product.name)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl text-white font-semibold transition-transform active:scale-95 hover:brightness-110 shadow-md"
                    style={{ backgroundColor: '#25D366' }} // WhatsApp Green Color
                  >
                    <MessageCircle size={20} />
                    <span>ह्वाट्सएपमा अर्डर गर्नुहोस्</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Custom Order Section */}
       <div className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-green-200">
          <h3 className="text-2xl font-bold mb-3">थोक (Wholesale) अर्डरको लागि</h3>
          <p className="text-gray-600 mb-6">
            यदि तपाईंलाई ठूलो परिमाणमा मल वा सरसफाईका सामग्री चाहिएको छ भने हामीलाई सिधै सम्पर्क गर्नुहोस्।
          </p>
          <a 
            href={`https://wa.me/${phoneNumber}`}
            className="inline-flex items-center px-8 py-3 rounded-lg text-white font-medium shadow-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: themeColor }}
          >
            <ShoppingCart className="mr-2 w-5 h-5" />
            सम्पर्क गर्नुहोस्
          </a>
        </div>
      </div>

    </section>
  );
};

export default ProductPage;