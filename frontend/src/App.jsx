import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MainLayout from "./layout/MainLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const { token, logout, isLoading } = useContext(AuthContext);

  // ✅ THIS WAS MISSING
  const [refresh, setRefresh] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  

  // NOT LOGGED IN
  if (!token) {
    return showSignup ? (
      <Signup goToLogin={() => setShowSignup(false)} />
    ) : (
      <Login goToSignup={() => setShowSignup(true)} />
    );
  }

  // LOGGED IN UI
  return (
    <MainLayout>
      

      <ExpenseForm onExpenseAdded={() => setRefresh(!refresh)} />
      <ExpenseList refresh={refresh} />
    </MainLayout>
  );
}

export default App;
