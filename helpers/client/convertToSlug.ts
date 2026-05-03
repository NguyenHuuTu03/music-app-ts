import unidecode from "unidecode";

export const convertToSlug = (text: string) => {
  const unidecodeSlug = unidecode(text).trim(); // bỏ hết dấu
  const slug: string = unidecodeSlug.replace(/\s+/g, "-"); // bỏ các khoảng trắng giữa các từ rồi thay thế "-"
  return slug;
};
