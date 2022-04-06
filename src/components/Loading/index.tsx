import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

/**
 * 过度动画
 */
export const LoadingBox: React.FC<{ height?: number; width?: number }> = ({
  height = 20,
  width = 60,
}) => {
  return (
    <SkeletonTheme
      highlightColor={"rgba(255,255,255,.1)"}
      baseColor={"rgba(100,100,100,.1)"}
    >
      <ValueSkeletonPadding height={height} style={{ fontSize: 16 }}>
        <Skeleton height={height} width={width} />
      </ValueSkeletonPadding>
    </SkeletonTheme>
  );
};
const ValueSkeletonPadding = styled.div<{ height?: number; width?: number }>`
  height: ${(props) => `${props.height}px`};
  ${(props) =>
    props.width
      ? `width:${isNaN(props.width) ? props.width : `${props.width}px`}`
      : null}/* width:200px; */
`;

/**
 * 增加千位符
 * @param s
 * @param n
 * @returns
 */
export function fmoney(s: string, n: number) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

/**
 * 数字滚动
 * @param param0
 * @returns
 */
export const NumberRoll: React.FC<{
  item: {
    numerical: any;
    decimal: number;
    loadW: number;
    loadH: number;
  };
}> = ({ item: { numerical, decimal, loadW, loadH } }) => {
  // 动画
  const props = useSpring({ number: numerical ? Number(numerical) : 0 });

  if (numerical === null) {
    return <LoadingBox width={loadW} height={loadH} />;
  }

  // const field = numerical && String(numerical)?.split('.')[1] ? String(numerical)?.split('.')[1].length : 0
  return (
    <>
      <animated.span>
        {props.number.interpolate((x) => {
          // Number(x).toFixed(decimal)
          return fmoney(Number(x).toFixed(decimal), decimal);
        })}
      </animated.span>
    </>
  );
};
