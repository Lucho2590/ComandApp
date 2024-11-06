import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import BasicLayout from "../../layout/basicLayout";
import { doc, Firestore, getFirestore } from "firebase/firestore";
// import { useEffect, useMemo, useState } from "react";

export default function Menu() {
  // const [userDara, setUserData] = useState();
  const { data: user } = useUser();
  const firestore = useFirestore();

  // console.log(userId);

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();

  let userRef = doc(firestore, "users", user.uid);
  let { data: userData } = useFirestoreDocData(userRef);

  console.log(userData);

  return (
    <BasicLayout>
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        Menu
        <br />
        Agregar menu
      </Box>
    </BasicLayout>
  );
}
