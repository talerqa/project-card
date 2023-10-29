export const EditSvg = (props: { onClick: () => void }) => {
  return (<svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg"
               width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M12.6667 13.3333H3.33332C3.15651 13.3333 2.98694 13.4035 2.86192 13.5285C2.73689 13.6535 2.66666 13.8231 2.66666 13.9999C2.66666 14.1767 2.73689 14.3463 2.86192 14.4713C2.98694 14.5963 3.15651 14.6666 3.33332 14.6666H12.6667C12.8435 14.6666 13.013 14.5963 13.1381 14.4713C13.2631 14.3463 13.3333 14.1767 13.3333 13.9999C13.3333 13.8231 13.2631 13.6535 13.1381 13.5285C13.013 13.4035 12.8435 13.3333 12.6667 13.3333Z"
      fill="white"/>
    <path
      d="M3.33335 12H3.39335L6.17335 11.7467C6.47788 11.7163 6.7627 11.5821 6.98001 11.3667L12.98 5.36665C13.2129 5.12063 13.3387 4.79233 13.33 4.45368C13.3213 4.11503 13.1786 3.79366 12.9333 3.55999L11.1067 1.73332C10.8683 1.50938 10.5559 1.38089 10.2289 1.37229C9.90193 1.36368 9.5832 1.47557 9.33335 1.68665L3.33335 7.68665C3.11786 7.90396 2.98368 8.18879 2.95335 8.49332L2.66668 11.2733C2.6577 11.371 2.67037 11.4694 2.70379 11.5616C2.73721 11.6538 2.79055 11.7374 2.86001 11.8067C2.92231 11.8684 2.99619 11.9173 3.07741 11.9505C3.15864 11.9837 3.24561 12.0005 3.33335 12ZM10.18 2.66665L12 4.48665L10.6667 5.78665L8.88001 3.99999L10.18 2.66665ZM4.24668 8.60665L8.00001 4.87999L9.80001 6.67999L6.06668 10.4133L4.06668 10.6L4.24668 8.60665Z"
      fill="white"/>
  </svg>)
}