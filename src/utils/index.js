import { Items } from "pages/Details/Experience";
import { ProjectList } from "pages/Details/Projects";

export const getScrollOrder = (name) => {
  let res = {};
  for (let i = 0; i < Items.length; i++) {
    res[`ListItem--${i}`] = i;
  }

  res[`ResumeLink`] = Items.length;
  res[`Toolkit`] = Items.length + 1;

  for (let i = 0; i < ProjectList.length; i++) {
    res[`ProjectListItem--${i}`] = Items.length + 2 + i;
  }

  res["Footer"] = Items.length + 2 + ProjectList.length;
  return res?.[name] ?? 0;
};
