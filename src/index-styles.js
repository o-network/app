import jss from "jss";

const styles = {
  main: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
    background: "rgb(240, 240, 240)"
  }
};

export const { classes } = jss.createStyleSheet(styles).attach();
