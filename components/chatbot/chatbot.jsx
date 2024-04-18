import { useState, useEffect } from "react";
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

  const steps = [
    {
      text: "Üdvözöllek! Egy chatbot vagyok, termékek keresésében tudok segíteni!",
      isBot: true,
    },
    {
      text: "Írd be a következőt: Kategória ",
      isBot: true,
    },
  ];

  const handleOpenChat = () => {
    setIsOpen(true);
    if (!hasOpenedBefore) {
      setMessages([...messages, steps[0], steps[1]]);
      saveMessagesToLocalStorage([...messages, steps[0], steps[1]]);
      setHasOpenedBefore(true);
      setCurrentStep(1);
    }
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const saveMessagesToLocalStorage = (messagesToSave) => {
    localStorage.setItem("chatMessages", JSON.stringify(messagesToSave));
  };

  const handleSendMessage = () => {
    if (inputText.trim() === "") {
      return;
    }

    const newMessage = {
      text: inputText,
      isBot: false,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    saveMessagesToLocalStorage(updatedMessages);

    setInputText("");

    let responseMessage;

    if (currentStep === 1) {
      if (inputText.toLowerCase().includes("kategória")) {
        responseMessage = {
          text: "Válassz kategóriát: Monitor, Telefon, vagy Laptop!",
          isBot: true,
        };
        setCurrentStep(2);
      } else {
        responseMessage = {
          text: "Ez nem egy érvényes parancs. Kérlek, írd be: Kategória",
          isBot: true,
        };
      }
    } else if (currentStep === 2) {
      const category = inputText.toLowerCase();
      if (category.includes("monitor")) {
        responseMessage = {
          text: "Monitor kategória: Acer, Samsung, LG",
          isBot: true,
        };
      } else if (category.includes("telefon")) {
        responseMessage = {
          text: "Telefon kategória: iPhone, Samsung, Huawei",
          isBot: true,
        };
      } else if (category.includes("laptop")) {
        responseMessage = {
          text: "Laptop kategória: Dell, HP, Asus",
          isBot: true,
        };
      } else {
        responseMessage = {
          text: "Ez a kategória nem érvényes. Válassz: Monitor, Telefon, vagy Laptop",
          isBot: true,
        };
      }
      setCurrentStep(3); // Kategóriaválasztás után a következő lépés
    } else if (currentStep === 3) {
      // Ellenőrizzük, hogy a felhasználó választott-e már kategóriát
      if (
        messages[messages.length - 1].isBot &&
        messages[messages.length - 1].text.includes("kategória")
      ) {
        const selectedBrand = inputText.toLowerCase();
        if (selectedBrand.includes("dell")) {
          responseMessage = {
            text: "Dell x2 244 Hz monitor található, 245 euróért, jelenleg 4 db van a raktáron!",
            isBot: true,
          };
        } else if (selectedBrand.includes("hp")) {
          responseMessage = {
            text: "HP laptopok: HP Envy, HP Pavilion, HP Spectre",
            isBot: true,
          };
        } else if (selectedBrand.includes("asus")) {
          responseMessage = {
            text: "Asus laptopok: Asus ZenBook, Asus ROG, Asus VivoBook",
            isBot: true,
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
    } else {
      responseMessage = {
        text: "Kérlek, használd a chatbotot a fenti utasítások szerint.",
        isBot: true,
      };
    }

    setMessages([...updatedMessages, responseMessage]);
    saveMessagesToLocalStorage([...updatedMessages, responseMessage]);
  };

  const handleCloseChat = () => {
    if (!isMinimized) {
      localStorage.removeItem("chatMessages");
      setMessages([]);
    }
    setIsOpen(false);
  };

  const handleMinimizeChat = () => {
    setIsMinimized(true);
    setIsOpen(false);
  };

  const handleClearMessages = () => {
    localStorage.removeItem("chatMessages");
    setMessages([]);

    const welcomeMessage = {
      text: "Üdvözöllek! Egy chatbot vagyok, termékek keresésében tudok segíteni! Írd be a következőt: Kategória",
      isBot: true,
    };
    setMessages([welcomeMessage]);
    saveMessagesToLocalStorage([welcomeMessage]);
    setCurrentStep(1); // Vissza az alap lépéshez
  };

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
                <div
                  key={index}
                  className={`${
                    message.isBot ? "text-left" : "text-right"
                  } mb-2`}
                >
                  <div
                    className={`${
                      message.isBot
                        ? "bg-gray-200 rounded-lg p-2"
                        : "bg-blue-500 text-white rounded-lg p-2"
                    }`}
                  >
                    {message.text}
                  </div>
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
