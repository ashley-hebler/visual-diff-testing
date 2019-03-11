# Visual diff testing
> Visual regression testing with Jest, Puppeteer, and Pixelmatch

Site: http://ashley-viz.surge.sh/

### Getting started

```
npm install

```

```
npm run test

```

### Break the test

1. Change `_sass/main.scss`.
```scss
$primary: $blue;
```
to 
```scss
$primary: $pink;
```

2. `npm run css` to compile

3. `npm run serve` just to preview the change

4. `npm run test` to fail test (takes a while)

5. `npm run serve-diff` to see diff image and understand what changed, visually.


### Todos
* [ ] *Make test fail better and proceed to next command*
* [ ] *git ignore screenshots*
* [ ] *Figure out a way of accepting new*