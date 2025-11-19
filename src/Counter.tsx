import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { 
  Button, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper,
  TableContainer,
  Box
} from "@mui/material";

export default function Counter() {
  const events = useQuery(api.counter.getEvents);
  const logAction = useMutation(api.counter.logAction);

  const count = events ? events.reduce((acc, event) => {
    if (event.type === 'increment') return acc + 1;
    if (event.type === 'decrement') return acc - 1;
    return acc;
  }, 0) : 0;

  const handleIncrement = () => {
    logAction({ type: 'increment' });
  };

  const handleDecrement = () => {
    logAction({ type: 'decrement' });
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Counter: {count}
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 4 }}>
        <Button variant="contained" onClick={handleIncrement}>
          Increment (+)
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDecrement}>
          Decrement (-)
        </Button>
      </Box>

      <Typography variant="h5" gutterBottom>
        History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Action Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events?.map((event) => (
              <TableRow key={event._id}>
                <TableCell>
                  {new Date(event.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{event.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}