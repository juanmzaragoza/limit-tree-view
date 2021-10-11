import { Skeleton } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const MaterialCardAvatarContentSkeleton = ({ lines = 2 }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ margin: 1 }}>
        <Skeleton variant="circular">
          <Avatar />
        </Skeleton>
      </Box>
      <Box sx={{ width: '100%' }}>
        {[...Array(lines)].map((line, index) => {
          return <Skeleton key={index} width="100%">
            <Typography>.</Typography>
          </Skeleton>
        })}
      </Box>
    </Box>
  )
}

export default MaterialCardAvatarContentSkeleton;