import Footer from '@/components/Hero/Footer';
import { getProducts } from '@/lib/actions/products';
import { ShoppingCart, Tag, MoveLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from "react-icons/io";

const  ProductPage = async () => {
  const themeColor = '#0C8033';
  const phoneNumber = '9779860571937'; 

const [productsResult] = await Promise.all([
    getProducts(),
  ]);  
 

  const createWhatsAppLink = (productName:string) => {
    const message = `नमस्ते, मलाई ${productName} को बारेमा थप जानकारी चाहिएको थियो वा अर्डर गर्न चाहन्छु।`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <section className="bg-gray-50 min-h-screen font-sans text-gray-800">
      
      <div 
        className="py-8 px-6 text-center text-white"
        style={{ backgroundColor: themeColor }}
      >
        <h1 className="text-4xl font-bold mb-4">हाम्रा उत्पादनहरू</h1>
        <p className="text-lg text-green-50 max-w-2xl mx-auto">
          कृषि र सरसफाईका लागि उच्च गुणस्तरीय उत्पादनहरू। सिधै ह्वाट्सएप मार्फत अर्डर गर्नुहोस्।
        </p>
        <Link className='hidden sm:flex' href={"/"}>
        <div className=" mx-2 flex items-center border border-gray-200 rounded-4xl w-40 px-2 py-1 gap-2 text-gray-200 hover:text-gray-50 cursor-pointer">
         <MoveLeft/> <span>back to Home</span>
        </div>
       </Link>
      </div>
      

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsResult?.data?.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="h-48 bg-gray-200 relative group">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  height={100}
                  width={100}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm uppercase tracking-wide">
                 {product.categoryName || "Unknown"}
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
               <section className='flex flex-col my-2'>
                <div className='flex justify-between items-center'>
                   <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <Tag size={18} style={{ color: themeColor }} />
                  <span className="font-medium text-lg">रु. {product.price}</span>
                </div>
                </div>
                <div>
                  <p className='text-gray-600'>{product.description.length>100 ? product.description.slice(0, 100) + "..." : product.description}</p>
                </div>
               </section>

                <div className="mt-auto">
                  <a 
                    href={createWhatsAppLink(product.name)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-3 px-4 rounded-xl text-white font-semibold transition-transform active:scale-95 hover:brightness-110 shadow-md"
                    style={{ backgroundColor: '#25D366' }}
                  >
                   <IoLogoWhatsapp size={30} />
                    <span>WhatsApp मा अर्डर गर्नुहोस्</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       <div className="max-w-4xl mx-auto px-6 pb-16 text-center">
        <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-green-200">
          <h3 className="text-2xl font-bold mb-3">अर्डर गर्न कृपया WhatsApp मा क्लिक गर्नुहोस्</h3>
          <p className="text-gray-600 mb-3">
            तपाईं टाइप गरिएको सन्देशको साथ सिधै WhatsApp मा पुग्नुहुनेछ ।
          </p>
          <p className="text-gray-600 mb-6">
             हाम्रो WhatsApp लिङ्क पनि तल दिइएको छ।
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
      <Footer/>

    </section>
  );
};

export default ProductPage;