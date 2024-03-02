import QueueAnim from "rc-queue-anim";
export default function FilterCard({ vehicles }) {
  return (
    <>
      <QueueAnim
        delay={400}
        className="grid grid-cols-2 md:grid-cols-4 font-lato gap-5"
      >
        {vehicles?.map((vehicle, index) => (
          <div key="index" className="shadow-md overflow-hidden">
            <img
              src={vehicle.images[1]}
              alt={vehicle.brand + " " + vehicle.model}
              className="object-cover h-[150px] hover:scale-105 transition-all duration-200"
            />
            <div className="px-2">
              <span>
                <h1>{vehicle.brand + " " + vehicle.model}</h1>
              </span>
            </div>
          </div>
        ))}
      </QueueAnim>
    </>
  );
}
