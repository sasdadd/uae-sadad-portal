import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import Home from "./pages/Home";
import UserData from "./pages/UserData";
import SelectBank from "./pages/SelectBank";
import CardData from "./pages/CardData";
import VerifyOtp from "./pages/VerifyOtp";
import ConfirmPayment from "./pages/ConfirmPayment";

const base = "/uae-sadad-portal";

function Router() {
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/user-data" component={UserData} />
        <Route path="/select-bank" component={SelectBank} />
        <Route path="/card-data" component={CardData} />
        <Route path="/verify-otp" component={VerifyOtp} />
        <Route path="/confirm-payment" component={ConfirmPayment} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <Router />
  );
}

export default App;
