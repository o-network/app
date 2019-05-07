import { classes, withTabPanelColor } from "./index-styles";
import { TabPanel as ReachTabPanel } from "@reach/tabs";
import ClassNames from "classnames";
import React, { forwardRef, memo } from "react";
import PropTypes from "prop-types";

export const TabPanel = memo(
  withTabPanelColor(
    forwardRef(({ classes: styledClasses, icon: unsued1, label: unused2, color: unused3, className, ...props }, ref) => {
      return (
        <ReachTabPanel
          ref={ref}
          className={ClassNames(className, classes.tabPanel, styledClasses.tabPanel)}
          {...props}
        />
      )
    })
  )
);

TabPanel.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string
};
