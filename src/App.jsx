import * as React from "react";
import PsychologyIcon from "@mui/icons-material/Psychology"; // MUI Brain icon equivalent
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Stack,
} from "@mui/material";

// Create a theme for the application
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff6f61",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

// Main application component
function App() {
  // State for input data and predictions
  const [features, setFeatures] = React.useState([5, 3, 1, 0.2]);
  const [prediction, setPrediction] = React.useState(null);
  const [algorithm, setAlgorithm] = React.useState("knn");

  // Simple ML algorithms
  const algorithms = {
    // K-Nearest Neighbors classifier
    knn: (features) => {
      // Simplified iris dataset with just a few samples
      const dataset = [
        { features: [5.1, 3.5, 1.4, 0.2], label: "setosa" },
        { features: [7.0, 3.2, 4.7, 1.4], label: "versicolor" },
        { features: [6.3, 3.3, 6.0, 2.5], label: "virginica" },
      ];

      // Calculate Euclidean distance between two points
      const distance = (a, b) => {
        return Math.sqrt(
          a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
        );
      };

      // Find nearest neighbor
      let minDist = Infinity;
      let prediction = null;

      dataset.forEach((sample) => {
        const dist = distance(sample.features, features);
        if (dist < minDist) {
          minDist = dist;
          prediction = sample.label;
        }
      });

      return prediction;
    },

    // Simple decision tree
    decisionTree: (features) => {
      // Simplified decision tree for iris classification
      if (features[2] <= 2.5) {
        return "setosa";
      } else if (features[2] <= 4.8) {
        return "versicolor";
      } else {
        return "virginica";
      }
    },
  };

  // Handle prediction when button is clicked
  const handlePredict = () => {
    const result = algorithms[algorithm](features);
    setPrediction(result);
  };

  // Update feature values when inputs change
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = parseFloat(value) || 0;
    setFeatures(newFeatures);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        {/* Header section */}
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <PsychologyIcon color="primary" fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            ML Playground
          </Typography>
        </Box>

        <Card elevation={2} sx={{ p: 3 }}>
          <CardContent>
            {/* Algorithm selection */}
            <Box mb={3}>
              <FormControl fullWidth>
                <InputLabel id="algorithm-label">Algorithm</InputLabel>
                <Select
                  labelId="algorithm-label"
                  value={algorithm}
                  label="Algorithm"
                  onChange={(e) => setAlgorithm(e.target.value)}
                >
                  <MenuItem value="knn">K-Nearest Neighbors</MenuItem>
                  <MenuItem value="decisionTree">Decision Tree</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Feature inputs */}
            <Box mb={3}>
              <Typography variant="subtitle1" fontWeight="medium" mb={2}>
                Input Features
              </Typography>
              <Stack spacing={2}>
                {features.map((value, index) => (
                  <TextField
                    key={index}
                    label={`Feature ${index + 1}`}
                    type="number"
                    value={value}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    fullWidth
                    size="small"
                  />
                ))}
              </Stack>
            </Box>

            {/* Prediction button and result */}
            <Stack spacing={2}>
              <Button
                variant="contained"
                onClick={handlePredict}
                startIcon={<PsychologyIcon />}
                fullWidth
              >
                Predict
              </Button>

              {prediction && (
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "rgba(25, 118, 210, 0.1)",
                    borderRadius: 1,
                  }}
                >
                  <Typography fontWeight="medium">
                    Prediction: {prediction}
                  </Typography>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default App;
