# Local review panel

The panel is a separate Node.js process bound to `127.0.0.1`. It is not a Next.js route and Vercel does not run it during the website build. It has no login because it is intended only for people running a local checkout. Do not expose port 3182 through a tunnel or change the bind address.

## Start it

1. Pull the latest branch and run `npm ci` if this is your first time.
2. Start the website with `npm run dev -- --hostname 127.0.0.1 --port 3181`.
3. In a second terminal, start the panel with `npm run review-panel`.
4. Open the [website](http://127.0.0.1:3181/) and [panel](http://127.0.0.1:3182/). Each collaborator runs their own copy; these localhost links are not shared public links.

## Edit and review

- **Page images:** Change the Home and About hero images, other business images, product category images, and partner logos. One saved business or partner image updates wherever it appears. Category images update the Home category cards and product pages.
- **Product cards:** Change the description and image of the 33 product cards on category pages.
- Enter a path to an existing image under `/stock/`, `/materials/`, `/partners/`, or `/review-images/`, or upload a PNG, JPEG, or WebP file up to 5 MB. Use images that the client has approved for publication.
- Press **Save changes**, then refresh the website page. The panel writes image choices to `lib/site-image-edits.json` and card changes to `app/products/review-edits.json`. Uploaded images are saved under `public/review-images/`.
- Review `git diff` and any new images. Commit and push those files to a branch for a pull request. A saved change is local until committed and pushed; it does not update a live site automatically.

The panel does not edit page layout, category names, partner names, or technical product specifications. Those still require code review. Running `npm run build` builds only the public Next.js website; the panel server is never exposed as a public route.
