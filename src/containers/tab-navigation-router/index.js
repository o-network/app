import { Tabs as TabsBase } from "../tab-navigation";
import React, { memo, forwardRef, useState, useMemo, useEffect } from "react";
import { Location } from "@reach/router";
import { pick } from "@reach/router/lib/utils";

export const withLocation = Component => {
  return forwardRef((props, ref) => {
    return (
      <Location>
        {
          locationProps => (
            <Component
              {...props}
              {...locationProps}
              ref={ref}
            />
          )
        }
      </Location>
    )
  })
};

export const Tabs = withLocation(
  memo(
    forwardRef(
      ({ children, location, navigate, ...rest }, ref) => {
        const childrenArray = useMemo(() => Array.isArray(children) ? children : [children], [children]);
        const locations = useMemo(() => childrenArray.map(({ props: { path }}) => path), [childrenArray]);
        const currentLocationIndex = useMemo(() =>  {
          const routes = locations.map(path => ({ path }));
          const match = pick(routes, location.pathname);
          if (!match) {
            return -1;
          }
          return routes.indexOf(match.route);
        }, [location.pathname, locations]);

        const [tabIndex, setTabIndex] = useState(currentLocationIndex === -1 ? 0 : currentLocationIndex);

        const onChangeTabIndex = useMemo(() => index => {
          setTabIndex(index);
          const location = locations[index];
          if (location && navigate) {
            navigate(location);
          }
        }, [setTabIndex]);

        useEffect(() => {
          if (currentLocationIndex === -1 || currentLocationIndex === tabIndex) {
            return;
          }
          onChangeTabIndex(currentLocationIndex);
        }, [currentLocationIndex, onChangeTabIndex]);

        return (
          <TabsBase
            ref={ref}
            {...rest}
            index={tabIndex}
            onChange={onChangeTabIndex}
          >
            {children}
          </TabsBase>
        )
      }
    )
  )
);
