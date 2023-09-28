Pushing to github pages:

- delete gh-pages branch
- rm -rf build
- yarn build
- git add build -f
- git commit -m "updating build"
- git subtree push --prefix build origin gh-pages
- git reset build
