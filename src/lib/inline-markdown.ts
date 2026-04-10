// Minimal inline markdown parser: *bold* and _italic_
// Supports escapes: \* → literal *, \_ → literal _
// Output is safe HTML (input is HTML-escaped before applying markdown).

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Private-use Unicode placeholders so escaped delimiters are invisible to the
// markdown regexes and get restored as literal characters at the end.
const STAR_PLACEHOLDER = "\uE000";
const UNDER_PLACEHOLDER = "\uE001";

function protectEscapes(text: string): { text: string; hasEscape: boolean } {
  let hasEscape = false;
  const protectedText = text
    .replace(/\\\*/g, () => {
      hasEscape = true;
      return STAR_PLACEHOLDER;
    })
    .replace(/\\_/g, () => {
      hasEscape = true;
      return UNDER_PLACEHOLDER;
    });
  return { text: protectedText, hasEscape };
}

function restoreEscapes(text: string): string {
  return text
    .replace(new RegExp(STAR_PLACEHOLDER, "g"), "*")
    .replace(new RegExp(UNDER_PLACEHOLDER, "g"), "_");
}

// Matches *text* where text has no leading/trailing whitespace and no `*` inside.
// Allows either multi-char (with non-space boundaries) or single non-space char.
const BOLD_RE = /\*([^\s*][^*\n]*?[^\s*]|[^\s*])\*/g;

// Same for _italic_
const ITALIC_RE = /_([^\s_][^_\n]*?[^\s_]|[^\s_])_/g;

export function parseInlineMarkdown(text: string): string {
  const escaped = escapeHtml(text);
  const { text: protectedText } = protectEscapes(escaped);
  const withMarkdown = protectedText
    .replace(BOLD_RE, "<strong>$1</strong>")
    .replace(ITALIC_RE, "<em>$1</em>");
  return restoreEscapes(withMarkdown);
}

// Non-global versions for `.test()` (global regexes have stateful lastIndex).
const BOLD_TEST = /\*([^\s*][^*\n]*?[^\s*]|[^\s*])\*/;
const ITALIC_TEST = /_([^\s_][^_\n]*?[^\s_]|[^\s_])_/;

export function hasInlineMarkdown(text: string): boolean {
  const { text: protectedText, hasEscape } = protectEscapes(text);
  // Escaped literals still need to be rendered (backslashes stripped).
  if (hasEscape) return true;
  return BOLD_TEST.test(protectedText) || ITALIC_TEST.test(protectedText);
}
