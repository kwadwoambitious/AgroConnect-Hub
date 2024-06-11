import React, { useState } from 'react';
import { PiMinusCircle, PiPlusCircle } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };


  const faqs = [
    {
      question: "What is the main purpose of this platform?",
      answer: "The main purpose of AgroConnect Hub is to provide a digital platform that connects farmers and consumers, enabling them to buy and sell agricultural products efficiently and effectively, thereby improving the agricultural value chain, enhancing the livelihoods of farmers and consumers, and promoting sustainable agricultural practices in Ghana."
    },
    {
      question: "The benefits a consumer or a farmer will get from this platform",
      answer: "Consumers and farmers will benefit from AgroConnect Hub by accessing a wide range of fresh and high-quality agricultural products, competitive prices, convenient transactions, and reliable market information. Additionally, farmers will gain increased market access, improved income, and enhanced livelihoods, while consumers will enjoy improved food security and sustainable agricultural practices."
    },
    {
      question: "What guarantees a secure transaction between consumers and farmers?",
      answer: "AgroConnect Hub ensures secure transactions between consumers and farmers through a cash-on-delivery payment system, eliminating online payment risks. Additionally, the platform verifies and validates farmer and consumer identities, provides clear product information, and offers a dispute resolution process, guaranteeing a safe and trustworthy exchange of goods and services."
    },
    {
      question: "How can a farmer be able to upload his/her products on this platform?",
      answer: 'Farmers can easily upload their products on AgroConnect Hub by following these simple steps: register and create a profile, click on "Add Product" and enter product details, upload product images, set a competitive price. Our user-friendly interface and web app make it easy to manage and update product listings anytime, anywhere.'
    },
    {
      question: "How can a consumer be able to purchase products on this platform?",
      answer: "Consumers can purchase products on AgroConnect Hub by browsing through available products, selecting desired items, and placing an order. They can then proceed to checkout, where cash-on-delivery is the secure payment option. Once confirmed, fresh agricultural products will be delivered to their doorstep, offering a seamless and hassle-free shopping experience."
    }
  ];

  return (
    <div className='font-poppins px-5 xl:px-32 py-20 bg-[#F4F5FF]'>
      <h2 className='font-medium text-[20px] sm:text-4xl text-center'>FREQUENTLY ASKED QUESTIONS</h2>
      <p className='font-light sm:text-xl text-center'>Below are some common questions you may want to ask!</p>
      <div className='mt-12'>
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className='mb-7 bg-[#2f982d28] py-5 px-4 rounded-md cursor-pointer hover:bg-[#2f982d5c]' 
            onClick={() => toggleAnswer(index)}
          >
            <div className='flex items-center justify-between'>
              <h4 className='font-normal text-[17px] sm:text-xl text-[#2E982D]'>{faq.question}</h4>
              <div className='text-3xl text-[#2E982D] font-medium ml-5'>
                {openIndex === index ? <PiMinusCircle /> : <PiPlusCircle />}
              </div>
            </div>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='overflow-hidden'
                >
                  <p className='pb-3 text-[15px] sm:text-lg pt-2'>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;