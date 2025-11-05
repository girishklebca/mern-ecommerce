import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const Demo = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="h-[100vh] flex justify-center items-center">
      {count === 0 && (
        <Button variant="contained" onClick={() => setCount(1)}>
          Add to cart
        </Button>
      )}

      {count > 0 && (
        <Box>
          <Button variant="contained" onClick={() => setCount(count - 1)}>
            -
          </Button>
          <Typography>{count} </Typography>
          <Button variant="contained" onClick={() => setCount(count + 1)}>
            +
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Demo;
