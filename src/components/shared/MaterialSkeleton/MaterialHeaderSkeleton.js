import Box from "@mui/material/Box";
import {Skeleton} from "@mui/material";
import {Avatar, Typography} from "@material-ui/core";

const MaterialHeaderSkeleton = () => {
  return <Box sx={{ width: '100%' }}>
    <Box sx={{ margin: 1 }}>
      <Skeleton variant="circular">
        <Avatar />
      </Skeleton>
      <Box sx={{ width: '100%' }}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
      </Box>
    </Box>
  </Box>
}

export default MaterialHeaderSkeleton;