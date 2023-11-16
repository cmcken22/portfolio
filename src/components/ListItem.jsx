import { Box, Grid, Typography } from "@mui/material";

export const Items = [
  {
    company: "LockDocs Inc.",
    link: "",
    position: "Senior Software Engineer",
    startDate: "FEB 2023",
    endDate: "PRESENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
  {
    company: "Opendoor",
    link: "",
    position: "Software Engineer",
    startDate: "AUG 2023",
    endDate: "NOV 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
  {
    company: "EllisDon",
    link: "",
    position: "Software Engineer",
    startDate: "JUL 2017",
    endDate: "AUG 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
  {
    company: "EllisDon",
    link: "",
    position: "Software Engineer",
    startDate: "JUL 2017",
    endDate: "AUG 2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
  },
];

const ListItem = ({ item }) => {
  const { startDate, endDate, position, company, description } = item;
  return (
    <li
      style={{
        // background: "red",
        color: "black",
        transformOrigin: "-20px 50%",
      }}
    >
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="p" color="black" textAlign="left">
            {startDate} - {endDate}
          </Typography>
        </Grid>
        <Grid item xs={8} pl={2}>
          <Typography variant="p" color="black" textAlign="left">
            {company}
          </Typography>
          <Typography variant="p" color="black" textAlign="left">
            {position}
          </Typography>
          <Typography variant="p" color="black" textAlign="left">
            {description}
          </Typography>
        </Grid>
      </Grid>
    </li>
  );
};

export default ListItem;
