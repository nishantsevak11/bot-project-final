import React, { useState, useRef, useEffect } from 'react';

// Product image mapping by category
const productImages = {
    // Electronics
    'iphone 15 pro': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch_GEO_EMEA?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009283815',
    'iphone 14': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch_AV1?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1661026388392',
    'samsung galaxy s23': 'https://images.samsung.com/is/image/samsung/p6pim/in/2302/gallery/in-galaxy-s23-s918-sm-s918bzgcins-thumb-534863401',
    'macbook pro': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229',
    'airpods pro': 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361',

    // Clothing
    't-shirt': 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/848742/01/mod01/fnd/IND/fmt/png',
    'jeans': 'https://www.lee.in/media/catalog/product/l/m/lmsh000678_1.jpg',
    'dress': 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/19473744/2022/9/13/5b4fc687-b93b-4141-aeb6-1bd82db75e671663060171向量智能对象.jpg',
    'jacket': 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/24055686/2023/7/17/b0eb9234-30f6-4b83-bb66-9bba7402c1441689576111475RoadsterMenBlackSolidPUJacket1.jpg',
    'sweater': 'https://assets.ajio.com/medias/sys_master/root/20230624/6Yf6/6496c5beeebac147fcf6c373/-473Wx593H-465324816-brown-MODEL.jpg',
    'shoes': 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ccb15778ba924a508c51af7700c0a00f_9366/Forum_Low_Shoes_White_FY7755_01_standard.jpg',
    'socks': 'https://www.jockeyindia.com/cdn/shop/products/2410_Black_1.jpg',

    // Accessories
    'backpack': 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4967d65729984ac49ebcaf3b00e8a92d_9366/Power_Fabric_Backpack_Black_HM9168_01_standard.jpg',
    'sunglasses': 'https://assets.rayban.com/is/image/RayBan/8056597777001__STD__shad__qt.png',
    'wallet': 'https://www.wildhorn.in/cdn/shop/products/WH2052_2.jpg',
    'handbag': 'https://assets.ajio.com/medias/sys_master/root/20230623/qyke/6494ec01d55b7d0c6340558c/-473Wx593H-469341257-tan-MODEL.jpg',
    'watch': 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw34d84041/images/Titan/Catalog/1805QM02_1.jpg',
    'hat': 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/df67ab60b5574c368b76af3b00cfb061_9366/Relaxed_Strap-Back_Hat_Black_HM1292_01_standard.jpg',
    'scarf': 'https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/24018708/2023/7/25/4de21f65-0d91-44b4-b052-b85d4f2d31ca1690262046510-KASSUALLY-Women-Scarves-7761690262046189-1.jpg',

    // Home Appliances
    'washing machine': 'https://www.lg.com/in/images/washing-machines/md07562852/gallery/FHM1065SDW-Washing-Machines-Front-View-D-01.jpg',
    'microwave oven': 'https://www.lg.com/in/images/microwave-ovens/md07554963/gallery/MC2146BG-Microwave-ovens-Front-View-D-1.jpg',
    'refrigerator': 'https://www.lg.com/in/images/refrigerators/md07554966/gallery/GL-S382SPZY-Refrigerators-Front-View-D-1.jpg',
    'toaster': 'https://www.philips.co.in/c-dam/b2c/category-pages/Kitchen-appliances/toasters/HD2582_00-KA-global-001.png',
    'iron': 'https://www.philips.co.in/c-dam/b2c/category-pages/household-products/Steam-iron/GC1022_70-KA-global-001.png',

    // Furniture
    'sofa': 'https://www.godrejinterio.com/imagestore/B2C/56101543SD00046/56101543SD00046_01_1500x1500.png',
    'dining table': 'https://www.godrejinterio.com/imagestore/B2C/DNTBRSTBVN0000XX/DNTBRSTBVN0000XX_01_1500x1500.png',
    'bed': 'https://www.godrejinterio.com/imagestore/B2C/BDFBNDVN0000XX/BDFBNDVN0000XX_01_1500x1500.png',
    'chair': 'https://www.godrejinterio.com/imagestore/B2C/CHDBLNVN0000XX/CHDBLNVN0000XX_01_1500x1500.png',
    'bookshelf': 'https://www.godrejinterio.com/imagestore/B2C/BCSRSTBVN0000XX/BCSRSTBVN0000XX_01_1500x1500.png',

    // Beauty & Personal Care
    'shampoo': 'https://www.lorealparis.co.in/-/media/project/loreal/brand-sites/lp/apac/in/products/hair/hair-care/extraordinary-oil-shampoo/loreal-paris-extraordinary-oil-shampoo-71x300.jpg',
    'face cream': 'https://www.lorealparis.co.in/-/media/project/loreal/brand-sites/lp/apac/in/products/skin-care/moisturizer/revitalift-moisturizing-day-cream/loreal-paris-revitalift-moisturizing-day-cream-71x300.jpg',
    'lipstick': 'https://www.lorealparis.co.in/-/media/project/loreal/brand-sites/lp/apac/in/products/make-up/lips/color-riche-moist-matte/loreal-paris-color-riche-moist-matte-lipstick-71x300.jpg',
    'perfume': 'https://www.lorealparis.co.in/-/media/project/loreal/brand-sites/lp/apac/in/products/perfumes/men/loreal-paris-perfumes-71x300.jpg',

    // Sports & Outdoors
    'tennis racket': 'https://www.wilson.com/en-us/media/catalog/product/W/R/WR068811U__8f9e1a7f8c4364f6cbb3e17d904a8999.png',
    'basketball': 'https://www.wilson.com/en-us/media/catalog/product/W/T/WTB7900ID__b00968a4578825468c9c7abf5bb33480.png',
    'yoga mat': 'https://contents.mediadecathlon.com/p2175082/k$f0b2a7c9a4246ec5c2f1f0c10cb35daa/essential-yoga-mat-4mm-blue.jpg',
    'dumbbells': 'https://contents.mediadecathlon.com/p1749048/k$f0e750ad3d1d6c566280b58384bb8523/hex-dumbbell-5-kg.jpg'
};

