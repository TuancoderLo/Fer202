import { Grid, Box, Fade } from "@mui/material";
import OrchidCard from "./OrchidCard";

const OrchidsList = ({ orchids, onShowDetail }) => {
  return (
    <Box>
      <Grid container spacing={3}>
        {orchids.map((orchid, index) => (
          <Fade
            in={true}
            key={orchid.id}
            timeout={500 + index * 100} // Staggered animation
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <OrchidCard orchid={orchid} onShowDetail={onShowDetail} />
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Box>
  );
};

export default OrchidsList;
