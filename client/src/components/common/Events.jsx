export default function Events() {
  return (
    <div className="h-[300px] relative">
      <div className="inset-0 bg-black/50 absolute"></div>
      <div className="bg-popsicle p-5 absolute left-6 z-30 w-16 md:left-20"></div>
      <img
        src="https://www.bmw.co.ke/content/dam/bmw/common/all-models/x-series/x6/2023/highlights/bmw-x-series-x6-sp-desktop.jpg"
        alt=""
        className="h-[300px] object-cover w-full"
      />
      <div className="absolute bg-[#003566]/90 w-[90%] p-5 z-10 -top-10 md:left-[100px] left-[40px] text-white text-center">
        <h1 className="mt-14 text-lg font-semibold mb-2">AUTO_NEST_KENYA</h1>
        <p className="text-center md:w-[70%] mx-auto mb-8">
          The Definity Insurance Foundation is a Canadian registered charity
          dedicated to making a difference in the lives of Canadians,
          particularly in marginalized and underserved areas. We make grants
          available to registered charities that address the health and
          environmental impacts of inequality through community-based services,
          advocacy and awareness initiatives, and research and knowledge
          development.
        </p>
      </div>
    </div>
  );
}
