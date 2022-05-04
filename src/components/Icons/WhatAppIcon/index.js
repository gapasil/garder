export const WhatAppIcon = ({
  fillOut = 'black',
  fillInner = 'black',
  ...props
}) => {
  return (
    <svg
      width="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16ZM26.0414 15.3877C26.0393 20.6322 21.773 24.8995 16.5274 24.9017H16.5234C14.9311 24.9011 13.3665 24.5016 11.9769 23.7436L6.93332 25.0667L8.28307 20.1366C7.45048 18.6937 7.01238 17.057 7.01309 15.3802C7.01518 10.1345 11.2832 5.86667 16.5273 5.86667C19.0724 5.86776 21.4612 6.85858 23.2575 8.65694C25.0537 10.4552 26.0424 12.8456 26.0414 15.3877Z"
        fill={fillOut}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.21783 22.8064L12.2108 22.0213L12.4995 22.1926C13.7136 22.9131 15.1054 23.2944 16.5244 23.2949H16.5276C20.8861 23.2949 24.4335 19.7474 24.4352 15.3871C24.436 13.2741 23.6143 11.2874 22.1213 9.79267C20.6283 8.29794 18.6428 7.47437 16.5307 7.47363C12.1688 7.47363 8.62136 11.0207 8.61963 15.3807C8.61902 16.8749 9.03709 18.3301 9.82867 19.5891L10.0167 19.8883L9.21783 22.8064ZM20.9951 17.436C21.1609 17.5162 21.2729 17.5703 21.3207 17.6501C21.3801 17.7492 21.3801 18.2252 21.1821 18.7806C20.9839 19.3359 20.0342 19.8427 19.5774 19.9109C19.1679 19.9721 18.6496 19.9977 18.0801 19.8167C17.7349 19.7071 17.2921 19.5609 16.7249 19.3159C14.4963 18.3536 12.9902 16.1936 12.7055 15.7854C12.6856 15.7568 12.6717 15.7368 12.6639 15.7264L12.662 15.7238C12.5362 15.556 11.6932 14.4312 11.6932 13.2672C11.6932 12.1722 12.2311 11.5982 12.4787 11.334C12.4956 11.3159 12.5112 11.2993 12.5252 11.284C12.7431 11.046 13.0007 10.9865 13.1591 10.9865C13.3176 10.9865 13.4763 10.988 13.6148 10.9949C13.6318 10.9958 13.6496 10.9957 13.668 10.9956C13.8065 10.9948 13.9792 10.9938 14.1496 11.403C14.2152 11.5605 14.3111 11.794 14.4122 12.0403C14.6168 12.5383 14.8428 13.0885 14.8826 13.1681C14.942 13.2871 14.9816 13.4259 14.9024 13.5846C14.8905 13.6084 14.8795 13.6309 14.869 13.6524C14.8095 13.7739 14.7657 13.8632 14.6647 13.9812C14.625 14.0276 14.5839 14.0776 14.5429 14.1276C14.4611 14.2272 14.3793 14.3267 14.3081 14.3977C14.1891 14.5162 14.0652 14.6448 14.2039 14.8828C14.3425 15.1208 14.8196 15.8993 15.5263 16.5297C16.286 17.2073 16.9463 17.4937 17.281 17.6388C17.3463 17.6672 17.3992 17.6901 17.4381 17.7096C17.6757 17.8286 17.8144 17.8087 17.9531 17.6501C18.0918 17.4914 18.5474 16.9559 18.7058 16.718C18.8643 16.4801 19.0228 16.5197 19.2407 16.599C19.4586 16.6784 20.6274 17.2534 20.8651 17.3724C20.9115 17.3956 20.9549 17.4166 20.9951 17.436Z"
        fill={fillInner}
      />
    </svg>
  );
};