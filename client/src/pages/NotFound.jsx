import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-5 items-center font-lato">
        <div className="p-5 border-r-4 border-popsicle">
          <h1 className="font-bold text-darkGreen text-7xl md:text-9xl">404</h1>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h2 className=" text-xl md:text-2xl">
              Looks like the resource you are trying to access is not known to
              us
            </h2>
            <h3 className="text-neutral-500">
              Refresh of navigate back to the previous pages
            </h3>
          </div>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-darkGreen text-white self-start p-1 px-4 md:py-3 md:px-4 shadow-md hover:shadow-none"
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
