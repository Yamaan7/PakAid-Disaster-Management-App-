import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "@/contexts/auth-context";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Components
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Pages
import Home from "@/pages/home";
import BlogDetail from "@/pages/blog-detail";
import DisasterMap from "@/pages/disaster-map";
import AdminPanel from "@/pages/admin-panel";
import RescueDashboard from "@/pages/rescue-dashboard";
import About from "@/pages/about";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import NotFound from "@/pages/not-found";
import { Toaster } from "./components/ui/toaster";
import RescueTeamSignup from "./pages/rescue-team-signup";
import userdashboard from "./pages/user-dashboard";

const paypalOptions = {
  clientId: "AU8QGwfVyxYf8Qe02TYh1fM6L81BTFZ2RVi88ycJ-VooZQgoYfQ5eTx22Ik3kcg9xD6h5vUYv8MIlj4A",
  currency: "USD",
  intent: "capture",
  // You can add more options like 'components' if needed
  // components: "buttons,marks,funding-eligibility",
};




function Router() {
  return (
    <PayPalScriptProvider options={paypalOptions} deferLoading={false}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/blog/:id" component={BlogDetail} />
            <Route path="/map" component={DisasterMap} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/rescue-dashboard" component={RescueDashboard} />
            <Route path="/dashboard" component={userdashboard} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/rescue-team-signup" component={RescueTeamSignup} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
}

function App() {
  return (
    <PayPalScriptProvider options={paypalOptions} deferLoading={true}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </PayPalScriptProvider>
  );
}

export default App;