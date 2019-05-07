import jss from "jss";
import color from "color";
import withStyles from "react-jss";

const defaultTabColor = "#4F5A65";

function getTabPanelStyles(base) {
  return {
    boxShadow: props => `0 0 1rem -1px ${getColor(props.color, base)}`,
    "&:focus, &:focus-within": {
      boxShadow: props => `0 0 1.5em -1px ${getColor(props.color, base).rotate(15)}`
    }
  }
}

function tabPanelColor(base) {
  return {
    tabPanel: getTabPanelStyles(base)
  };
}

export function withTabPanelColor(component) {
  return withStyles(
    tabPanelColor(undefined),
    { injectTheme: false }
  )(component)
}

function getColor(provided, base) {
  return color(provided || base || defaultTabColor);
}

function getTabStyles(base) {
  return {
    background: props => getColor(props.color, base).toString(),
    boxShadow: props => `0 0 2px 1px ${getColor(props.color, base)}`,
    "&:hover": {
      background: props => getColor(props.color, base).toString(),
      boxShadow: props => `0 0 0.25em 1px ${getColor(props.color, base).rotate(5)}`,
    },
    "&:focus": {
      boxShadow: props => `0 0 0.5em 1px ${getColor(props.color, base).rotate(5)}`,
    },
    "&:hover $tabLabel, &:focus $tabLabel": {
      boxShadow: props => `0 0 0.25em 1px ${getColor(props.color, base)}`
    },
    "&[aria-selected=true]:not(:hover)": {
      boxShadow: props => `0 0 0.25em 1px ${getColor(props.color, base)}`
    }
  };
}

function tabColor(baseColor = undefined) {
  const base = color(baseColor || defaultTabColor);
  return {
    tab: getTabStyles(base),
    tabIcon: {

    },
    tabLabel: {
      background: props => getColor(props.color, base).toString()
    }
  }
}

export function withTabColor(component) {
  return withStyles(
    tabColor(undefined),
    { injectTheme: false }
  )(component)
}

const styles = {
  main: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    background: "rgb(240, 240, 240)"
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%"
  },
  tabList: {
    position: "sticky",
    top: "1rem",
    boxSizing: "border-box",
    padding: "0.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  tab: {
    extend: [getTabStyles(defaultTabColor)],
    cursor: "pointer",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "7px 3px",
    appearance: "none",
    color: "white",
    border: "3px solid white",
    borderRadius: "1.2em",
    padding: "0.25em",
    // https://a11yproject.com/posts/large-touch-targets/
    height: 44,
    minWidth: 44,
    lineHeight: "1em",
    left: "0",
    fontSize: "1.2em",
    zIndex: 2,
    position: "relative",
    "@media(prefers-reduced-motion: no-preference)": {
      transition: "box-shadow .4s, height .4s, margin .4s, border-radius .2s"
    },
    "&::before": {
      color: "transparent",
      content: "'►'",
      display: "inline-block",
      position: "relative",
      height: 0,
      width: 0,
      overflow: "hidden"
    },
    "&:focus": {
      outline: "none"
    },
    "&:hover, &:focus": {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRightSize: 1.5,
    },
    "&:hover $tabLabel, &:focus $tabLabel": {
      width: "auto",
      outline: "none",
      clipPath: "inset(-5px -5px -5px 1.3px)",
      height: 44,
      minWidth: 44,
      lineHeight: "1em",
      border: "3px solid white",
      borderLeftSize: 1.5,
      borderRadius: "1.2em",
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      top: -3,
      left: "100%",
      overflow: "visible",
      boxSizing: "border-box",
      padding: "0.25em",
      paddingRight: "0.5em",
      opacity: 1,
    }
  },
  tabIcon: {
    display: "block"
  },
  tabLabel: {
    borderRadius: "1.2em",
    height: 1,
    width: 1,
    position: "absolute",
    overflow: "hidden",
    top: -10,
    zIndex: 10,
    whiteSpace: "nowrap",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.2,
    "@media(prefers-reduced-motion: no-preference)": {
      transition: "border-radius .2s, opacity .2s",
    }
  },
  tabPanels: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    flex: 1,
    padding: "1rem"
  },
  tabPanel: {
    extend: [getTabPanelStyles(defaultTabColor)],
    background: "rgb(245, 245, 245)",
    flex: 1,
    padding: "0.5rem 1rem",
    minHeight: "100%",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: 4,
    "@media(prefers-reduced-motion: no-preference)": {
      transition: "box-shadow .4s, border-radius .4s"
    },
    "&:focus, &:focus-within": {
      outline: "none"
    }
  }
};

export const { classes } = jss.createStyleSheet(styles).attach();
