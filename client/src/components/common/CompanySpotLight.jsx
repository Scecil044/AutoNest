import { Carousel } from "flowbite-react";
import { IoThermometer } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

export default function CompanySpotLight() {
  const mockData = [
    {
      id: 1,
      title: "Our Story",
    },
    {
      id: 1,
      title: "Why AutoNest?",
    },
    {
      id: 1,
      title: "Scope and Values",
    },
    {
      id: 1,
      title: "Sustainability",
    },
  ];
  return (
    <>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 relative">
        <Carousel slideInterval={5000}>
          <img
            src="https://miro.medium.com/v2/resize:fit:852/1*mUd3vykZLFMQrM5v55bELQ.jpeg"
            alt="..."
            className="object-cover w-full"
          />
          <img
            src="https://e1.pxfuel.com/desktop-wallpaper/732/624/desktop-wallpaper-call-centre-clouds-solutions-for-small-call-center-thumbnail.jpg"
            alt="..."
            className="object-cover w-full"
          />
          <img
            src="https://cdn.pixabay.com/photo/2017/07/15/09/42/call-center-2505957_640.jpg"
            alt="..."
            className="object-cover w-full"
          />
        </Carousel>
        <div className="w-full inset-0 bg-gradient-to-tr from-pink-600 to-indigo-600/50 absolute"></div>
      </div>
      <div className="p-10 bg-pampas relative">
        <h1 className="text-xl font-bold text-center my-5">
          Company Spotlight
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {mockData?.map((item, index) => (
            <div key={index} className="p-5 bg-[#003566] text-white relative">
              <h1 className="text-center">{item.title}</h1>
              <div className="p-5 bg-popsicle right-2 w-10 h-8 absolute"></div>
              <IoAdd className="h-7 w-7 text-white absolute right-4 top-12" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
