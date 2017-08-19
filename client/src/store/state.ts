import { RouterState } from "react-router-redux";
import { AuthState } from "../auth/reducer";

export interface State {
    routing: RouterState;
    auth: AuthState;
}