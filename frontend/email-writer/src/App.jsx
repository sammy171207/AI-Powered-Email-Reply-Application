import { useState } from "react";
import axios from "axios";
import { 
  Container, Typography, TextField, Button, CircularProgress, Box, 
  FormControl, InputLabel, Select, MenuItem 
} from "@mui/material";

function App() {
  const [emailsContent, setEmailsContent] = useState(""); // Updated from emailContent
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!emailsContent.trim()) {
      setError("Please provide the original email content.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailsContent, // Updated field name
        tone
      });

      setGeneratedReply(response.data);  // AI-generated reply
    } catch (error) {
      setError("Failed to generate email reply. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailsContent}
          onChange={(e) => setEmailsContent(e.target.value)} // Updated field name
        />

        <FormControl sx={{ minWidth: 200, mt: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select value={tone} label="Tone (Optional)" onChange={(e) => setTone(e.target.value)}>
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
          </Select>
        </FormControl>

        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }} 
          disabled={!emailsContent || loading} 
          onClick={handleSubmit} // Added onClick
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Generate Reply"}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>

      {generatedReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField 
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply}
            inputProps={{ readOnly: true }} 
          />
          <Button 
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigator.clipboard.writeText(generatedReply)}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
