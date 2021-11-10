import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Account from "components/Account";
import Blockie from "components/Blockie";
import {Layout } from "antd";
import "antd/dist/antd.css";
import Main from "components/Main";
import "./style.css";
const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "100px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Router>
      <Layout style={{ height: "100vh", background: "#f0f2f500" }}>
        <Header style={styles.header}>
          <Logo />
          <div style={styles.headerRight}>
            <Account />
            <Blockie currentWallet size="7" scale="5" />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route path="/main">
              <Main />
            </Route>
            <Route path="/nonauthenticated">
              <h1>Please login using the "Authenticate" button</h1>
            </Route>
          </Switch>
          {isAuthenticated ? <Redirect to="/main" /> : <Redirect to="/nonauthenticated" />}
        </div>
      </Layout>
    </Router>
  );
};

export const Logo = () => (
  <h3>Decentradit</h3>
);

export default App;
