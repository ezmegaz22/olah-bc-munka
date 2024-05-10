import React, { useState, useEffect } from "react";
import {
  AiOutlineRobot,
  AiOutlineSend,
  AiOutlineMinus,
  AiOutlineDelete,
} from "react-icons/ai";

const Chatbot = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [productUrl, setProductUrl] = useState('');

  const steps = [
    {
      text: "Üdvözöllek! Chatbot vagyok, termékek keresésében tudok segíteni!",
      isBot: true,
    },
    {
      text: "Írd be a következőt: Kategoria ",
      isBot: true,
    },
  ];

  // chat nyitása
  const handleOpenChat = () => {
    setIsOpen(true);
    if (!hasOpenedBefore) {
      setMessages([...messages, steps[0], steps[1]]);
      saveMessagesToLocalStorage([...messages, steps[0], steps[1]]);
      setHasOpenedBefore(true);
      setCurrentStep(1);
    }
  };

  // mentett üzenetek betöltése
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // üzenetek mentése
  const saveMessagesToLocalStorage = (messagesToSave) => {
    localStorage.setItem("chatMessages", JSON.stringify(messagesToSave));
  };

  // üzenet küldése
  const handleSendMessage = () => {
    if (inputText.trim() === "") {
      return;
    }
  
    const newMessage = {
      text: inputText,
      isBot: false,
    };
  
    let responseMessage;
  
    // chat lépések szerinti válaszok
    if (currentStep === 1) {
      // Lépés 1: Kategória választás
      if (inputText.toLowerCase().includes("kategoria")) {
        responseMessage = {
          text: "Válassz kategóriát: Monitor, Fejhallgato, vagy Laptop!",
          isBot: true,
        };
        setCurrentStep(2);
      } else {
        responseMessage = {
          text: "Ez nem egy érvényes parancs. Kérlek, írd be: Kategoria",
          isBot: true,
        };
      }
    } else if (currentStep === 2) {
      // Lépés 2: Kategória választás után
      const category = inputText.toLowerCase();
      if (category.includes("monitor")) {
        responseMessage = {
          text: "Monitor kategória: Samsung, Asus",
          isBot: true,
        };
      } else if (category.includes("fejhallgato")) {
        responseMessage = {
          text: "Fejhallgató kategória: HyperX, Razer, SteelSeries",
          isBot: true,
        };
      } else if (category.includes("laptop")) {
        responseMessage = {
          text: "Laptop kategória: Macbook",
          isBot: true,
        };
      } else {
        responseMessage = {
          text: "Ez a kategória nem érvényes. Válassz: Monitor, Telefon, vagy Laptop",
          isBot: true,
        };
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Lépés 3: Kategória választás után
      if (
        messages[messages.length - 1].isBot &&
        messages[messages.length - 1].text.includes("kategória")
      ) {
        const selectedBrand = inputText.toLowerCase();
        if (selectedBrand.includes("samsung")) {
          responseMessage = {
            text: "Samsung Odyssey G60 UltraWide Monitor található a weboldalon, 1350€-ért kapható, jelenleg 13 db van raktáron! Gyors megtalálás érdekében kattints a KATT szó-ra! ",
            isBot: true,
            productUrl: "http://localhost:3000/product/662932b3f6cbea588c17e59f",
          };
        } else if (selectedBrand.includes("asus")) {
          responseMessage = {
            text: "Asus TUF VG45 Monitor található a weboldalon, 350€-ért kapható, jelenleg 14 db van raktáron! Gyors megtalálás érdekében kattints a KATT szó-ra! ",
            isBot: true,
            productUrl: "http://localhost:3000/product/662933dbf6cbea588c17e874",
          };
        } else if (selectedBrand.includes("hyperx")) {
          responseMessage = {
            text: "Hyper Ultra X Fejhallgató található a weboldalon, 85€-ért kapható, jelenleg 15 db van raktáron! Gyors megtalálás érdekében kattints a KATT szó-ra! ",
            isBot: true,
            productUrl: "http://localhost:3000/product/6629326cf6cbea588c17e4d7",
          };
        } else if (selectedBrand.includes("macbook")) {
          responseMessage = {
            text: "Macbook PRO 14inch M3 PRO Laptop található a weboldalon, 2850€-ért kapható, jeleneg 24 db van raktáron! Gyors megtalálás érdekében kattints a KATT szó-ra! ",
            isBot: true,
            productUrl: "http://localhost:3000/product/662933b0f6cbea588c17e801",
          };
        } else if (selectedBrand.includes("razer")) {
          responseMessage = {
            text: "Razer Kraken V20 Fejhallgató található a weboldalon, 95€-ért kapható, jelenleg 17 db van raktáron! Gyors megtalálás érdekében kattints a KATT szó-ra! ",
            isBot: true,
            productUrl: "http://localhost:3000/product/66293342f6cbea588c17e774",
          };
        } else if (selectedBrand.includes("steelseries")) {
          responseMessage = {
            text: "Steelseries Arctis 5 Fejhallgató található a weboldalon, 115€-ért kapható, jelenleg 8 db van raktáron! Gyors megtalálás érdekében kattints a KATT szó-ra! ",
            isBot: true,
            productUrl: "http://localhost:3000/product/66293405f6cbea588c17e8f8",
          };
        } else {
          responseMessage = {
            text: `Sajnálom, a "${selectedBrand}" nem található a kategóriában.`,
            isBot: true,
          };
        }
      } else {
        responseMessage = {
          text: "Kérlek, először válassz kategóriát: Monitor, Telefon, vagy Laptop!",
          isBot: true,
        };
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Utolsó lépés után
      responseMessage = {
        text: "Ha további segítségre lenne szükséged, kérlek töröld az üzeneteket!",
        isBot: true,
      };
    } else {
      responseMessage = {
        text: "Kérlek, használd a chatbotot a fenti utasítások szerint.",
        isBot: true,
      };
    }
  
    const updatedMessages = [...messages, newMessage, responseMessage];
    setMessages(updatedMessages);
    saveMessagesToLocalStorage(updatedMessages);
  
    setInputText("");
  };

  // chat ablak bezárása
  const handleCloseChat = () => {
    if (!isMinimized) {
      localStorage.removeItem("chatMessages");
      setMessages([]);
    }
    setIsOpen(false);
  };

  // chat ablak minimalizálása
  const handleMinimizeChat = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  // üzenetek törlése
  const handleClearMessages = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);

    const welcomeMessage = {
      text: "Üdvözöllek! Chatbot vagyok, termékek keresésében tudok segíteni! Írd be a következőt: Kategoria",
      isBot: true,
    };
    setMessages([welcomeMessage]);
    saveMessagesToLocalStorage([welcomeMessage]);
    setCurrentStep(1);
  };

  // Enter lenyomása
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed bottom-4 right-10">
          <div className="bg-white border rounded-lg shadow-md w-80 h-96 flex flex-col">
            <div className="bg-blue-500 text-white px-4 py-2 font-bold flex justify-between items-center">
              Chatbot
              <div className="flex items-center">
                <button
                  onClick={handleMinimizeChat}
                  className="text-white font-bold mr-2"
                >
                  <AiOutlineMinus size={22} />
                </button>
                <button
                  onClick={handleCloseChat}
                  className="text-white font-bold"
                >
                  X
                </button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message, index) => (
                <div key={index} className="mb-2">
                  {message.isBot ? (
                    <div className="flex justify-start mb-2">
                      <div className="bg-gray-200 rounded-lg p-2">
                        {message.text}
                        {message.productUrl && (
                          <a href={message.productUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-1 underline">KATT</a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end mb-2">
                      <div className="bg-blue-500 text-white rounded-lg p-2">
                        {message.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 flex items-center justify-between">
              <input
                type="text"
                placeholder="Írj üzenetet..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                onClick={handleSendMessage}
              >
                <AiOutlineSend size={20} />
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={handleClearMessages}
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <div
          className="fixed bottom-12 right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex justify-center items-center cursor-pointer"
          onClick={handleOpenChat}
        >
          <AiOutlineRobot size={34} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
