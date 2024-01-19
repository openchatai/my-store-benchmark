import { Route, Switch } from "wouter";
// import RecentOrders from "./RecentOrders";
import HomePage from "./Home";
import CategoriesPage from "./CategoriesPage";

export default function App() {
    return (
        <Switch>
            {/* <Route path="/recent" component={RecentOrders} /> */}
            <Route path="/" component={HomePage} />
            <Route path="/categories" component={CategoriesPage} />
        </Switch>
    )
}
