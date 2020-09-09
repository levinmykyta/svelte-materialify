/* eslint-disable no-param-reassign */

/**
 * @param node {Element}
 * @param text {string|boolean}
 */
export default (node, text) => {
  let klass;
  if (text) {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(text)) {
      // This is a CSS hex.
      node.style.color = text;
      klass = false;
    } else if (text.startsWith('--')) {
      // This is a CSS variable.
      node.style.color = `var(${text})`;
      klass = false;
    } else {
      klass = `${text}-text`;
      node.classList.add(klass);
    }
  }

  return {
    update(newText) {
      if (klass) {
        node.classList.remove(klass);
      } else {
        node.style.color = null;
      }

      if (newText) {
        if (/^#([0-9A-F]{3}){1,2}$/i.test(newText)) {
          // This is a CSS hex.
          node.style.color = newText;
          klass = false;
        } else if (text.startsWith('--')) {
          // This is a CSS variable.
          node.style.color = `var(${newText})`;
          klass = false;
        } else {
          klass = `${newText}-text`;
          node.classList.add(klass);
        }
      }
    },
  };
};
