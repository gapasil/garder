import { useEffect } from 'react';

const useRippleEffect = (ref, styles) => {
  useEffect(() => {
    const target = ref.current;

    function createRippleEffect(e) {
      const x = e.pageX - target.offsetLeft,
        y = e.pageY - target.offsetTop,
        w = target.offsetWidth,
        ripple = document.createElement('span');

      ripple.classList.add(styles);
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.setProperty('--scale', w);

      target.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 400);
    }

    target.addEventListener('click', function (e) {
      createRippleEffect(e);
    });

    return () => {
      target.removeEventListener('click', function (e) {
        createRippleEffect(e);
      });
    };
  }, [ref, styles]);
};

export default useRippleEffect;
