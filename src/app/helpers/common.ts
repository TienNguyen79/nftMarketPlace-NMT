import moment from 'moment';
import { IndexedObject } from 'types/common';

// Validate
export const checkPassword = /^.{6,}$/;
export const checkRePassword = (password: string) => new RegExp('^(' + password + ')$', 'g');
export const regexCheckNumber = /^\d+$/;
export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

// Common
export const isMobile = window.screen.width <= 1024;

export const DEFAULT_MAX_LENGTH_BIO = 210;

export const publicUrl = (uri: string) => {
  return `${process.env.PUBLIC_URL}${uri}`;
};

export const isEmptyObject = (obj: IndexedObject) => {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }
  return JSON.stringify(obj) === JSON.stringify({});
};

export const isToday = (date: Date) => moment(date).isSame(moment(), 'day');

// check ảnh
export function checkImageExtension(fileNameOrUrl: string): boolean {
  // Tạo một mảng chứa các đuôi tệp ảnh được chấp nhận
  const imageExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif'];

  // Biểu thức chính quy để kiểm tra xem chuỗi có phải là một URL hợp lệ không
  const urlRegex: RegExp = /^(ftp|http|https):\/\/[^ "]+$/;

  // Kiểm tra xem fileNameOrUrl có tồn tại không
  if (!fileNameOrUrl) {
    return false; // Trả về false nếu fileNameOrUrl không tồn tại
  }

  // Nếu fileNameOrUrl là một URL
  if (urlRegex.test(fileNameOrUrl)) {
    // Kiểm tra xem URL có chứa phần mở rộng của tệp ảnh không
    const extension: string = fileNameOrUrl.split('.').pop()?.toLowerCase() || '';
    if (imageExtensions.includes(extension)) {
      return true; // Trả về true nếu đuôi tệp ảnh hợp lệ
    } else {
      return false; // Trả về false nếu đuôi tệp ảnh không hợp lệ
    }
  } else {
    // Nếu fileNameOrUrl không phải là một URL, kiểm tra đuôi tệp trực tiếp
    const extension: string = fileNameOrUrl.split('.').pop()?.toLowerCase() || '';
    if (imageExtensions.includes(extension)) {
      return true; // Trả về true nếu đuôi tệp ảnh hợp lệ
    } else {
      return false; // Trả về false nếu đuôi tệp ảnh không hợp lệ
    }
  }
}

// convertDate
export const convertDate = (data: string): string => {
  const dateTimeString: string = data;
  const date: Date = new Date(dateTimeString);
  const options = { year: 'numeric' } as const;
  const options2 = { month: 'long' } as const;
  const options3 = { day: 'numeric' } as const;
  // as const là không thể thay đổi sau khi đã khai báo.
  return (
    date.toLocaleDateString('en-US', options2).slice(0, 3) +
    ' ' +
    date.toLocaleDateString('en-US', options3) +
    ', ' +
    date.toLocaleDateString('en-US', options)
  );
};

export const convertDateNumeric = (data: string): string => {
  const dateTimeString: string = data;
  const date: Date = new Date(dateTimeString);
  const Year = { year: 'numeric' } as const;
  const Month = { month: 'numeric' } as const;
  const Day = { day: 'numeric' } as const;
  // as const là không thể thay đổi sau khi đã khai báo.
  return (
    date.toLocaleDateString('en-US', Day) +
    '/' +
    date.toLocaleDateString('en-US', Month) +
    '/' +
    date.toLocaleDateString('en-US', Year)
  );
};

export const imgbbAPI = 'https://api.imgbb.com/1/upload?key=471e05773a3233969fa7154e10a6061c';

export function convertEth(number: number): number {
  return Math.floor(number / 1000) % 100;
}

export enum statusSellnft {
  sell = 'sell',
  mint = 'mint',
}
