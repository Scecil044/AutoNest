import { lineWobble } from "ldrs";

lineWobble.register();

export default function ImageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/50">
      <div>
        <div className="flex flex-col gap-5">
          <l-line-wobble
            size="120"
            stroke="4"
            bg-opacity="0.1"
            speed="1.75"
            color="white"
          ></l-line-wobble>
          <h2 className="text-white text-sm animate-pulse">Uploading...</h2>
        </div>
      </div>
    </div>
  );
}
