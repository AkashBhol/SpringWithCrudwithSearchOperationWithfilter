import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePerson from "./CreatePerson";
import Display from "./Display";
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreatePerson />}></Route>
                <Route path="/dispaly" element={<Display/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default AppRouter;