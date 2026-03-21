import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const FloatingSelect = ({
  id,
  label,
  formik,
  options = [],
  onValueChange,
  includeNone = true,
}) => {
  const error = formik.touched[id] && formik.errors[id];

  const updatedOptions = includeNone
    ? [{ label: "None", value: "none" }, ...options]
    : options;

  const rawValue = formik.values[id];
  const value = rawValue === "" ? "none" : rawValue || "none";

  const isEmpty = !rawValue || rawValue === "none" || rawValue === "";

  return (
    <div className="relative w-full">
      <Select
        key={value}
        value={value}
        onValueChange={(val) => {
          const finalValue = val === "none" ? "" : val;
          formik.setFieldValue(id, finalValue);
          if (onValueChange) onValueChange(finalValue);
        }}
        onBlur={() => formik.setFieldTouched(id, true)}
      >
        <SelectTrigger
          size="floating"
          className={`peer h-12 w-full rounded-md border bg-white px-3 pt-4 pb-1 text-sm shadow-sm outline-none transition-all
            ${error
              ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              : "border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
            }
            ${isEmpty ? "[&>span]:opacity-0" : "[&>span]:opacity-100 text-zinc-900"}
          `}
        >
          <SelectValue placeholder=" " />
        </SelectTrigger>

        <SelectContent>
          {updatedOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Floating Label */}
      <label
        className={`
          pointer-events-none
          absolute left-3
          transition-all duration-200
          z-10
          
          ${isEmpty
            ? "top-3.5 text-sm text-zinc-500 bg-transparent px-0"
            : "top-2 text-[11px] font-medium text-zinc-500 bg-white px-1"
          }
          ${error && isEmpty ? "text-rose-500" : ""}
          ${error && !isEmpty ? "text-rose-500" : ""}

          peer-focus-within:top-2 
          peer-focus-within:text-[11px] 
          peer-focus-within:font-medium 
          ${error ? "peer-focus-within:text-rose-500" : "peer-focus-within:text-zinc-900"}
          peer-focus-within:bg-white 
          peer-focus-within:px-1

          peer-data-[state=open]:top-2 
          peer-data-[state=open]:text-[11px] 
          peer-data-[state=open]:font-medium 
          ${error ? "peer-data-[state=open]:text-rose-500" : "peer-data-[state=open]:text-zinc-900"}
          peer-data-[state=open]:bg-white 
          peer-data-[state=open]:px-1
        `}
      >
        {label}
      </label>

      {/* Error */}
      {error && (
        <p className="text-rose-500 text-xs mt-1.5 font-medium">{formik.errors[id]}</p>
      )}
    </div>
  );
};

export default FloatingSelect;
