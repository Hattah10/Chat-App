import Select, { type StylesConfig } from "react-select"
import { useTheme } from "../theme-provider"

type Option = {
  value: string | number
  label: string
}

type Props = {
  options: Option[]
  placeholder: string | null
  setSelect: React.Dispatch<React.SetStateAction<(string | number)[]>>
}

export default function MultiSelect({
  options,
  placeholder = "",
  setSelect,
}: Props) {
  const { theme } = useTheme()
  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme
  const isDarkMode = resolvedTheme === "dark"

  const selectStyles: StylesConfig<Option, true> = {
    control: (base, state) => ({
      ...base,
      minHeight: "40px",
      borderRadius: "6px",
      borderColor: state.isFocused
        ? isDarkMode
          ? "#fafafa"
          : "#18181b"
        : isDarkMode
          ? "#27272a"
          : "#e4e4e7",
      backgroundColor: isDarkMode ? "#09090b" : "#ffffff",
      boxShadow: "none",
      "&:hover": {
        borderColor: isDarkMode ? "#3f3f46" : "#a1a1aa",
      },
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#09090b" : "#ffffff",
      border: `1px solid ${isDarkMode ? "#27272a" : "#e4e4e7"}`,
      borderRadius: "6px",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "#27272a"
          : "#f4f4f5"
        : state.isSelected
          ? isDarkMode
            ? "#fafafa"
            : "#18181b"
          : "transparent",

      color: state.isSelected
        ? isDarkMode
          ? "#18181b"
          : "#ffffff"
        : isDarkMode
          ? "#fafafa"
          : "#18181b",
    }),

    multiValue: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#27272a" : "#f4f4f5",
    }),

    multiValueLabel: (base) => ({
      ...base,
      color: isDarkMode ? "#fafafa" : "#18181b",
    }),

    multiValueRemove: (base) => ({
      ...base,
      color: isDarkMode ? "#a1a1aa" : "#71717a",
      ":hover": {
        backgroundColor: isDarkMode ? "#3f3f46" : "#e4e4e7",
        color: isDarkMode ? "#ffffff" : "#18181b",
      },
    }),

    input: (base) => ({
      ...base,
      color: isDarkMode ? "#fafafa" : "#18181b",
    }),

    placeholder: (base) => ({
      ...base,
      color: isDarkMode ? "#71717a" : "#71717a",
    }),

    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? "#fafafa" : "#18181b",
    }),
  }

  return (
    <Select
      options={options}
      name="userOptions"
      isMulti
      styles={selectStyles}
      className="text-sm"
      classNamePrefix="select"
      placeholder={placeholder ?? "Select..."}
      onChange={(selected) => {
        const values = selected.map((option) => option.value)
        setSelect(values)
      }}
    />
  )
}
