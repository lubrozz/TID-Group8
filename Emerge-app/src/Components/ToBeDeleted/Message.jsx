export default function Message({ text, sender }) {
    const isProfessional = sender === "professional";
    return (
      <div className={`flex ${isProfessional ? "justify-end" : "justify-start"} mb-2`}>
        <div
          className={`px-4 py-2 rounded-2xl max-w-xs ${
            isProfessional ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {text}
        </div>
      </div>
    );
  }
  