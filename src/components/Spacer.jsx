import { useBreakPoint } from "@contexts/useMobile";
import { Box } from "@mui/material";
import { useMemo } from "react";

const Spacer = ({ size }) => {
  const bp = useBreakPoint();

  const formattedBreakPoints = useMemo(() => {
    if (typeof size === "number" || typeof size === "string") {
      return {
        xs: size,
        sm: size,
        md: size,
        lg: size,
        xl: size,
      };
    }

    let res = {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
    };
    const indexMap = {
      xs: 0,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    };
    let arr = [null, null, null, null, null];
    for (const key in size) {
      const idx = indexMap[key];
      arr[idx] = size[key];
    }
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      if (val === null) continue;

      for (let j = i + 1; j < arr.length; j++) {
        const nextVal = arr[j];
        if (nextVal || nextVal === 0) break;

        if (val && !nextVal) {
          arr[j] = val;
        }
      }
    }
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];
      if (val !== null) {
        res[Object.keys(indexMap)[i]] = val;
      }
    }
    return res;
  }, [size]);

  const height = useMemo(() => {
    return formattedBreakPoints?.[bp] || 0;
  }, [formattedBreakPoints, bp]);

  return (
    <Box
      className="spacer"
      sx={{
        height: height,
        width: "100%",
      }}
    />
  );
};

Spacer.defaultProps = {
  size: {
    xs: "4rem",
    md: "6rem",
    lg: "9rem",
  },
};

export default Spacer;
