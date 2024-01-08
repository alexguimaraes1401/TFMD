import { createContext, useState } from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Lista from "../pages/Lista";
import FootBar from "./FootBar";
import { View } from "react-native";

interface IRoute {
  route: "Home" | "Login" | "Lista";
  setRoute: any;
  token: string;
  setToken: any;
}

const Navigate = createContext<IRoute>({} as any);

export default function Route() {
  const [route, setRoute] = useState<IRoute["route"]>("Home");
  const [token, setToken] = useState<string>("");

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Navigate.Provider value={{ route, setRoute, token, setToken }}>
        {route === "Home" && <Home></Home>}
        {route === "Login" && <Login></Login>}
        {route === "Lista" && <Lista></Lista>}
        <FootBar />
      </Navigate.Provider>
    </View>
  );
}

export { Navigate };
