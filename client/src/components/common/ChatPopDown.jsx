const mock = [
  {
    userName: "Julio",
    profilePicture: "https://randomuser.me/portraits/men/45.jpg",
    message:
      "This is a reminder message. You need to update my payments to reflect my account status. This needs to be done ASAP for me to post new vehicles",
  },
  {
    userName: "Anthonny",
    profilePicture: "https://randomuser.me/portraits/men/4.jpg",
    message:
      "This is a reminder message. You need to update my payments to reflect my account status. This needs to be done ASAP for me to post new vehicles",
  },
  {
    userName: "JeremihD",
    profilePicture: "https://randomuser.me/portraits/women/5.jpg",
    message:
      "This is a reminder message. You need to update my payments to reflect my account status. This needs to be done ASAP for me to post new vehicles",
  },
  {
    userName: "Suzanne",
    profilePicture: "https://randomuser.me/portraits/women/45.jpg",
    message:
      "This is a reminder message. You need to update my payments to reflect my account status. This needs to be done ASAP for me to post new vehicles",
  },
];
export default function ChatPopDown({
  openChatDropDown,
  setOpenChatDropDown,
  messagePopUp,
  setMessagePopUp,
}) {
  const handleChat = () => {
    setOpenChatDropDown(false);
    setMessagePopUp(true);
  };
  return (
    <div className="flex flex-col gap-2">
      {mock.slice(0, 3).map((message, index) => (
        <div
          onClick={handleChat}
          key={index}
          className="flex gap-2 cursor-pointer"
        >
          <img
            src={message.profilePicture}
            alt="..."
            className="rounded-full object-cover h-10 w-10"
          />
          <div className="bg-pink-50 p-1">
            <p className="text-gray-500 line-clamp-2 text-xs">
              {message.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
