import Skeleton from "react-loading-skeleton";

export default function Loading() {
  return (
    <div>
      {<Skeleton height="504px" width="100%" />}
      <div className="fixed inset-0 w-screen h-screen  bg-[rgba(0,0,0,0.5)]  z-[9999] flex items-center justify-center">
        <div className="border-8 border-gray-200 border-t-[8px] border-t-[#B32646] rounded-full w-15 h-15 animate-spin"></div>
      </div>
    </div>
  );
}
