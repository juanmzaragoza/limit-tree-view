import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";

const MaterialSkeleton = ({ lines = 5 }) => {
  return (
    <Box sx={{ width: "100%" }}>
      {[...Array(lines)].map((line, key) => (
        <Skeleton key={key} animation="wave" />
      ))}
    </Box>
  );
};

export default MaterialSkeleton;
