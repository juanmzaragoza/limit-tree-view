import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

const DetailedHeader = ({ header, summary, body, endInformation }) => {
  return <Card sx={{ display: 'flex' }}>
    <CardHeader
      title={header.title}
      subheader={header.subheader}
      titleTypographyProps={{ align: 'center' }}
      action={header.icon? header.icon:<StarIcon />}
      subheaderTypographyProps={{
        align: 'center',
      }}
      sx={{
        width: 300,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[700],
      }}
    />
    <CardContent>
      <Container>
        <Grid container spacing={1} >
          <Grid item xs={4} >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'baseline',
                mb: 2,
              }}
            >
              <Typography component="h2" variant="h3" color="text.primary">
                {summary.primary}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {summary.secondary}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} >
            <Grid container spacing={1}>
              {body.map(({field, value}) => {
                const line = `${field}: ${value}`
                return (
                  <Grid key={line} item xs={6}>
                    <Typography
                      component="div"
                      variant="caption"
                      align="left"
                    >
                      {line}
                    </Typography>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'baseline',
                mb: 2,
              }}
            >
              <Typography
                variant="h2"
                align="center"
              >
                {endInformation}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </CardContent>
  </Card>
}

export default DetailedHeader;