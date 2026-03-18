import { Spinner } from "@/shared/ui/spinner";

function Loader() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
      <Spinner className="size-11 text-blue-600 animate-spin" />
      <p className="text-blue-600 font-semibold text-lg">CMS</p>
    </div>
  );
}

export default Loader;
