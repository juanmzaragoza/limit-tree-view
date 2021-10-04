import {Container, Grid, Typography} from "@mui/material";

const MaterialKpi = ({ title, content }) => {
  return <Container>
    <Grid container>
      {
        title && <Grid item xs={12} >
          <Typography variant={"h4"}>{title}</Typography>
        </Grid>
      }
      {content.map(({field, value}) => {
        const line = `${field}: ${value}`
        return (
          <Grid key={line} item xs={3}>
            <b> {`${field}:`} </b>
            <Typography variant={"subheader"} >{value}</Typography>
          </Grid>
        )
      })}
    </Grid>
  </Container>
}

export default MaterialKpi;