import { Spinner } from "@/shared/ui/spinner";

function Loader() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center">
      <Spinner className="size-11 text-zinc-900 animate-spin" />
      <p className="text-zinc-900 font-semibold text-lg mt-2 tracking-tight">CMS</p>
    </div>
  );
}

export default Loader;
