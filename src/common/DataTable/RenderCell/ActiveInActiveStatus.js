import React from "react";
import { Box } from "@mui/material";

const STATUS_COLOR = {
  expired: "#B71C19",
  active: "#19806A",
  inactive: "#B76D00",
};

const BACKGROUND_COLOR = {
  expired: "#F9DED9",
  active: "#DBEBE4",
  inactive: "#F8EAD8",
};

function ActiveInActiveStatus({ value }) {
  return (
    <>
      {value ? (
        <Box
          align="left"
          sx={{
            backgroundColor: BACKGROUND_COLOR.active,
            color: STATUS_COLOR.active,
            padding: 1,
            width: "110px",
            textAlign: "center",
            fontWeight: "500",
            borderRadius: "10px",
          }}
        >
          Active
        </Box>
      ) : (
        <Box
          align="left"
          sx={{
            backgroundColor: BACKGROUND_COLOR.expired,
            color: STATUS_COLOR.expired,
            padding: 1,
            width: "110px",
            textAlign: "center",
            fontWeight: "500",
            borderRadius: "10px",
          }}
        >
          Inactive
        </Box>
      )}
    </>
  );
}

export default ActiveInActiveStatus;
