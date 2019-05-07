import React, { cloneElement, Children, forwardRef, memo, useState, useRef, useMemo } from "react";
import { Tabs as ReachTabs, TabList as ReachTabList, TabPanels as ReachTabPanels } from "@reach/tabs";
import { classes } from "./index-styles";
import ClassNames from "classnames";
import { ReachTabWithColor } from "./tab";
import warning from "warning";
export { TabPanel } from "./panel";
import { findDOMNode } from "react-dom";
import useKeyPressEvent from "react-use/lib/useKeyPressEvent";

function getIsControlled(index) {
  const controlledIndex = index === undefined ? undefined : index;
  const controlledIndexReference = useRef(controlledIndex !== undefined);
  const isControlled = controlledIndexReference.current;
  warning(!(isControlled && controlledIndex == null), "Tabs is changing from controlled to uncontrolled. Tabs should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled Tabs for the lifetime of the component. Check the `index` prop being passed in.");
  warning(!(!isControlled && controlledIndex != null), "Tabs is changing from uncontrolled to controlled. Tabs should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled Tabs for the lifetime of the component. Check the `index` prop being passed in.");
  return isControlled
}

export const Tabs = memo(
  forwardRef((props, ref) => {
    const { children, listProps: listPropsBase, panelsProps, index, defaultIndex, onChange: onChangeBase, ...rest } = props;
    const isControlled = getIsControlled(index);
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex || 0);

    const onChange = useMemo(() => {
      return index => {
        if (onChangeBase) {
          onChangeBase(index);
        }
        if (!isControlled) {
          setSelectedIndex(index);
        }

      };
    }, [isControlled, onChangeBase, setSelectedIndex]);

    const currentIndex = isControlled ? index : selectedIndex;

    const childrenTabReferences = children.map(
      () => useRef(undefined)
    );
    const childrenReferences = children.map(
      () => useRef(undefined)
    );

    const focusChildTab = useMemo(() => index => {
      const childTabReference = childrenTabReferences[index];
      if (!childTabReference) {
        return false;
      }
      const node = findDOMNode(childTabReference.current);
      if (!node) {
        return false;
      }
      node.focus();
      return true;
    }, [children]);

    const focusChild = useMemo(() => index => {
      const childReference = childrenReferences[index];
      if (!childReference) {
        return false;
      }
      const node = findDOMNode(childReference.current);
      if (!node) {
        return false;
      }
      node.focus();
      return true;
    }, [children]);

    const [onKeyDown, onHome] = useMemo(() => {
      const childrenIndexes = Children.map(
        children,
        (child, index) => {
          return child.props.disabled === true ? null : index;
        },
        undefined
      );
      const enabledIndexes = childrenIndexes.filter((index) => index != null);
      const firstIndex = enabledIndexes[0],
        lastIndex = enabledIndexes[enabledIndexes.length - 1],
        currentEnabledIndex = enabledIndexes.indexOf(currentIndex);

      const onHomeNoFocus = (event) => {
        if (typeof firstIndex !== "number") {
          return;
        }
        if (event) {
          event.preventDefault();
        }
        onChange(firstIndex);
      };

      const onHome = (event) => {
        if (typeof firstIndex !== "number") {
          return;
        }
        onHomeNoFocus(event);
        focusChildTab(firstIndex);
      };

      const onEnd = () => {
        if (typeof lastIndex !== "number") {
          return;
        }
        event.preventDefault();
        focusChildTab(lastIndex);
        onChange(lastIndex);
      };

      const onKeyDown = event => {
        if (listPropsBase && listPropsBase.onKeyDown) {
          listPropsBase.onKeyDown(event);
        }

        function getNextIndex(direction) {
          if (currentEnabledIndex === -1) {
            return firstIndex;
          }
          const next = currentEnabledIndex + direction;
          if (next === -1) {
            return lastIndex;
          }
          if (next === enabledIndexes.length) {
            return firstIndex;
          }
          return enabledIndexes[next];
        }

        switch(event.key) {
          case "ArrowRight": {
            event.preventDefault();
            focusChild(currentIndex);
            break;
          }
          case "ArrowUp": {
            const nextIndex = getNextIndex(-1);
            if (nextIndex !== -1) {
              event.preventDefault();
              focusChildTab(nextIndex);
              onChange(nextIndex);
            }
            break;
          }
          case "ArrowDown": {
            const nextIndex = getNextIndex(1);
            if (nextIndex !== -1) {
              event.preventDefault();
              focusChildTab(nextIndex);
              onChange(nextIndex);
            }
            break;
          }
          case "ArrowLeft": return onHome(event);
          case "Home": return onHome(event);
          case "End": return onEnd(event);
        }

      };
      return [onKeyDown, onHomeNoFocus];
    }, [onChange, children, selectedIndex, currentIndex]);

    useKeyPressEvent("Home", onHome);

    const listProps = useMemo(() => {
      return {
        ...listPropsBase,
        onKeyDown
      }
    }, [onKeyDown, listPropsBase]);

    return (
      <ReachTabs
        {...rest}
        index={currentIndex}
        onChange={onChange}
        className={ClassNames(rest.className, classes.tabs)}
        ref={ref}
      >
        <ReachTabList className={classes.tabList} {...listProps}>
          {
            children.map(
              ({ props: { label, icon, color } }, index) => (
                <ReachTabWithColor key={index} color={color} icon={icon} label={label} ref={childrenTabReferences[index]} />
              )
            )
          }
        </ReachTabList>
        <ReachTabPanels className={classes.tabPanels} {...panelsProps}>
          {
            Children.map(children, (element, index) => cloneElement(
              element,
              {
                ref: childrenReferences[index]
              }
            ), undefined)
          }
        </ReachTabPanels>
      </ReachTabs>
    )
  })
);
