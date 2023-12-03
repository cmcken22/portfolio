import { useEffect, useRef } from "react";

const useTraceUpdate = (props, title) => {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        // @ts-ignore
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log(title ?? "Changed props:", changedProps);
    }
    prev.current = props;
  });
};

export default useTraceUpdate;
