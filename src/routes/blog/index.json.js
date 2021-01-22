import { readFile, readdir } from 'fs';
import fm from 'front-matter';

const blogPosts = [];

readdir('src/posts', async (err, data) => {
  if (err) return;

  await Promise.all(
    data.map(
      (slug) =>
        new Promise((res, rej) => {
          readFile(`src/posts/${slug}`, 'utf-8', (err, data) => {
            if (err) {
              rej(err);
              return;
            }
            const { attributes } = fm(data);
            blogPosts.push({
              ...attributes,
              slug: slug.substring(0, slug.length - 3),
            });
            res();
          });
        })
    )
  );
  blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
});

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(blogPosts));
}
