// Import dependencies
const express = require('express'); // HTTP requests and setting up routes
const cors = require('cors'); // Enable cross-origin requests
const multer = require('multer'); // Handle file uploads
const bodyParser = require('body-parser'); // Parse JSON payloads
const dotenv = require('dotenv'); // Load environment variables

// Load environment variables
dotenv.config(); // Load variables from .env into process.env

// Initialize Express application
const app = express();
const port = process.env.PORT || 5001; // Use the environment's port or 5001

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage }); // Configure Multer

// Test route to check server status
app.get('/', (req, res) => {
    res.send('MatchHire API'); // Respond with a simple message
});

// POST route for file uploads
app.post(
    '/upload',
    upload.fields([{ name: 'resume' }, { name: 'jobDescription' }]), // Expect 'resume' and 'jobDescription' files
    (req, res) => {
        const { resume, jobDescription } = req.files; // Extract files
        if (!resume || !jobDescription) {
            return res.status(400).send('Please upload both resume and job description files'); // Validate inputs
        }
        res.send('Files uploaded successfully'); // Respond on success
    }
);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); // Log server URL
});