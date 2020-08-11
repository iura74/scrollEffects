

function opacityParts(element, opacityFunct = x => x) {
  element.addEventListener("scroll", ({ target: { scrollTop, children, offsetTop, clientHeight } }) => {
    const visibleTop = scrollTop + offsetTop;
    const visibleBottom = clientHeight + visibleTop;
    [...children].forEach(element => {
      const { offsetTop: elOffsetTop, clientHeight: elClientHeight } = element;
      const elTop = elOffsetTop - visibleTop;
      const elBottom = elTop + elClientHeight; 
      const visibleTopPart = elTop < 0 && elBottom >=0 ? 
        (elClientHeight + elTop) / elClientHeight : 1;       
      const visibleBottomPart = elBottom > clientHeight && elTop <= clientHeight ? 
        (clientHeight - elTop) / elClientHeight : 1;
      const visiblePart = visibleTopPart < visibleBottomPart ? visibleTopPart : visibleBottomPart;
      element.style.opacity = opacityFunct(visiblePart);      
    });
  });
}


function hideParts(element) {
  element.addEventListener("scroll", ({ target: { scrollTop, children, offsetTop, clientHeight } }) => {
    const visibleTop = scrollTop + offsetTop;
    const visibleBottom = clientHeight + visibleTop;
    [...children].forEach(element => {
      element.style.opacity = (visibleTop > element.offsetTop) ||
        (visibleBottom < element.offsetTop + element.clientHeight) ? 0 : 1;
    });
  });
}