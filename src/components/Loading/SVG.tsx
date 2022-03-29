import React from "react";

/**
 * SVG 动画 转圈
 * @returns 
 */
export const SVGloading1: React.FC = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="30px"
        height="30px"
        viewBox="0 0 40 40"
        enable-background="new 0 0 40 40"
        xmlSpace="preserve"
      >
        <path
          opacity="0.2"
          fill="#FFF"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
  s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
  c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
        ></path>
        <path
          fill="#fff"
          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
  C22.32,8.481,24.301,9.057,26.013,10.047z"
          transform="rotate(42.1171 20 20)"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.5s"
            repeatCount="indefinite"
          ></animateTransform>
        </path>
      </svg>
    </div>
  );
};
export const SVGloading2: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24px"
      height="30px"
      viewBox="0 0 24 30"
      enable-background="new  0 0 50 50"
      xmlSpace="preserve"
    >
      <rect
        x="0"
        y="0"
        width="4"
        height="10"
        fill="#fff"
        transform="translate(0 9.4336)"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
      <rect
        x="10"
        y="0"
        width="4"
        height="10"
        fill="#fff"
        transform="translate(0 17.2331)"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
      <rect
        x="20"
        y="0"
        width="4"
        height="10"
        fill="#fff"
        transform="translate(0 3.89973)"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
    </svg>
  );
};

export const SVGloading3: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24px"
      height="30px"
      viewBox="0 0 24 30"
      enable-background="new 0 0 50 50"
      xmlSpace="preserve"
    >
      <rect x="0" y="9.22656" width="4" height="12.5469" fill="#fff">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="10" y="5.22656" width="4" height="20.5469" fill="#fff">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect x="20" y="8.77344" width="4" height="13.4531" fill="#fff">
        <animate
          attributeName="height"
          attributeType="XML"
          values="5;21;5"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="13; 5; 13"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </svg>
  );
};
export const SVGloading4: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="30px"
      height="60px"
      viewBox="0 0 24 30"
      enable-background="new 0 0 50 50"
      xmlSpace="preserve"
    >
      <rect
        x="0"
        y="7.6416"
        width="4"
        height="14.7168"
        fill="#fff"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect
        x="8"
        y="5.1416"
        width="4"
        height="19.7168"
        fill="#fff"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.15s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
      <rect
        x="16"
        y="7.3584"
        width="4"
        height="15.2832"
        fill="#fff"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          attributeType="XML"
          values="0.2; 1; .2"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="height"
          attributeType="XML"
          values="10; 20; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
        <animate
          attributeName="y"
          attributeType="XML"
          values="10; 5; 10"
          begin="0.3s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animate>
      </rect>
    </svg>
  );
};
