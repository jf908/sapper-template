import MarkdownIt from 'markdown-it';
const md = MarkdownIt({ linkify: true, typographer: true });

export function render(body: string) {
  return md.render(body);
}
