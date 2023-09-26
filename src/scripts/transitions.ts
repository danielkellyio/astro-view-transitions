let lastPosition = null;
let lastPostSlug = null;

function getPath() {
  return window.location.pathname.replace(/\/$/, "");
}

const isBlogListingsPage = () => {
  return getPath().endsWith("/blog");
};

const getPostSlug = () => {
  const isBlogPost = getPath().includes("/blog/");
  if (isBlogPost) {
    return getPath().split("/").pop();
  }
  return null;
};

/**
 * Remember the scroll position of the blog posts index page
 */
document.addEventListener("astro:page-load", (e) => {
  document.addEventListener("scroll", () => {
    if (isBlogListingsPage()) lastPosition = window.scrollY;
  });
  lastPostSlug = getPostSlug();
});

/**
 * When navigating back to the home page, find the image we're transitioning
 * from and set its transition name.
 */
document.addEventListener("astro:after-swap", (e) => {
  console.log(isBlogListingsPage(), lastPosition);
  if (isBlogListingsPage()) {
    if (lastPosition) {
      window.scrollTo(0, lastPosition);
    } else if (lastPostSlug) {
      document.getElementById(lastPostSlug).scrollIntoView();
    }
  }
});
