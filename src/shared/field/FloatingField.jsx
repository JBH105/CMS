import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { getIn } from "formik";

const FloatingField = ({
  id,
  label,
  type = "text",
  formik,
  as: Component = Input,
  ...props
}) => {
  const value = getIn(formik.values, id);
  const error = getIn(formik.touched, id) && getIn(formik.errors, id);

  return (
    <div className="relative w-full">
      <Component
        id={id}
        name={id}
        type={type}
        placeholder=" "
        value={value || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`peer h-12 w-full rounded-md border bg-white px-3 pt-4 pb-1 text-sm text-zinc-900 shadow-sm outline-none transition-all
  ${
    error
      ? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
      : "border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
  }
  ${Component === Textarea ? "min-h-[100px] resize-none pt-6" : ""}
`}
        {...props}
      />

      <label
        htmlFor={id}
        className={`
    pointer-events-none
    absolute left-3 top-3.5
    text-sm
    transition-all duration-200
    ${error ? "text-rose-500" : "text-zinc-500 peer-focus:text-zinc-900"}
    peer-focus:top-2
    peer-focus:text-[11px]
    peer-focus:font-medium
    peer-focus:bg-white
    peer-focus:px-1
    peer-placeholder-shown:top-3.5
    peer-placeholder-shown:text-sm
    peer-not-placeholder-shown:top-2
    peer-not-placeholder-shown:text-[11px]
    peer-not-placeholder-shown:font-medium
    peer-not-placeholder-shown:bg-white
    peer-not-placeholder-shown:px-1
    z-10
  `}
      >
        {label}
      </label>

      {error && (
        <p className="text-rose-500 text-xs mt-1.5 font-medium">{getIn(formik.errors, id)}</p>
      )}
    </div>
  );
};

export default FloatingField;
