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
  options,
  value,
  onValueChange,
}) => {
  const error = formik.touched[id] && formik.errors[id];

  return (
    <div className="relative w-full">
      <Select
        key={formik.values[id]}
        value={formik.values[id] || ""}
        onValueChange={(val) => {
          formik.setFieldValue(id, val);
          if (onValueChange) onValueChange(val);
        }}
        onBlur={() => formik.setFieldTouched(id, true)}
      >
        <SelectTrigger
          className={`peer h-11 w-full rounded-lg border bg-white px-3 pt-4 pb-1 text-sm outline-none transition
  ${
    error
      ? "border-red-500 focus:border-red-500 focus:ring-0"
      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  }
`}
        >
          <SelectValue placeholder=" " />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <label
        className={`
    pointer-events-none
    absolute left-3
    transition-all duration-200
    bg-white px-1

    ${
      error
        ? "top-3 text-sm text-red-500"
        : formik.values[id]
          ? "-top-2 text-xs text-gray-600"
          : "top-3 text-sm text-gray-500"
    }

    ${
      !error &&
      "peer-focus-within:-top-2 peer-focus-within:text-xs peer-focus-within:text-blue-600"
    }

    ${!error && "peer-data-[state=open]:-top-2 peer-data-[state=open]:text-xs"}
  `}
      >
        {label}
      </label>
      {error && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[id]}</p>
      )}
    </div>
  );
};


export default FloatingSelect;