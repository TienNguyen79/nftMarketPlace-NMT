import React from 'react';
import { useController } from 'react-hook-form';
import './input.scss';
interface Tinput {
  control: any;
  name: string;
  type: string;
  error?: string;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  kind?: string;
  icon?: string;
  value?: any;
  rest?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: Tinput) => {
  const {
    control,
    name,
    type = 'text',
    error = '',
    placeholder,
    children,
    className,

    kind = 'btn',
    onChange,
    ...rest
  } = props;

  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  // Hàm handleChange chỉ gọi prop onChange nếu nó tồn tại
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <div className="box-input">
        <input
          type={type}
          placeholder={placeholder}
          {...field}
          onChange={handleChange}
          {...rest}
          className={`Tinput ${kind === 'primary' && 'pl-text'} ${
            kind === 'search' && 'pr-text'
          }  ${kind === 'eye' && 'pl-text'} ${className}`}
        ></input>

        {children && kind === 'primary' && <div className="inputType-Primary">{children}</div>}

        {children && kind === 'search' && <div className="inputType-Search">{children}</div>}

        {children && kind === 'btn' && <div className="inputType-btn">{children}</div>}

        {children && kind === 'eye' && <div className="inputType-eye">{children}</div>}
      </div>
      {error && <span className="inputType-Error">Please ! Name has not empty..</span>}
    </div>
  );
};

export default Input;
