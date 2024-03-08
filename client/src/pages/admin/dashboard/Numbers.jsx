export default function Numbers() {
  return (
    <div className="bg-white p-5 shadow-lg hover:scale-105 transition-all duration-500 flex- flex-col items-start relative">
      <h1 className="text-darkGreen font-semibold">Vehicles by brand</h1>
      <div className="flex flex-col gap-1 px-5">
        <span className="flex justify-between">
          <h1 className="text-darkGreen font-semibold">BMW </h1>
          <span>25</span>
        </span>
        <span className="flex justify-between">
          <h1 className="text-darkGreen font-semibold">Subaru </h1>
          <span>21</span>
        </span>
        <span className="flex justify-between">
          <h1 className="text-darkGreen font-semibold">Honda</h1>
          <span>251</span>
        </span>
        <span className="flex justify-between">
          <h1 className="text-darkGreen font-semibold">Toyota </h1>
          <span>250</span>
        </span>
        <span className="flex justify-between">
          <h1 className="text-darkGreen font-semibold">Mercedes</h1>
          <span>250</span>
        </span>
        <div className="absolute py-3 px-4 bg-indigo-800 top-0 -left-4"></div>
      </div>
    </div>
  );
}
