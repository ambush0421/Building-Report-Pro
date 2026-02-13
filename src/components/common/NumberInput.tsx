import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatNumber, parseNumberInput } from '@/utils/format';

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  suffix?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: string;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  label,
  suffix = "만원",
  placeholder,
  disabled = false,
  helperText,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // 현재 입력값 결정: 포커스 중일 때는 내부 입력값, 아닐 때는 포맷팅된 value
  const displayValue = isFocused 
    ? inputValue 
    : (value === 0 ? "" : formatNumber(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // 숫자와 콤마만 허용
    const cleanValue = rawValue.replace(/[^0-9,]/g, "");
    setInputValue(cleanValue);
    
    const numValue = parseNumberInput(cleanValue);
    onChange(numValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setInputValue(value === 0 ? "" : value.toString()); // 포커스 시 콤마 제거
  };

  return (
    <div className={`grid w-full items-center gap-1.5 ${className}`}>
      {label && <Label>{label}</Label>}
      <div className="relative flex items-center">
        <Input
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-12"
        />
        <div className="absolute right-3 text-sm text-muted-foreground pointer-events-none">
          {suffix}
        </div>
      </div>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default NumberInput;
