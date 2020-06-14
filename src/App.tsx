import React from "react";
import { Layout } from "antd";

import { Display } from "./components/display";
import { Keyboard } from "./components/keyboard";
import "./index.css";

function App() {
  return (
    <Layout>
      <Layout.Content style={{width:'270px'}}>
        <Display />
        <Keyboard />
      </Layout.Content>
    </Layout>
  );
}

export default App;
