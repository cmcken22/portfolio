Pushing to github pages:

- delete gh-pages branch
- rm -rf dist
- yarn build
- git add dist -f
- git commit -m "updating dist"
- git subtree push --prefix dist origin gh-pages
