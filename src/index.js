import "./index.css";
import "./jss-init";
import React from "react";
import { render } from "react-dom";
import { classes } from "./index-styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel, faHome, faUserFriends, faEnvelope, faMusic, faFilm } from "@fortawesome/pro-solid-svg-icons";
import { TabPanel } from "./containers/tab-navigation/index";
import { Tabs as TabNavigation } from "./containers/tab-navigation-router";

library.add(faStroopwafel, faHome, faUserFriends, faEnvelope, faMusic, faFilm);

function App() {
  return (
    <main className={classes.main}>
      <TabNavigation>
        <TabPanel label="Home" icon="home" color="#1E824C" path="/">
          This is where I am going to do my thing 1
        </TabPanel>
        <TabPanel label="Music" icon="music" color="#D43900" path="/music">
          This is where I am going to do my thing 2
        </TabPanel>
        <TabPanel label="Friends" icon="user-friends" color="#2A7AB0" path="/friends">
          This is where I am going to do my thing 3
        </TabPanel>
        <TabPanel label="Messaging" icon="envelope" color="#DC143C" path="/messaging">
          This is where I am going to do my thing 4
        </TabPanel>
        <TabPanel label="Video" icon="film" color="#4F5A65" path="/video">
          This is where I am going to do my thing 5
        </TabPanel>
      </TabNavigation>
    </main>
  )
}

render(<App />, document.querySelector('#app'));
