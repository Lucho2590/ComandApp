import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Router from "./router";
import { Firestore, getFirestore } from "firebase/firestore";
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";
import { getAuth } from "firebase/auth";
import theme from "./theme/ligth";
import { firebaseConfig } from "./firebase/config";

function App() {
  // Inicializamos Firebase App en el componente principal
  const firebaseApp = useFirebaseApp();

  // Configuramos Firestore y Auth con la instancia de Firebase App
  const firestoreInstance = getFirestore(useFirebaseApp());
  const authInstance = getAuth(firebaseApp);

  return (
    <AuthProvider sdk={authInstance}>
      <FirestoreProvider sdk={firestoreInstance}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default App;
