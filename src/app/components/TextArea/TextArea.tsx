import React from 'react';
import { useController } from 'react-hook-form';
import './textArea.scss';
interface TArea {
  control: any;
  name: string;
  error?: string;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
  rest?: any;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = (props: TArea) => {
  const { control, name, error = '', placeholder, children, className, onChange, ...rest } = props;

  const { field } = useController({
    control,
    name,
    defaultValue: '',
  });

  // Hàm handleChange chỉ gọi prop onChange nếu nó tồn tại
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    field.onChange(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div>
      <div className="box-area">
        <textarea
          placeholder={placeholder}
          {...field}
          onChange={handleChange}
          {...rest}
          className={`Tarea  ${className}`}
        ></textarea>
      </div>
      {/* {error && <span className="inputType-Error">Please ! Name has not empty..</span>} */}
    </div>
  );
};

export default TextArea;
