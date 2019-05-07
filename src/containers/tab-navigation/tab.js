import { classes, withTabColor } from "./index-styles";
import { Tab as ReachTab } from "@reach/tabs";
import ClassNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";

export const ReachTabWithColor = memo(
  withTabColor(({ classes: styledClasses, className, label, icon, ...rest }) => (
    <ReachTab
      className={ClassNames(className, classes.tab, styledClasses.tab)}
      {...rest}
      aria-label={label}
    >
      <span className={ClassNames(classes.tabIcon, styledClasses.tabIcon)}>
        <FontAwesomeIcon icon={icon} />
      </span>
        <span className={ClassNames(classes.tabLabel, styledClasses.tabLabel)}>
        {label}
      </span>
    </ReachTab>
  ))
);
