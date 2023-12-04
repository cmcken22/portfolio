import useMobile from "contexts/useMobile";
import { Tooltip, Typography } from "@mui/material";
import { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = ({ className, title, ...rest }) => {
  const { mobile } = useMobile();

  return (
    <Tooltip
      {...rest}
      title={
        mobile ? (
          ""
        ) : (
          <Typography
            variant="body2"
            color="primary.light"
            sx={{
              width: "fit-content !important",
            }}
          >
            {title}
          </Typography>
        )
      }
      arrow
      classes={{ popper: className }}
      componentsProps={{
        popper: {
          sx: {
            [`& .${tooltipClasses.arrow}`]: {
              color: (theme) => theme.palette.common.black,
            },
            [`& .${tooltipClasses.tooltip}`]: {
              backgroundColor: (theme) => theme.palette.common.black,
            },
          },
        },
      }}
    />
  );
};

export default CustomTooltip;
