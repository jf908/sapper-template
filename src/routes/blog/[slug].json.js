import { readFile } from 'fs';
import { render } from '../../lib/markdown';
import fm from 'front-matter';

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params;

  readFile(`src/posts/${slug}.md`, 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({
          message: `Not found`,
        })
      );
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });

      const { attributes, body } = fm(data);
      const result = render(body);
      res.end(
        JSON.stringify({
          ...attributes,
          slug,
          html: result,
        })
      );
    }
  });
}
