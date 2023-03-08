import React, { FC, forwardRef } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface IErrorMessage {
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const ErrorMessage: FC<IErrorMessage> = forwardRef(({ error }, ref: any) => {
  const handleError = () => {
    if (error) {
      if ("status" in error) {
        // you can access all properties of `FetchBaseQueryError` here
        switch (error.status) {
          case 404:
            return (
              <Stack direction="column" gap="10px" ref={ref}>
                <Typography component="h3" fontSize="3xl" fontWeight="bold">
                  Page Not Found
                </Typography>
                <Typography component="h5" fontSize="sm">
                  We could not find what you were looking for.
                </Typography>
              </Stack>
            );
          case "FETCH_ERROR":
            return (
              <Stack direction="column" gap="10px" ref={ref}>
                <Typography component="h3" fontSize="3xl" fontWeight="bold">
                  {error.status}
                </Typography>
                <Typography component="h5" fontSize="sm">
                  {error.error}
                </Typography>
              </Stack>
            );
          default:
            return (
              <Stack direction="column" gap="10px" ref={ref}>
                <Typography component="h3" fontSize="3xl" fontWeight="bold">
                  Oops! Something went wrong.
                </Typography>
              </Stack>
            );
        }
      } else {
        // you can access all properties of `SerializedError` here
        return (
          <motion.div initial={{ opacity: 0, y: "+100%" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "+100%" }}
                      transition={{ duration: 3 }}
          >
            <Alert sx={{ alignItems: "flex-start", width: "100%" }} severity="error" ref={ref}>
              <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                {error.message}
              </Typography>
            </Alert>
          </motion.div>
        );
      }
    }
  };

  return <Box component="div">{handleError()}</Box>;
});

// export const ErrorMessage: FC<IErrorMessage> = ({ error }) => {
//   const handleError = () => {
//     if (error) {
//       console.log(error);
//       if ("status" in error) {
//         // you can access all properties of `FetchBaseQueryError` here
//         switch (error.status) {
//           case 404:
//             return (
//               <Stack direction="column" gap="10px">
//                 <Typography component="h3" fontSize="3xl" fontWeight="bold">
//                   Page Not Found
//                 </Typography>
//                 <Typography component="h5" fontSize="sm">
//                   We could not find what you were looking for.
//                 </Typography>
//               </Stack>
//             );
//           case "FETCH_ERROR":
//             return (
//               <Stack direction="column" gap="10px">
//                 <Typography component="h3" fontSize="3xl" fontWeight="bold">
//                   {error.status}
//                 </Typography>
//                 <Typography component="h5" fontSize="sm">
//                   {error.error}
//                 </Typography>
//               </Stack>
//             );
//           default:
//             return (
//               <Stack direction="column" gap="10px">
//                 <Typography component="h3" fontSize="3xl" fontWeight="bold">
//                   Oops! Something went wrong.
//                 </Typography>
//               </Stack>
//             );
//         }
//       } else {
//         // you can access all properties of `SerializedError` here
//         return (
//           <Alert sx={{ alignItems: "flex-start", width: "100%" }} severity="error">
//             <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
//               {error.message}
//             </Typography>
//           </Alert>
//         );
//       }
//     }
//   };
//   return <Box component="div">{handleError()}</Box>;
// };
