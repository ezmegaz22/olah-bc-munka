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

  const handleOpenChat = () => {
    setIsOpen(true);
    if (!hasOpenedBefore) {
      const welcomeMessage = {
        text: "Üdvözöllek! Egy chatbot vagyok, termékek lekérdezésében tudok segíteni! Pl: apple",
        isBot: true,
      };
      setMessages([welcomeMessage]);
      saveMessagesToLocalStorage([welcomeMessage]);
      setHasOpenedBefore(true);
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

    if (inputText.toLowerCase().includes("apple")) {
      responseMessage = {
        text: "Az alábbi Apple telefon található a weboldalon: iPhone 15, fekete színben, 1455 euróért.",
        isBot: true,
      };
    } else if (inputText.toLowerCase().includes("samsung")) {
      responseMessage = {
        text: "Sajnálom, ilyen termék nincs a weboldalon!",
        isBot: true,
      };
    } else if (inputText.toLowerCase().includes("csoka diana")) {
      responseMessage = {
        text: "Olah Geza nagyon szereti Csoka Dianat, mint a szeme fényét!",
        isBot: true,
      };
    } else {
      responseMessage = {
        text: "Sajnálom, nem értem mit szeretnél. Kérlek, próbáld újra!",
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

    // Újra üdvözöljük a felhasználót
    const welcomeMessage = {
      text: "Üdvözöllek újra! Chatbot vagyok, termek keresesben tudok segiteni! Pl: apple",
      isBot: true,
    };
    setMessages([welcomeMessage]);
    saveMessagesToLocalStorage([welcomeMessage]);
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
                <AiOutlineDelete size={20} /> {/* Kuka ikon */}
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
