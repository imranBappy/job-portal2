import React from "react";

// ----- Material UI Provider -----
import { Box } from "@mui/material";

// ----- Other Component -----
import moment from "moment";

const RenderDate = ({ value }) => {
  return <Box>{moment(value).format("DD/MM/YYYY h:mm A")}</Box>;
};

export default RenderDate;
