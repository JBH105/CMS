import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

const FloatingField = ({
  id,
  label,
  type = "text",
  formik,
  as: Component = Input,
  ...props
}) => {
  const error = formik.touched[id] && formik.errors[id];
  const value = formik.values[id];

  return (
    <div className="relative w-full">
      <Component
        id={id}
        name={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`peer h-11 w-full rounded-lg border bg-white px-3 pt-4 pb-1 text-sm outline-none transition
  ${
    error
      ? "border-red-500 focus:border-red-500 focus:ring-0"
      : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
  }
  ${Component === Textarea ? "min-h-[80px] resize-none" : ""}
`}
        {...props}
      />

      <label
        htmlFor={id}
        className={`
    pointer-events-none
    absolute left-3 top-3
    text-sm
    transition-all duration-200
    ${error ? "text-red-500" : "text-gray-500 peer-focus:text-blue-600"}
    peer-focus:-top-2
    peer-focus:text-xs
    peer-focus:bg-white
    peer-focus:px-1
    peer-placeholder-shown:top-3
    peer-placeholder-shown:text-sm
    peer-not-placeholder-shown:-top-2
    peer-not-placeholder-shown:text-xs
    peer-not-placeholder-shown:bg-white
    peer-not-placeholder-shown:px-1
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


 export default FloatingField;