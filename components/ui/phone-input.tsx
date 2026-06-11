import { Check } from "lucide-react"
import * as React from "react"
import * as RPNInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Input, type InputProps } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void
  }

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, ...props }, ref) => {
      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelect}
          inputComponent={InputComponent}
          /**
           * Handles the onChange event.
           *
           * react-phone-number-input might trigger the onChange event as undefined
           * when a valid phone number is not entered. To prevent this,
           * the value is coerced to an empty string.
           *
           * @param {E164Number | undefined} value - The entered value
           */
          onChange={(value) => onChange?.(value || "")}
          {...props}
        />
      )
    }
  )
PhoneInput.displayName = "PhoneInput"

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <Input
      className={cn("rounded-e-xl rounded-s-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm h-full w-full", className)}
      {...props}
      ref={ref}
    />
  )
)
InputComponent.displayName = "InputComponent"

type CountrySelectOption = { label: string; value: RPNInput.Country }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: CountrySelectOption[]
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country)
    },
    [onChange]
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "flex items-center gap-2 rounded-e-none rounded-s-xl px-4 hover:bg-transparent text-foreground h-full border-r border-border"
          )}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          {value && (
            <span className="text-sm font-medium">
              +{RPNInput.getCountryCallingCode(value)}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandInput placeholder="Rechercher un pays..." />
            <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.value)
                .map((option) => (
                  <CommandItem
                    className="gap-2"
                    key={option.value}
                    value={option.label || option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <FlagComponent
                      country={option.value}
                      countryName={option.label}
                    />
                    {option.value && (
                      <span className="text-sm font-semibold">
                        {`+${RPNInput.getCountryCallingCode(option.value)}`}
                      </span>
                    )}
                    <span className="flex-1 text-sm text-foreground/70">{option.label}</span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        option.value === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm items-center justify-center">
      {Flag && <Flag title={countryName} className="w-full h-full object-cover" />}
    </span>
  )
}
export { PhoneInput }
