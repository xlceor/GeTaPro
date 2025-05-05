// extensions/CustomTextStyle.ts
import { Mark } from '@tiptap/core';

const CustomTextStyle = Mark.create({
  name: 'customTextStyle',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      fontFamily: {
        default: null,
        parseHTML: (el) => el.style.fontFamily.replace(/['"]/g, ''),
        renderHTML: (attrs) => ({
          style: attrs.fontFamily ? `font-family: ${attrs.fontFamily}` : null,
        }),
      },
      fontSize: {
        default: null,
        parseHTML: (el) => el.style.fontSize,
        renderHTML: (attrs) => ({
          style: attrs.fontSize ? `font-size: ${attrs.fontSize}` : null,
        }),
      },
    };
  },
  

  parseHTML() {
    return [{ tag: 'span' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },
});

export default CustomTextStyle;