const ProductCard = ({ product }) => {
    return (
        <div className="flex-shrink-0 w-64 bg-[#b3b4bd] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
            <img
                src={productImages[product.name.toLowerCase()]}
                alt={product.name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex flex-col gap-2 text-sm">
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-600">
                        Category: {product.category}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-600">
                        Stock: {product.quantity_in_stock}
                    </span>
                </div>
                {/* <button className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                </button> */}
            </div>
        </div>
    );
};

const ProductDisplay = ({ products }) => {
    if (!products || products.length === 0) return null;

    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

const MessageBubble = ({ message, isUser }) => {
    return (
        <div className={`flex pb-10 ${isUser ? 'justify-end' : 'justify-start'} mb-6`}> 
            <div className={`rounded-2xl p-4 max-w-[80%] ${
                isUser ? 'bg-blue-500 text-white' : 'bg-[#2c2e34] text-white p-5'
            }`}> 
                <p className="text-base mb-1 whitespace-pre-line font-semibold">{message.text}</p>
                <ProductDisplay products={message.products} />
            </div>
        </div>
    );
};

const Header = ({ toggleTheme }) => {
    return (
        <header className="fixed top-0 left-0 p-4 bg-[#141619] text-[#DBD8E3]  w-full z-10">
            <div className='flex justify-between w-full'>
                <h1 className="text-2xl font-bold text-left">Chatbot</h1>
                <button onClick={toggleTheme} className="p-2 bg-[#2c2e3a] rounded hover:bg-[#DBD8E3] hover:text-[#2A2428] transition duration-200">Login/SignIn</button>
            </div>
        </header>
    );
};
const generate_response = (user_message, products = null) => {
    const greetings = ['hi', 'hello', 'hey', 'greetings'];
    if (greetings.some(greeting => user_message.toLowerCase().includes(greeting))) {
        return "Hello! 👋 How can I assist you in finding the perfect products today?";
    }

    const help_patterns = ['help', 'how', 'what can you do', 'guide'];
    if (help_patterns.some(term => user_message.toLowerCase().includes(term))) {
        return ("I’m here to help you find products! Here are some things you can ask me:\n" +
                "- Show me iPhones 📱\n" +
                "- Do you have any backpacks? 🎒\n" +
                "- I'm looking for furniture 🛋️\n" +
                "- Show me sports equipment ⚽\n" +
                "Feel free to ask about anything else!");
    }

    if (products) {
        if (products.length === 0) {
            return ("Oops! I couldn't find any products matching your request. 😕 " +
                    "Perhaps you could check out different categories or rephrase your search!");
        }
        if (products.length === 1) {
            return `I found this amazing product for you: ${products[0].name}! 🎉`;
        }
        return `Here are ${products.length} products that match your search:`;
    }

    return "I'm here to help, but I didn't quite understand that. Could you please clarify?";
};

const Body = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage = {
            text: query,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, userMessage]);
        setQuery('');
        setLoading(true);

        try {
            console.log('Sending request to:', `${import.meta.env.VITE_API_URL}/api/chat`);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'omit',
                mode: 'cors',
                body: JSON.stringify({ message: query }),
            });

            if (!response.ok) {
                console.error('Response not ok:', response.status, response.statusText);
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received response:', data);

            const botMessage = {
                text: generate_response(query, data.products),
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString(),
                products: data.products
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error in API call:', error);
            const errorMessage = {
                text: "Sorry, I'm having trouble connecting right now. Please check your connection and try again.",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString(),
                products: []
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className={`min-h-screen bg-[#141619]`}> 
            <Header toggleTheme={() => {}} />
            <div className="h-[90%] max-w-[1500px] m-auto bg-[#141619] text-black rounded-lg p-4 ">
                <div className="bot mt-[5%] md:mt-[10%] w-[100px] h-[100px] rounded-[30px] flex items-center justify-center m-auto bg-[#e0e0e0] opacity-[0.60]">
                    <img
                        className="w-[100px] h-[100px] rounded-[30px] object-cover"
                        src="/chatbot.webp"
                        alt=""
                        
                    />
                    
                </div>
                <div className="messages-container h-[calc(100%-200px)] overflow-y-auto px-4 py-6">
                    {messages.map((message, index) => (
                        <MessageBubble
                            key={index}
                            message={message}
                            isUser={message.sender === 'user'}
                        />
                    ))}
                    {loading && (
                        <div className="flex justify-start mb-4">
                            <div className="bg-gray-200 rounded-lg p-3">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="fixed bottom-5 left-0 right-0 p-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
                <form onSubmit={handleSend} className="flex items-center">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 p-2 border bg-[#2c2e3a] text-white rounded-lg outline-none text-sm md:text-base"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="ml-2 px-4 py-2 bg-[#0a21c0] text-white rounded-lg hover:bg-blue-600 text-sm md:text-base"
                        disabled={loading}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Body;