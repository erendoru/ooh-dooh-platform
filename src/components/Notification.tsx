import React from "react";

interface NotificationProps {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md ${
        type === "error" ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      <p>{message}</p>
      <button onClick={onClose} className="absolute top-1 right-1 text-white">
        &times;
      </button>
    </div>
  );
};

export default Notification;
