import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography
} from "@mui/material";

const DetailedHeader = ({ header, body }) => {
  return <Card sx={{ display: 'flex' }}>
    <CardHeader
      title={header.title}
      subheader={header.subheader}
      titleTypographyProps={{ align: 'center' }}
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
      className="tituloDetailHeader"
    />
    <CardContent>
      <Container>
        <Grid container spacing={1} >
          {body.map(({field, value}) => {
            const line = `${field}: ${value}`
            return (
              <Grid key={line} item xs={6}>
                <Typography
                  component="div"
                  variant="caption"
                  align="left"
                  className="bodyLabel"
                  
                >
                  {line}
                </Typography>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </CardContent>
  </Card>
}

export default DetailedHeader;